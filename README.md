# Optical Store Management System

## Overview

The Optical Store Management System is a full-stack web application designed for managing an optical store's products, user authentication, and e-commerce functionality. The system consists of a Go-based backend API and a Next.js React frontend, providing a complete solution for optical store operations.

### Key Features

- **Product Management**: Create, read, update, and delete products with image uploads
- **User Authentication**: JWT-based authentication with refresh tokens
- **E-commerce Frontend**: Product catalog with filtering, search, and pagination
- **Admin Dashboard**: Product management interface for administrators
- **Responsive Design**: Mobile-first responsive UI using Tailwind CSS
- **Image Upload**: File handling for product images
- **Advanced Filtering**: Search by name, category, price range, and stock availability

### Technologies Used

**Backend:**
- Go 1.21+
- Chi Router (HTTP routing)
- GORM (ORM for database operations)
- MySQL Database
- JWT Authentication
- Bcrypt (Password hashing)
- Multipart file uploads

**Frontend:**
- Next.js 15.3.1
- React 19
- TypeScript
- Tailwind CSS 4
- Context API (State management)
- Custom hooks for data fetching
- Responsive design with mobile support

---

## Application Structure

### Backend Structure (`backend-optical-store/`)

```
backend-optical-store/
├── main.go              # Application entry point
├── db/
│   └── db.go           # Database connection and configuration
├── handlers/
│   ├── auth.go         # Authentication handlers
│   └── products.go     # Product management handlers
├── middleware/
│   └── auth.go         # JWT authentication middleware
├── models/
│   └── models.go       # Database models/structs
├── router/
│   └── router.go       # API route configuration
├── uploads/            # Static file storage for images
└── utils/              # Utility functions
```

### Frontend Structure (`frontend-optical-store/`)

```
frontend-optical-store/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── (public)/               # Public routes
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── login/             # Login page
│   │   │   ├── (cadastro)/        # Registration page
│   │   │   ├── (loja)/            # Store pages
│   │   │   │   ├── loja/          # Product catalog
│   │   │   │   └── produto/       # Product details
│   │   │   └── components/        # Shared components
│   │   └── (private)/             # Protected routes
│   │       └── dashboard/         # Admin dashboard
│   ├── context/
│   │   └── LoginContext.tsx       # Authentication context
│   ├── hooks/                     # Custom React hooks
│   ├── types/                     # TypeScript definitions
│   └── store/                     # State management
└── public/                        # Static assets
```

---

## Backend API Documentation

### Database Models

#### User Model
```go
type User struct {
    ID           int64     `json:"id"`
    Email        string    `json:"email"`
    PasswordHash string    `json:"-"`
    Role         string    `json:"role"`
    CreatedAt    time.Time `json:"created_at"`
    UpdatedAt    time.Time `json:"updated_at"`
    Addresses    []Address `json:"addresses" gorm:"foreignKey:UserID"`
}
```

#### Product Model
```go
type Product struct {
    ID          int64     `json:"id"`
    Name        string    `json:"name"`
    Description string    `json:"description"`
    BasePrice   float64   `json:"base_price"`
    CategoryID  int64     `json:"category_id"`
    Image       string    `json:"image"`
    Variants    []Variant `json:"variants" gorm:"foreignKey:ProductID"`
}
```

### Core Functions

#### Main Application (`main.go`)

**`main()`**
- **Purpose**: Application entry point that initializes the server
- **Usage**: Called when the application starts
- **Functionality**:
  - Loads environment variables from `.env` file
  - Establishes database connection via `db.ConnectDB()`
  - Configures Chi router with middleware (CORS, logging, recovery)
  - Sets up graceful shutdown handling with signal interrupts
  - Starts HTTP server on specified port (default: 8080)

#### Database Layer (`db/db.go`)

**`ConnectDB()`**
- **Purpose**: Establishes database connection and performs initial setup
- **Usage**: Called once during application startup from `main()`
- **Functionality**:
  - Reads DSN from environment variables
  - Creates database if it doesn't exist
  - Establishes GORM connection to MySQL
  - Triggers table auto-migration

**`createDatabaseIfNotExists(dsn string) error`**
- **Purpose**: Creates MySQL database if it doesn't exist
- **Usage**: Called internally by `ConnectDB()`
- **Functionality**:
  - Extracts database name from DSN
  - Connects to MySQL server without database specification
  - Executes CREATE DATABASE IF NOT EXISTS command

