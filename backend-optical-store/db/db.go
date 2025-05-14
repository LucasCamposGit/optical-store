package db

import (
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"backend-optical-store/models"
)

// DB is the global database connection
var DB *gorm.DB

// ConnectDB establishes a connection to the database
func ConnectDB() {
	var err error
	dsn := os.Getenv("DSN")
	if dsn == "" {
		log.Fatal("DSN environment variable is not set")
	}

	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("DB connection error:", err)
	}

	log.Println("Database connection established successfully")

	// Create tables
	createTables()
}

func createTables() {
	// Auto-migrate tables based on models
	err := DB.AutoMigrate(
		&models.User{},
		&models.Address{},
		&models.Prescription{},
		&models.Product{},
		&models.Variant{},
		&models.Cart{},
		&models.CartItem{},
		&models.Order{},
		&models.OrderItem{},
		&models.Category{},
	)

	if err != nil {
		log.Fatalf("Error auto-migrating tables: %v", err)
	}
	log.Println("Tables auto-migrated successfully")
}
