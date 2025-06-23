package db

import (
	"log"
	"backend-optical-store/models"
)

// CreateCartIndexes creates performance indexes for cart-related tables
func CreateCartIndexes() {
	// Check if tables exist before creating indexes
	requiredTables := []interface{}{
		&models.Cart{}, 
		&models.CartItem{}, 
		&models.Variant{},
	}
	
	for _, table := range requiredTables {
		if !DB.Migrator().HasTable(table) {
			log.Printf("Warning: Table for %T does not exist, skipping index creation", table)
			return
		}
	}

	// Create indexes for better cart performance
	indexes := []string{
		"CREATE INDEX IF NOT EXISTS idx_cart_user_id ON carts(user_id)",
		"CREATE INDEX IF NOT EXISTS idx_cart_status ON carts(status)",
		"CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id)",
		"CREATE INDEX IF NOT EXISTS idx_cart_items_variant_id ON cart_items(product_variant_id)",
		"CREATE INDEX IF NOT EXISTS idx_variants_product_id ON variants(product_id)",
		"CREATE INDEX IF NOT EXISTS idx_variants_stock ON variants(stock_qty)",
	}

	sqlDB, err := DB.DB()
	if err != nil {
		log.Printf("Error accessing SQL DB: %v", err)
		return
	}

	successCount := 0
	for _, indexSQL := range indexes {
		if _, err := sqlDB.Exec(indexSQL); err != nil {
			log.Printf("Error creating index: %v - SQL: %s", err, indexSQL)
		} else {
			log.Printf("Successfully created index: %s", indexSQL)
			successCount++
		}
	}
	
	log.Printf("Index creation completed: %d/%d indexes created successfully", successCount, len(indexes))
}
