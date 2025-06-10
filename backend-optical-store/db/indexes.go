package db

import (
	"log"
)

// CreateCartIndexes creates performance indexes for cart-related tables
func CreateCartIndexes() {
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

	for _, indexSQL := range indexes {
		if _, err := sqlDB.Exec(indexSQL); err != nil {
			log.Printf("Error creating index: %v - SQL: %s", err, indexSQL)
		} else {
			log.Printf("Successfully created index: %s", indexSQL)
		}
	}
}
