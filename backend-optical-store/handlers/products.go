package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

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
		// Parse multipart form
		err := r.ParseMultipartForm(10 << 20) // 10 MB max
		if err != nil {
			http.Error(w, "Unable to parse form", http.StatusBadRequest)
			return
		}

		// Get form values
		name := r.FormValue("name")
		description := r.FormValue("description")
		basePriceStr := r.FormValue("base_price")
		categoryIDStr := r.FormValue("category_id")

		// Basic validation
		if name == "" {
			http.Error(w, "Name is required", http.StatusBadRequest)
			return
		}

		basePrice, err := strconv.ParseFloat(basePriceStr, 64)
		if err != nil || basePrice <= 0 {
			http.Error(w, "Valid base price is required", http.StatusBadRequest)
			return
		}

		categoryID, err := strconv.ParseInt(categoryIDStr, 10, 64)
		if err != nil {
			http.Error(w, "Valid category ID is required", http.StatusBadRequest)
			return
		}

		// Handle file upload
		var imagePath string
		file, header, err := r.FormFile("image")
		if err == nil {
			defer file.Close()

			// Create uploads directory if it doesn't exist
			uploadsDir := "./uploads"
			if _, err := os.Stat(uploadsDir); os.IsNotExist(err) {
				os.MkdirAll(uploadsDir, 0755)
			}

			// Generate unique filename
			ext := filepath.Ext(header.Filename)
			filename := fmt.Sprintf("%d_%s%s", time.Now().Unix(),
				strings.ReplaceAll(name, " ", "_"), ext)
			imagePath = filename

			// Save file
			dst, err := os.Create(filepath.Join(uploadsDir, filename))
			if err != nil {
				http.Error(w, "Failed to save image", http.StatusInternalServerError)
				return
			}
			defer dst.Close()

			if _, err := io.Copy(dst, file); err != nil {
				http.Error(w, "Failed to save image", http.StatusInternalServerError)
				return
			}
		}

		// Create product
		product := models.Product{
			Name:        name,
			Description: description,
			BasePrice:   basePrice,
			CategoryID:  categoryID,
			Image:       imagePath,
		}

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

func UpdateProduct(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get product ID from URL parameter
		productID, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
		if err != nil {
			http.Error(w, "Invalid product ID", http.StatusBadRequest)
			return
		}

		// Check if product exists
		var existingProduct models.Product
		if err := db.First(&existingProduct, productID).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				http.Error(w, "Product not found", http.StatusNotFound)
				return
			}
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		// Parse multipart form
		err = r.ParseMultipartForm(10 << 20) // 10 MB max
		if err != nil {
			http.Error(w, "Unable to parse form", http.StatusBadRequest)
			return
		}

		// Get form values
		name := r.FormValue("name")
		description := r.FormValue("description")
		basePriceStr := r.FormValue("base_price")
		categoryIDStr := r.FormValue("category_id")

		// Basic validation
		if name == "" {
			http.Error(w, "Name is required", http.StatusBadRequest)
			return
		}

		basePrice, err := strconv.ParseFloat(basePriceStr, 64)
		if err != nil || basePrice <= 0 {
			http.Error(w, "Valid base price is required", http.StatusBadRequest)
			return
		}

		categoryID, err := strconv.ParseInt(categoryIDStr, 10, 64)
		if err != nil {
			http.Error(w, "Valid category ID is required", http.StatusBadRequest)
			return
		}

		// Update basic fields
		existingProduct.Name = name
		existingProduct.Description = description
		existingProduct.BasePrice = basePrice
		existingProduct.CategoryID = categoryID

		// Handle file upload if provided
		file, header, err := r.FormFile("image")
		if err == nil {
			defer file.Close()

			// Create uploads directory if it doesn't exist
			uploadsDir := "./uploads"
			if _, err := os.Stat(uploadsDir); os.IsNotExist(err) {
				os.MkdirAll(uploadsDir, 0755)
			}

			// Delete old image if it exists
			if existingProduct.Image != "" {
				oldImagePath := filepath.Join(uploadsDir, existingProduct.Image)
				if _, err := os.Stat(oldImagePath); err == nil {
					os.Remove(oldImagePath)
				}
			}

			// Generate unique filename
			ext := filepath.Ext(header.Filename)
			filename := fmt.Sprintf("%d_%s%s", time.Now().Unix(),
				strings.ReplaceAll(name, " ", "_"), ext)
			existingProduct.Image = filename

			// Save file
			dst, err := os.Create(filepath.Join(uploadsDir, filename))
			if err != nil {
				http.Error(w, "Failed to save image", http.StatusInternalServerError)
				return
			}
			defer dst.Close()

			if _, err := io.Copy(dst, file); err != nil {
				http.Error(w, "Failed to save image", http.StatusInternalServerError)
				return
			}
		}

		if err := db.Save(&existingProduct).Error; err != nil {
			http.Error(w, "Failed to update product", http.StatusInternalServerError)
			return
		}

		// Return the updated product
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(existingProduct)
	}
}

func DeleteProduct(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get product ID from URL parameter
		productID, err := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)
		if err != nil {
			http.Error(w, "Invalid product ID", http.StatusBadRequest)
			return
		}

		// Check if product exists and get it
		var product models.Product
		if err := db.First(&product, productID).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				http.Error(w, "Product not found", http.StatusNotFound)
				return
			}
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		// Delete associated image file if it exists
		if product.Image != "" {
			uploadsDir := "./uploads"
			imagePath := filepath.Join(uploadsDir, product.Image)
			if _, err := os.Stat(imagePath); err == nil {
				os.Remove(imagePath)
			}
		}

		// Delete the product
		if err := db.Delete(&product, productID).Error; err != nil {
			http.Error(w, "Failed to delete product", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusNoContent)
	}
}
