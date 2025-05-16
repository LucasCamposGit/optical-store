package db

import (
	"database/sql"
	"log"
	"os"
	"strings"

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

	// Create database if it doesn't exist
	if err := createDatabaseIfNotExists(dsn); err != nil {
		log.Fatal("Error creating database:", err)
	}

	// Connect to the database
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("DB connection error:", err)
	}

	log.Println("Database connection established successfully")

	// Create tables
	createTables()
}

// createDatabaseIfNotExists creates the database if it doesn't exist
func createDatabaseIfNotExists(dsn string) error {
	// Extract the database name from the DSN
	dbName := extractDatabaseName(dsn)
	if dbName == "" {
		return nil // No database name in DSN, nothing to create
	}

	// Create a DSN without the database name to connect to MySQL server
	rootDSN := createRootDSN(dsn)

	// Open a connection to MySQL without specifying a database
	db, err := sql.Open("mysql", rootDSN)
	if err != nil {
		return err
	}
	defer db.Close()

	// Create the database if it doesn't exist
	_, err = db.Exec("CREATE DATABASE IF NOT EXISTS " + dbName)
	return err
}

// extractDatabaseName extracts the database name from the DSN
func extractDatabaseName(dsn string) string {
	// DSN format: user:pass@tcp(host:port)/dbname?param=value
	parts := strings.Split(dsn, "/")
	if len(parts) < 2 {
		return ""
	}
	dbNameWithParams := parts[1]
	return strings.Split(dbNameWithParams, "?")[0]
}

// createRootDSN creates a DSN without the database name to connect to MySQL server
func createRootDSN(dsn string) string {
	// Replace /dbname with /
	parts := strings.Split(dsn, "/")
	if len(parts) < 2 {
		return dsn
	}
	dbNameWithParams := parts[1]
	params := ""
	if strings.Contains(dbNameWithParams, "?") {
		params = "?" + strings.Split(dbNameWithParams, "?")[1]
	}
	return parts[0] + "/" + params
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
