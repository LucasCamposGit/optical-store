package db

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

// DB is the global database connection
var DB *sql.DB

// ConnectDB establishes a connection to the database
func ConnectDB() {
	var err error
	dsn := os.Getenv("DSN")
	if dsn == "" {
		log.Fatal("DSN environment variable is not set")
	}

	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("DB connection error:", err)
	}

	// Test the connection
	err = DB.Ping()
	if err != nil {
		log.Fatal("Could not ping database:", err)
	}

	log.Println("Database connection established successfully")

	// Create tables
	createTables()
}

func createTables() {
	userTable := `
	CREATE TABLE IF NOT EXISTS users (
		id BIGINT AUTO_INCREMENT PRIMARY KEY,
		email VARCHAR(255) UNIQUE NOT NULL,
		password_hash VARCHAR(255) NOT NULL,
		role VARCHAR(50) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
	);`

	addressTable := `
	CREATE TABLE IF NOT EXISTS addresses (
		id BIGINT AUTO_INCREMENT PRIMARY KEY,
		user_id BIGINT NOT NULL,
		name VARCHAR(255) NOT NULL,
		line1 VARCHAR(255) NOT NULL,
		line2 VARCHAR(255),
		city VARCHAR(255) NOT NULL,
		state VARCHAR(255) NOT NULL,
		postal_code VARCHAR(20) NOT NULL,
		country CHAR(2) NOT NULL,
		is_default BOOLEAN DEFAULT FALSE,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
	);`

	prescriptionTable := `
	CREATE TABLE IF NOT EXISTS prescriptions (
		id BIGINT AUTO_INCREMENT PRIMARY KEY,
		user_id BIGINT NOT NULL,
		file_url VARCHAR(255) NOT NULL,
		issued_at TIMESTAMP NOT NULL,
		expires_at TIMESTAMP NOT NULL,
		verified BOOLEAN DEFAULT FALSE,
		FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
	);`

	productTable := `
	CREATE TABLE IF NOT EXISTS products (
		id BIGINT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		description TEXT NOT NULL,
		base_price DECIMAL(10,2) NOT NULL,
		category_id BIGINT NOT NULL
	);`

	variantTable := `
	CREATE TABLE IF NOT EXISTS variants (
		id BIGINT AUTO_INCREMENT PRIMARY KEY,
		product_id BIGINT NOT NULL,
		sku VARCHAR(50) NOT NULL UNIQUE,
		color VARCHAR(50) NOT NULL,
		size VARCHAR(50) NOT NULL,
		extra_price DECIMAL(10,2) NOT NULL DEFAULT 0,
		stock_qty INT NOT NULL DEFAULT 0,
		image_url VARCHAR(255) NOT NULL,
		FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
	);`

	cartTable := `
	CREATE TABLE IF NOT EXISTS carts (
		id BIGINT AUTO_INCREMENT PRIMARY KEY,
		user_id BIGINT NOT NULL,
		status VARCHAR(50) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
	);`

	cartItemTable := `
	CREATE TABLE IF NOT EXISTS cart_items (
		id BIGINT AUTO_INCREMENT PRIMARY KEY,
		cart_id BIGINT NOT NULL,
		product_variant_id BIGINT NOT NULL,
		qty INT NOT NULL,
		unit_price DECIMAL(10,2) NOT NULL,
		FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
		FOREIGN KEY (product_variant_id) REFERENCES variants(id) ON DELETE CASCADE
	);`

	orderTable := `
	CREATE TABLE IF NOT EXISTS orders (
		id BIGINT AUTO_INCREMENT PRIMARY KEY,
		user_id BIGINT NOT NULL,
		prescription_id BIGINT NOT NULL,
		status VARCHAR(50) NOT NULL,
		total DECIMAL(10,2) NOT NULL,
		placed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		paid_at TIMESTAMP NULL,
		shipped_at TIMESTAMP NULL,
		FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
		FOREIGN KEY (prescription_id) REFERENCES prescriptions(id) ON DELETE RESTRICT
	);`

	orderItemTable := `
	CREATE TABLE IF NOT EXISTS order_items (
		id BIGINT AUTO_INCREMENT PRIMARY KEY,
		order_id BIGINT NOT NULL,
		product_variant_id BIGINT NOT NULL,
		qty INT NOT NULL,
		unit_price DECIMAL(10,2) NOT NULL,
		lens_options JSON,
		FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
		FOREIGN KEY (product_variant_id) REFERENCES variants(id) ON DELETE RESTRICT
	);`

	categoryTable := `
	CREATE TABLE IF NOT EXISTS categories (
		id BIGINT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		description TEXT NOT NULL,
		parent_id BIGINT,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
	);`

	// Execute each table creation query
	tables := []struct {
		name  string
		query string
	}{
		{"users", userTable},
		{"addresses", addressTable},
		{"prescriptions", prescriptionTable},
		{"products", productTable},
		{"variants", variantTable},
		{"carts", cartTable},
		{"cart_items", cartItemTable},
		{"orders", orderTable},
		{"order_items", orderItemTable},
		{"categories", categoryTable},
	}

	for _, table := range tables {
		_, err := DB.Exec(table.query)
		if err != nil {
			log.Fatalf("Error creating %s table: %v", table.name, err)
		}
		log.Printf("Table %s created or already exists", table.name)
	}
}
