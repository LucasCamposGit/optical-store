package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"gorm.io/gorm"

	"backend-optical-store/models"
)

// GetProduct returns a single product with its variants
func GetProduct(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get product ID from URL parameter
		productID, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
		if err != nil {
			http.Error(w, "Invalid product ID", http.StatusBadRequest)
			return
		}

		// Query the product with its variants
		var product models.Product
		if err := db.Preload("Variants").First(&product, productID).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				http.Error(w, "Product not found", http.StatusNotFound)
				return
			}
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		// Return the product as JSON
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(product)
	}
}

func GetProducts(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Query all products with their variants
		var products []models.Product
		if err := db.Preload("Variants").Find(&products).Error; err != nil {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		// Return the products as JSON
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(products)
	}
}

func CreateProduct(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Parse the request body
		var product models.Product
		if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		// Basic validation
		if product.Name == "" {
			http.Error(w, "Name is required", http.StatusBadRequest)
			return
		}
		if product.BasePrice <= 0 {
			http.Error(w, "Base price must be greater than 0", http.StatusBadRequest)
			return
		}

		// Create the product in the database
		if err := db.Create(&product).Error; err != nil {
			http.Error(w, "Failed to create product", http.StatusInternalServerError)
			return
		}

		// Return the created product
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(product)
	}
}