**`createTables()`**
- **Purpose**: Auto-migrates database tables based on model structs
- **Usage**: Called internally by `ConnectDB()`
- **Functionality**:
  - Uses GORM AutoMigrate for all model structs
  - Creates tables: User, Address, Product, Variant, Cart, Order, etc.

#### Authentication Handlers (`handlers/auth.go`)

**`Register(db *gorm.DB) http.HandlerFunc`**
- **Purpose**: Handles user registration
- **Usage**: POST `/api/register` endpoint
- **Functionality**:
  - Validates email and password requirements
  - Checks for existing email addresses
  - Hashes password using bcrypt
  - Creates new user record in database
  - Generates JWT access and refresh tokens
  - Returns token pair to client

**`Login(db *gorm.DB) http.HandlerFunc`**
- **Purpose**: Handles user authentication
- **Usage**: POST `/api/login` endpoint
- **Functionality**:
  - Validates email and password credentials
  - Retrieves user from database by email
  - Compares provided password with stored hash
  - Generates new JWT token pair
  - Stores refresh token in database
  - Returns authentication tokens

**`RefreshToken(db *gorm.DB) http.HandlerFunc`**
- **Purpose**: Refreshes expired access tokens
- **Usage**: POST `/api/refresh-token` endpoint
- **Functionality**:
  - Validates provided refresh token
  - Verifies token exists in database and is not expired
  - Generates new token pair
  - Invalidates old refresh token
  - Stores new refresh token
  - Returns new authentication tokens

**`GetProfile(db *gorm.DB) http.HandlerFunc`**
- **Purpose**: Retrieves authenticated user's profile
- **Usage**: GET `/api/profile` endpoint (protected)
- **Functionality**:
  - Extracts user ID from JWT context
  - Queries user data from database
  - Returns user profile information

**`UpdateProfile(db *gorm.DB) http.HandlerFunc`**
- **Purpose**: Updates user profile information
- **Usage**: PUT `/api/profile` endpoint (protected)
- **Functionality**:
  - Validates update request data
  - Handles email updates with uniqueness checking
  - Handles password updates with old password verification
  - Updates user record in database

**`DeleteProfile(db *gorm.DB) http.HandlerFunc`**
- **Purpose**: Deletes user account
- **Usage**: DELETE `/api/profile` endpoint (protected)
- **Functionality**:
  - Extracts user ID from authentication context
  - Removes user record from database
  - Handles cascading deletes for related data

#### Product Handlers (`handlers/products.go`)

**`GetProducts(db *gorm.DB) http.HandlerFunc`**
- **Purpose**: Retrieves paginated list of products with filtering
- **Usage**: GET `/api/products` endpoint
- **Functionality**:
  - Parses query parameters (search, category, price_min, price_max, stock, page, limit)
  - Builds dynamic SQL query with GORM
  - Applies search filters (name/description matching)
  - Applies category and price range filters
  - Handles stock availability filtering
  - Implements pagination with offset/limit
  - Returns structured response with metadata

**`GetProduct(db *gorm.DB) http.HandlerFunc`**
- **Purpose**: Retrieves single product with variants
- **Usage**: GET `/api/products/{id}` endpoint
- **Functionality**:
  - Extracts product ID from URL parameter
  - Queries product with preloaded variants
  - Returns complete product information

**`CreateProduct(db *gorm.DB) http.HandlerFunc`**
- **Purpose**: Creates new product with image upload
- **Usage**: POST `/api/products` endpoint (protected)
- **Functionality**:
  - Parses multipart form data
  - Validates required fields (name, description, base_price, category_id)
  - Handles file upload for product image
  - Generates unique filename and saves to uploads directory
  - Creates product record in database
  - Returns created product information

**`UpdateProduct(db *gorm.DB) http.HandlerFunc`**
- **Purpose**: Updates existing product
- **Usage**: PUT `/api/products/{id}` endpoint (protected)
- **Functionality**:
  - Extracts product ID from URL
  - Validates product exists
  - Parses update data from multipart form
  - Handles optional image replacement
  - Updates product record
  - Manages old image file cleanup

**`DeleteProduct(db *gorm.DB) http.HandlerFunc`**
- **Purpose**: Deletes product and associated files
- **Usage**: DELETE `/api/products/{id}` endpoint (protected)
- **Functionality**:
  - Validates product exists
  - Removes associated image file from filesystem
  - Deletes product record from database
  - Handles cascading deletes for variants

