package models

import (
	"time"

	"gorm.io/datatypes"
)

type User struct {
	ID           int64     `json:"id"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	Role         string    `json:"role"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	Addresses    []Address `json:"addresses" gorm:"foreignKey:UserID"`
}

// Address represents a shipping or billing address saved by a user.
type Address struct {
	ID         int64     `json:"id"`              // primary key
	UserID     int64     `json:"user_id"`         // FK -> users.id
	Name       string    `json:"name"`            // “John Smith” or “Home”
	Line1      string    `json:"line1"`           // “123 Main St”
	Line2      *string   `json:"line2,omitempty"` // apartment / suite, nullable
	City       string    `json:"city"`
	State      string    `json:"state"`
	PostalCode string    `json:"postal_code"`
	Country    string    `json:"country"`    // ISO 3166-1 alpha-2, e.g. “US”
	IsDefault  bool      `json:"is_default"` // true → chosen automatically at checkout
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

type Prescription struct {
	ID        int64     `json:"id"`
	UserID    int64     `json:"user_id"`
	FileURL   string    `json:"file_url"`
	IssuedAt  time.Time `json:"issued_at"`
	ExpiresAt time.Time `json:"expires_at"`
	Verified  bool      `json:"verified"`
}

type Product struct {
	ID          int64     `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	BasePrice   float64   `json:"base_price"`
	CategoryID  int64     `json:"category_id"`
	Image       string    `json:"image"`
	Variants    []Variant `json:"variants" gorm:"foreignKey:ProductID"`
}

type Variant struct {
	ID         int64   `json:"id"`
	ProductID  int64   `json:"product_id"`
	SKU        string  `json:"sku"`
	Color      string  `json:"color"`
	Size       string  `json:"size"`
	ExtraPrice float64 `json:"extra_price"`
	StockQty   int     `json:"stock_qty"`
	ImageURL   string  `json:"image_url"`
	Product    Product `json:"product" gorm:"foreignKey:ProductID;references:ID"`
}

type Cart struct {
	ID        int64      `json:"id"`
	UserID    int64      `json:"user_id"`
	Status    string     `json:"status"` // active, converted
	Items     []CartItem `json:"items" gorm:"foreignKey:CartID"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
}

type CartItem struct {
	ID               int64     `json:"id"`
	CartID           int64     `json:"cart_id"`
	ProductVariantID int64     `json:"product_variant_id"`
	Qty              int       `json:"qty"`
	UnitPrice        float64   `json:"unit_price"`
	Variant          Variant   `json:"variant" gorm:"foreignKey:ProductVariantID;references:ID"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}

type Category struct {
	ID          int64     `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	ParentID    *int64    `json:"parent_id,omitempty"` // nullable for root categories
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type Order struct {
	ID             int64       `json:"id"`
	UserID         int64       `json:"user_id"`
	PrescriptionID int64       `json:"prescription_id"`
	Status         string      `json:"status"`
	Total          float64     `json:"total"`
	PlacedAt       time.Time   `json:"placed_at"`
	PaidAt         *time.Time  `json:"paid_at"`
	ShippedAt      *time.Time  `json:"shipped_at"`
	Items          []OrderItem `json:"items" gorm:"foreignKey:OrderID"`
}

type OrderItem struct {
	ID               int64          `json:"id"`
	OrderID          int64          `json:"order_id"`
	ProductVariantID int64          `json:"product_variant_id"`
	Qty              int            `json:"qty"`
	UnitPrice        float64        `json:"unit_price"`
	LensOptionsJSON  datatypes.JSON `json:"lens_options"`
}

// RefreshToken represents a refresh token stored in the database
type RefreshToken struct {
	ID        int64     `json:"id"`
	UserID    int64     `json:"user_id"`
	Token     string    `json:"token"`
	Expired   bool      `json:"expired" gorm:"default:false"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
