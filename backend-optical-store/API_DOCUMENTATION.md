# Products API Documentation

## Overview
The Products API provides endpoints for searching, filtering, and retrieving optical store products with support for pagination and various filtering options.

## Base URL
```
http://localhost:8080/api
```

## Endpoints

### 1. Get Products (with filters and pagination)
**GET** `/products`

Retrieve a paginated list of products with optional filtering and search capabilities.

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `search` | string | - | Search term for product name or description (case-insensitive) |
| `category` | integer | - | Filter by category ID |
| `price_min` | float | - | Minimum price filter (inclusive) |
| `price_max` | float | - | Maximum price filter (inclusive) |
| `stock` | string | - | Filter products with available stock (`available` or `true`) |
| `page` | integer | 1 | Page number (starts from 1) |
| `limit` | integer | 10 | Number of items per page (max 100) |

#### Response Format

```json
{
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Product description",
      "base_price": 123.45,
      "category_id": 1,
      "image": "image_filename.jpg",
      "variants": [
        {
          "id": 1,
          "product_id": 1,
          "sku": "SKU123",
          "color": "Blue",
          "size": "Medium",
          "extra_price": 10.00,
          "stock_qty": 15,
          "image_url": "variant_image.jpg"
        }
      ]
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10,
  "total_pages": 3
}
```

#### Example Requests

**Basic request (all products):**
```
GET /api/products
```

**Search by name:**
```
GET /api/products?search=lentes
```

**Filter by category:**
```
GET /api/products?category=1
```

**Price range filter:**
```
GET /api/products?price_min=50&price_max=200
```

**Products with available stock:**
```
GET /api/products?stock=available
```

**Pagination:**
```
GET /api/products?page=2&limit=5
```

**Combined filters:**
```
GET /api/products?search=óculos&category=1&price_min=100&price_max=300&stock=available&page=1&limit=10
```

### 2. Get Single Product
**GET** `/products/{id}`

Retrieve a specific product by ID with all its variants.

#### Path Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Product ID |

#### Response Format
```json
{
  "id": 1,
  "name": "Product Name",
  "description": "Product description",
  "base_price": 123.45,
  "category_id": 1,
  "image": "image_filename.jpg",
  "variants": [
    {
      "id": 1,
      "product_id": 1,
      "sku": "SKU123",
      "color": "Blue",
      "size": "Medium",
      "extra_price": 10.00,
      "stock_qty": 15,
      "image_url": "variant_image.jpg"
    }
  ]
}
```

## Implementation Status

### ✅ Completed Items
1. **Planning** - Defined all query parameters for search, filtering, and pagination
2. **Updated Routes** - Modified `/api/products` to accept all defined query parameters
3. **Backend Implementation** - Added comprehensive filtering logic including:
   - Search functionality (name and description)
   - Category filtering
   - Price range filtering (min/max)
   - Stock availability filtering
   - Pagination with metadata
4. **Parameter Validation** - All parameters are validated and have sensible defaults
5. **API Testing** - All filters tested individually and in combination
6. **Documentation** - Complete API documentation with examples
7. **Logging** - Added query logging for monitoring and performance tracking

### 🔄 In Progress
1. **Frontend Integration** - Updated React components to use new API format

### ⏳ Pending
1. **Additional Testing** - Comprehensive testing with larger datasets
2. **Performance Optimization** - Database indexing for filtered columns
3. **Error Handling Enhancement** - More granular error responses

## Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request (invalid parameters) |
| 404 | Product not found |
| 500 | Internal Server Error |

## Performance Considerations

### Database Optimization
- Uses GORM's preloading to efficiently fetch variants
- Implements COUNT query for pagination without loading all data
- Recommended indexes:
  ```sql
  CREATE INDEX idx_products_name ON products(name);
  CREATE INDEX idx_products_category ON products(category_id);
  CREATE INDEX idx_products_price ON products(base_price);
  CREATE INDEX idx_variants_stock ON variants(stock_qty);
  ```

### Logging and Monitoring
All API requests are logged with:
- Query parameters used
- Number of results returned
- Execution time
- Client IP address

Example log entry:
```
[PRODUCTS_API] Query: map[search:[óculos] category:[1]] | Results: 15 | Duration: 2.3ms | IP: 192.168.1.100
```