**`logProductsQuery(r *http.Request, total int64, duration time.Duration)`**
- **Purpose**: Logs API queries for monitoring and analytics
- **Usage**: Called internally by GetProducts handler
- **Functionality**:
  - Logs query parameters, result count, execution time
  - Includes client IP address for tracking
  - Provides performance monitoring data

#### Authentication Middleware (`middleware/auth.go`)

**`AuthMiddleware(next http.Handler) http.Handler`**
- **Purpose**: Validates JWT tokens on protected routes
- **Usage**: Applied to all routes requiring authentication
- **Functionality**:
  - Extracts Authorization header from request
  - Validates Bearer token format
  - Verifies JWT signature and expiration
  - Extracts user ID from token claims
  - Adds user ID to request context
  - Passes request to next handler or returns 401

**`GetJWTSecret() string`**
- **Purpose**: Provides JWT signing secret
- **Usage**: Called by token generation and validation functions
- **Functionality**:
  - Returns static secret key (should use environment variable in production)

#### Router Configuration (`router/router.go`)

**`New(db *gorm.DB) chi.Router`**
- **Purpose**: Configures all API routes and middleware
- **Usage**: Called from main() to set up routing
- **Functionality**:
  - Creates new Chi router instance
  - Defines public routes (register, login, products view)
  - Configures file server for image uploads
  - Sets up protected route group with auth middleware
  - Maps HTTP methods to handler functions

---

## Frontend Documentation

### Core Components and Functions

#### Authentication Context (`src/context/LoginContext.tsx`)

**`AuthProvider({ children })`**
- **Purpose**: Provides authentication state management across the application
- **Usage**: Wraps the entire application in layout.tsx
- **Functionality**:
  - Manages authentication state using useReducer
  - Provides authentication status and token storage
  - Handles login success, token refresh, and logout actions

**`useAuth()`**
- **Purpose**: Hook to access authentication state
- **Usage**: Used in components that need to check auth status
- **Functionality**:
  - Returns current authentication state
  - Provides access to user tokens

**`useAuthDispatch()`**
- **Purpose**: Hook to dispatch authentication actions
- **Usage**: Used in login/logout functionality
- **Functionality**:
  - Returns dispatch function for auth state changes
  - Handles LOGIN_SUCCESS, REFRESH_TOKEN_SUCCESS, LOGOUT actions

#### Custom Hooks

**`useProducts()` (`src/hooks/useProducts.tsx`)**
- **Purpose**: Manages product data fetching with filtering and pagination
- **Usage**: Used in store pages to display products
- **Functionality**:
  - Handles API calls to backend products endpoint
  - Manages loading and error states
  - Implements debounced search to reduce API calls
  - Provides pagination controls
  - Caches results to improve performance

**`useDebounce(value, delay)` (`src/hooks/useDebounce.tsx`)**
- **Purpose**: Debounces rapidly changing values to prevent excessive API calls
- **Usage**: Used with search inputs and filters
- **Functionality**:
  - Delays execution of value changes
  - Reduces API call frequency during user typing
  - Improves application performance

**`useFetch()` (`src/hooks/useFetch.tsx`)**
- **Purpose**: Generic data fetching hook with loading states
- **Usage**: Used for various API calls throughout the application
- **Functionality**:
  - Manages loading, error, and success states
  - Provides consistent error handling
  - Supports different HTTP methods

#### Page Components

**`HomePage()` (`src/app/(public)/page.tsx`)**
- **Purpose**: Main landing page of the application
- **Usage**: Displayed at root URL "/"
- **Functionality**:
  - Renders marketing sections (Hero, About, Services, etc.)
  - Provides navigation to store and authentication pages
  - Displays company information and contact details

**`LoginPage()` (`src/app/(public)/login/page.tsx`)**
- **Purpose**: User authentication interface
- **Usage**: Accessible via "/login" route
- **Functionality**:
  - Handles user email/password input
  - Submits credentials to backend API
  - Manages authentication state updates
  - Redirects to store page on successful login
  - Displays error messages for failed attempts

**`CadastroPage()` (`src/app/(public)/(cadastro)/cadastro/page.tsx`)**
- **Purpose**: User registration interface
- **Usage**: Accessible via "/cadastro" route
- **Functionality**:
  - Collects user email and password
  - Validates password confirmation
  - Submits registration data to backend
  - Redirects to login page on success
  - Handles registration error display

**`Store()` (`src/app/(public)/(loja)/loja/page.tsx`)**
- **Purpose**: Product catalog with filtering and search
- **Usage**: Main store interface at "/loja"
- **Functionality**:
  - Displays paginated product grid
  - Implements search functionality with debouncing
  - Provides category, price, and stock filters
  - Handles URL parameter synchronization
  - Manages loading states and error handling
  - Updates browser URL with filter state

