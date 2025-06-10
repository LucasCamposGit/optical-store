package handlers

import (
	"backend-optical-store/middleware"
	"backend-optical-store/models"
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
	"gorm.io/gorm"
)

// Cart response structures
type CartResponse struct {
	ID         int64          `json:"id"`
	UserID     int64          `json:"user_id"`
	Status     string         `json:"status"`
	Items      []CartItemResp `json:"items"`
	TotalItems int            `json:"total_items"`
	TotalPrice float64        `json:"total_price"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
}

type CartItemResp struct {
	ID               int64       `json:"id"`
	CartID           int64       `json:"cart_id"`
	ProductVariantID int64       `json:"product_variant_id"`
	Qty              int         `json:"qty"`
	UnitPrice        float64     `json:"unit_price"`
	Variant          CartVariant `json:"variant"`
}

type CartVariant struct {
	ID         int64       `json:"id"`
	SKU        string      `json:"sku"`
	Color      string      `json:"color"`
	Size       string      `json:"size"`
	StockQty   int         `json:"stock_qty"`
	ExtraPrice float64     `json:"extra_price"`
	Product    CartProduct `json:"product"`
}

type CartProduct struct {
	ID        int64   `json:"id"`
	Name      string  `json:"name"`
	Image     string  `json:"image"`
	BasePrice float64 `json:"base_price"`
}

type AddToCartRequest struct {
	ProductVariantID int64 `json:"product_variant_id"`
	Quantity         int   `json:"quantity"`
}

type UpdateCartItemRequest struct {
	Quantity int `json:"quantity"`
}

// GetCart retrieves user's active cart with items
func GetCart(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID from context (set by auth middleware)
		userID, ok := r.Context().Value(middleware.UserIDKey).(int64)
		if !ok {
			http.Error(w, "User not authenticated", http.StatusUnauthorized)
			return
		}

		// Find or create active cart for user
		var cart models.Cart
		err := db.Where("user_id = ? AND status = ?", userID, "active").First(&cart).Error
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				// Create new active cart
				cart = models.Cart{
					UserID:    userID,
					Status:    "active",
					CreatedAt: time.Now(),
					UpdatedAt: time.Now(),
				}
				if err := db.Create(&cart).Error; err != nil {
					http.Error(w, "Failed to create cart", http.StatusInternalServerError)
					return
				}
			} else {
				http.Error(w, "Database error", http.StatusInternalServerError)
				return
			}
		}

		// Load cart items with variant and product information
		var cartItems []models.CartItem
		err = db.Preload("Variant.Product").Where("cart_id = ?", cart.ID).Find(&cartItems).Error
		if err != nil {
			http.Error(w, "Failed to load cart items", http.StatusInternalServerError)
			return
		}

		// Build response
		response := buildCartResponse(cart, cartItems)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

// AddToCart adds or updates an item in the cart
func AddToCart(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID from context
		userID, ok := r.Context().Value(middleware.UserIDKey).(int64)
		if !ok {
			http.Error(w, "User not authenticated", http.StatusUnauthorized)
			return
		}

		// Parse request body
		var req AddToCartRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		// Validate request
		if req.ProductVariantID <= 0 || req.Quantity <= 0 {
			http.Error(w, "Valid product variant ID and quantity are required", http.StatusBadRequest)
			return
		}

		// Check if variant exists and has sufficient stock
		var variant models.Variant
		err := db.Preload("Product").First(&variant, req.ProductVariantID).Error
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				http.Error(w, "Product variant not found", http.StatusNotFound)
				return
			}
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		// Find or create active cart
		var cart models.Cart
		err = db.Where("user_id = ? AND status = ?", userID, "active").First(&cart).Error
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				cart = models.Cart{
					UserID:    userID,
					Status:    "active",
					CreatedAt: time.Now(),
					UpdatedAt: time.Now(),
				}
				if err := db.Create(&cart).Error; err != nil {
					http.Error(w, "Failed to create cart", http.StatusInternalServerError)
					return
				}
			} else {
				http.Error(w, "Database error", http.StatusInternalServerError)
				return
			}
		}

		// Check if item already exists in cart
		var existingItem models.CartItem
		err = db.Where("cart_id = ? AND product_variant_id = ?", cart.ID, req.ProductVariantID).First(&existingItem).Error

		totalQuantity := req.Quantity
		if err == nil {
			// Item exists, calculate total quantity
			totalQuantity += existingItem.Qty
		}

		// Check stock availability
		if totalQuantity > variant.StockQty {
			http.Error(w, "Insufficient stock available", http.StatusBadRequest)
			return
		}

		// Calculate unit price
		unitPrice := variant.Product.BasePrice + variant.ExtraPrice

		if err == nil {
			// Update existing item
			existingItem.Qty = totalQuantity
			existingItem.UnitPrice = unitPrice // Update price in case it changed
			if err := db.Save(&existingItem).Error; err != nil {
				http.Error(w, "Failed to update cart item", http.StatusInternalServerError)
				return
			}
		} else if err == gorm.ErrRecordNotFound {
			// Create new cart item
			cartItem := models.CartItem{
				CartID:           cart.ID,
				ProductVariantID: req.ProductVariantID,
				Qty:              req.Quantity,
				UnitPrice:        unitPrice,
			}
			if err := db.Create(&cartItem).Error; err != nil {
				http.Error(w, "Failed to add item to cart", http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		// Update cart timestamp
		cart.UpdatedAt = time.Now()
		db.Save(&cart)

		// Return updated cart
		var cartItems []models.CartItem
		db.Preload("Variant.Product").Where("cart_id = ?", cart.ID).Find(&cartItems)
		response := buildCartResponse(cart, cartItems)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

// UpdateCartItem updates the quantity of a cart item
func UpdateCartItem(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID from context
		userID, ok := r.Context().Value(middleware.UserIDKey).(int64)
		if !ok {
			http.Error(w, "User not authenticated", http.StatusUnauthorized)
			return
		}

		// Get cart item ID from URL
		itemID, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
		if err != nil {
			http.Error(w, "Invalid item ID", http.StatusBadRequest)
			return
		}

		// Parse request body
		var req UpdateCartItemRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		// Find cart item and verify ownership
		var cartItem models.CartItem
		err = db.Joins("JOIN carts ON carts.id = cart_items.cart_id").
			Where("cart_items.id = ? AND carts.user_id = ? AND carts.status = ?", itemID, userID, "active").
			First(&cartItem).Error
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				http.Error(w, "Cart item not found", http.StatusNotFound)
				return
			}
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		// If quantity is 0, remove the item
		if req.Quantity == 0 {
			if err := db.Delete(&cartItem).Error; err != nil {
				http.Error(w, "Failed to remove cart item", http.StatusInternalServerError)
				return
			}
		} else {
			// Validate quantity
			if req.Quantity < 0 {
				http.Error(w, "Quantity must be positive", http.StatusBadRequest)
				return
			}

			// Check stock availability
			var variant models.Variant
			if err := db.First(&variant, cartItem.ProductVariantID).Error; err != nil {
				http.Error(w, "Product variant not found", http.StatusInternalServerError)
				return
			}

			if req.Quantity > variant.StockQty {
				http.Error(w, "Insufficient stock available", http.StatusBadRequest)
				return
			}

			// Update quantity
			cartItem.Qty = req.Quantity
			if err := db.Save(&cartItem).Error; err != nil {
				http.Error(w, "Failed to update cart item", http.StatusInternalServerError)
				return
			}
		}

		// Update cart timestamp
		var cart models.Cart
		if err := db.First(&cart, cartItem.CartID).Error; err == nil {
			cart.UpdatedAt = time.Now()
			db.Save(&cart)
		}

		// Return updated cart
		var cartItems []models.CartItem
		db.Preload("Variant.Product").Where("cart_id = ?", cartItem.CartID).Find(&cartItems)

		if err := db.First(&cart, cartItem.CartID).Error; err != nil {
			http.Error(w, "Failed to load cart", http.StatusInternalServerError)
			return
		}

		response := buildCartResponse(cart, cartItems)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

// RemoveFromCart removes an item from the cart
func RemoveFromCart(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID from context
		userID, ok := r.Context().Value(middleware.UserIDKey).(int64)
		if !ok {
			http.Error(w, "User not authenticated", http.StatusUnauthorized)
			return
		}

		// Get cart item ID from URL
		itemID, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
		if err != nil {
			http.Error(w, "Invalid item ID", http.StatusBadRequest)
			return
		}

		// Find cart item and verify ownership
		var cartItem models.CartItem
		err = db.Joins("JOIN carts ON carts.id = cart_items.cart_id").
			Where("cart_items.id = ? AND carts.user_id = ? AND carts.status = ?", itemID, userID, "active").
			First(&cartItem).Error
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				http.Error(w, "Cart item not found", http.StatusNotFound)
				return
			}
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		// Remove the item
		if err := db.Delete(&cartItem).Error; err != nil {
			http.Error(w, "Failed to remove cart item", http.StatusInternalServerError)
			return
		}

		// Update cart timestamp
		var cart models.Cart
		if err := db.First(&cart, cartItem.CartID).Error; err == nil {
			cart.UpdatedAt = time.Now()
			db.Save(&cart)
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

// ClearCart removes all items from user's cart
func ClearCart(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID from context
		userID, ok := r.Context().Value(middleware.UserIDKey).(int64)
		if !ok {
			http.Error(w, "User not authenticated", http.StatusUnauthorized)
			return
		}

		// Find user's active cart
		var cart models.Cart
		err := db.Where("user_id = ? AND status = ?", userID, "active").First(&cart).Error
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				http.Error(w, "Cart not found", http.StatusNotFound)
				return
			}
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		// Remove all items from cart
		if err := db.Where("cart_id = ?", cart.ID).Delete(&models.CartItem{}).Error; err != nil {
			http.Error(w, "Failed to clear cart", http.StatusInternalServerError)
			return
		}

		// Update cart timestamp
		cart.UpdatedAt = time.Now()
		db.Save(&cart)

		w.WriteHeader(http.StatusNoContent)
	}
}

// Helper function to build cart response
func buildCartResponse(cart models.Cart, cartItems []models.CartItem) CartResponse {
	var items []CartItemResp
	var totalItems int
	var totalPrice float64

	for _, item := range cartItems {
		itemResp := CartItemResp{
			ID:               item.ID,
			CartID:           item.CartID,
			ProductVariantID: item.ProductVariantID,
			Qty:              item.Qty,
			UnitPrice:        item.UnitPrice,
			Variant: CartVariant{
				ID:         item.Variant.ID,
				SKU:        item.Variant.SKU,
				Color:      item.Variant.Color,
				Size:       item.Variant.Size,
				StockQty:   item.Variant.StockQty,
				ExtraPrice: item.Variant.ExtraPrice,
				Product: CartProduct{
					ID:        item.Variant.Product.ID,
					Name:      item.Variant.Product.Name,
					Image:     item.Variant.Product.Image,
					BasePrice: item.Variant.Product.BasePrice,
				},
			},
		}

		items = append(items, itemResp)
		totalItems += item.Qty
		totalPrice += item.UnitPrice * float64(item.Qty)
	}

	return CartResponse{
		ID:         cart.ID,
		UserID:     cart.UserID,
		Status:     cart.Status,
		Items:      items,
		TotalItems: totalItems,
		TotalPrice: totalPrice,
		CreatedAt:  cart.CreatedAt,
		UpdatedAt:  cart.UpdatedAt,
	}
}