**`DashboardPage()` (`src/app/(private)/dashboard/page.tsx`)**
- **Purpose**: Admin interface for product management
- **Usage**: Protected route at "/dashboard"
- **Functionality**:
  - Displays all products in grid layout
  - Provides product creation modal
  - Handles product editing with pre-filled forms
  - Manages product deletion with confirmation
  - Supports image upload for products
  - Implements real-time product list updates

#### UI Components

**`Header()` (`src/app/(public)/components/Header.tsx`)**
- **Purpose**: Main navigation component
- **Usage**: Used on all public pages
- **Functionality**:
  - Provides responsive navigation menu
  - Handles mobile hamburger menu toggle
  - Contains company logo and navigation links
  - Adapts layout based on screen size

**`FilterBar()` (`src/app/(public)/(loja)/components/FilterBar.tsx`)**
- **Purpose**: Product filtering interface
- **Usage**: Used on store page for product filtering
- **Functionality**:
  - Provides search input with debouncing
  - Offers category selection dropdown
  - Includes price range inputs
  - Handles stock availability toggle
  - Manages filter state synchronization

**`ProductCard()` (`src/app/(public)/(loja)/components/ProductCard.tsx`)**
- **Purpose**: Individual product display component
- **Usage**: Used in product grids and lists
- **Functionality**:
  - Displays product image, name, description, and price
  - Handles product image loading with fallbacks
  - Provides click navigation to product details
  - Implements responsive card layout

**`LoadingCard()` (`src/app/(public)/(loja)/components/LoadingCard.tsx`)**
- **Purpose**: Skeleton loading placeholder for products
- **Usage**: Displayed while products are loading
- **Functionality**:
  - Shows animated skeleton structure
  - Maintains layout consistency during loading
  - Provides visual feedback to users

### State Management

The application uses React Context API for global state management:

- **Authentication State**: Managed by AuthContext for login status and tokens
- **Local Component State**: useState hooks for component-specific data
- **Form State**: Controlled components with useState for form inputs
- **API State**: Custom hooks manage loading, error, and data states

---

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | User registration |
| POST | `/api/login` | User authentication |
| POST | `/api/refresh-token` | Token refresh |
| GET | `/api/products` | Get products with filters |
| GET | `/api/products/{id}` | Get single product |
| GET | `/api/uploads/*` | Serve uploaded images |

### Protected Endpoints (Require Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get user profile |
| PUT | `/api/profile` | Update user profile |
| DELETE | `/api/profile` | Delete user account |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |

---

## Setup and Installation

### Prerequisites

- Go 1.21 or higher
- Node.js 18 or higher
- MySQL 8.0 or higher
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd otica/backend-optical-store
   ```

2. **Install Go dependencies**
   ```bash
   go mod download
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory:
   ```env
   DSN=username:password@tcp(localhost:3306)/optical_store?charset=utf8mb4&parseTime=True&loc=Local
   PORT=8080
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Run the backend server**
   ```bash
   go run main.go
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend-optical-store
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

### Database Setup

The application automatically creates the database and tables on first run. Ensure MySQL is running and the credentials in the DSN are correct.

---

## Usage

1. **Access the application**: Open `http://localhost:3000` in your browser
2. **Register an account**: Navigate to `/cadastro` to create a new user account
3. **Login**: Use `/login` to authenticate with your credentials
4. **Browse products**: Visit `/loja` to view the product catalog
5. **Admin functions**: Access `/dashboard` (requires authentication) to manage products

---

## Development Guidelines

### Adding New Features

1. **Backend**: Create handlers in `handlers/` directory, add routes in `router/router.go`
2. **Frontend**: Create components in appropriate directories, use TypeScript for type safety
3. **Database**: Add new models to `models/models.go`, run migration

### Code Structure

- Follow Go standard project layout for backend
- Use Next.js 13+ app directory structure for frontend
- Implement proper error handling and loading states
- Use TypeScript interfaces for type safety
- Follow REST API conventions for endpoints

### Security Considerations

- JWT tokens expire after 24 hours
- Passwords are hashed using bcrypt
- File uploads are validated and stored securely
- CORS is configured for cross-origin requests
- Input validation is performed on both client and server

---

This documentation provides a comprehensive overview of the Optical Store Management System. For specific implementation details, refer to the individual source files and their inline comments.

