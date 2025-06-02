package handlers

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"backend-optical-store/middleware"
	"backend-optical-store/models"
)

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type registerRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type updateProfileRequest struct {
	Email       *string `json:"email,omitempty"`
	OldPassword *string `json:"old_password,omitempty"`
	NewPassword *string `json:"new_password,omitempty"`
}

type tokenResponse struct {
	AccessToken  string `json:"token"`
	RefreshToken string `json:"refresh_token"`
}

type refreshRequest struct {
	RefreshToken string `json:"refresh_token"`
}

// Register handles user registration
func Register(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req registerRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		// Validate request
		if req.Email == "" || req.Password == "" {
			http.Error(w, "Email and password are required", http.StatusBadRequest)
			return
		}

		// Check if user exists
		var existingUser models.User
		if err := db.Where("email = ?", req.Email).First(&existingUser).Error; err == nil {
			http.Error(w, "Email already registered", http.StatusConflict)
			return
		} else if !errors.Is(err, gorm.ErrRecordNotFound) {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		// Hash password
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		// Create user
		user := models.User{
			Email:        req.Email,
			PasswordHash: string(hashedPassword),
			Role:         req.Role,
		}

		if err := db.Create(&user).Error; err != nil {
			http.Error(w, "Failed to create user", http.StatusInternalServerError)
			return
		}

		// Generate tokens
		tokens, err := generateTokens(user.ID)
		if err != nil {
			http.Error(w, "Failed to generate tokens", http.StatusInternalServerError)
			return
		}

		// Store refresh token in database
		// if err := storeRefreshToken(db, user.ID, tokens.RefreshToken); err != nil {
		// 	http.Error(w, "Failed to store refresh token", http.StatusInternalServerError)
		// 	return
		// }

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(tokens)
	}
}

// Login handles user login
func Login(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req loginRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		var user models.User
		if err := db.Where("email = ?", req.Email).First(&user).Error; err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
			return
		}

		tokens, err := generateTokens(user.ID)
		if err != nil {
			http.Error(w, "Failed to generate tokens", http.StatusInternalServerError)
			return
		}

		// Store refresh token
		if err := storeRefreshToken(db, user.ID, tokens.RefreshToken); err != nil {
			http.Error(w, "Failed to store refresh token", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(tokens)
	}
}

// RefreshToken handles token refresh
func RefreshToken(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req refreshRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		// Validate refresh token
		token, err := jwt.Parse(req.RefreshToken, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, errors.New("unexpected signing method")
			}
			return []byte(middleware.GetJWTSecret()), nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "Invalid refresh token", http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			http.Error(w, "Invalid token claims", http.StatusUnauthorized)
			return
		}

		userID := int64(claims["user_id"].(float64))

		// Verify refresh token exists in database
		var storedToken models.RefreshToken
		if err := db.Where("user_id = ? AND token = ? AND expired = ?", userID, req.RefreshToken, false).First(&storedToken).Error; err != nil {
			http.Error(w, "Invalid refresh token", http.StatusUnauthorized)
			return
		}

		// Generate new tokens
		tokens, err := generateTokens(userID)
		if err != nil {
			http.Error(w, "Failed to generate tokens", http.StatusInternalServerError)
			return
		}

		// Invalidate old refresh token and store new one
		if err := db.Model(&storedToken).Update("expired", true).Error; err != nil {
			http.Error(w, "Failed to invalidate old token", http.StatusInternalServerError)
			return
		}

		if err := storeRefreshToken(db, userID, tokens.RefreshToken); err != nil {
			http.Error(w, "Failed to store refresh token", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(tokens)
	}
}

// GetProfile returns the authenticated user's profile
func GetProfile(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value(middleware.UserIDKey).(int64)

		var user models.User
		if err := db.Preload("Addresses").First(&user, userID).Error; err != nil {
			http.Error(w, "User not found", http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(user)
	}
}

// UpdateProfile handles profile updates
func UpdateProfile(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value(middleware.UserIDKey).(int64)

		var req updateProfileRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		var user models.User
		if err := db.First(&user, userID).Error; err != nil {
			http.Error(w, "User not found", http.StatusNotFound)
			return
		}

		// Handle password update
		if req.OldPassword != nil && req.NewPassword != nil {
			if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(*req.OldPassword)); err != nil {
				http.Error(w, "Invalid old password", http.StatusBadRequest)
				return
			}

			hashedPassword, err := bcrypt.GenerateFromPassword([]byte(*req.NewPassword), bcrypt.DefaultCost)
			if err != nil {
				http.Error(w, "Failed to hash password", http.StatusInternalServerError)
				return
			}
			user.PasswordHash = string(hashedPassword)
		}

		// Handle email update
		if req.Email != nil {
			user.Email = *req.Email
		}

		if err := db.Save(&user).Error; err != nil {
			http.Error(w, "Failed to update profile", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(user)
	}
}

// DeleteProfile soft-deletes the user's account
func DeleteProfile(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value(middleware.UserIDKey).(int64)

		if err := db.Delete(&models.User{}, userID).Error; err != nil {
			http.Error(w, "Failed to delete profile", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

func generateTokens(userID int64) (*tokenResponse, error) {
	// Generate access token
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(15 * time.Minute).Unix(),
	})

	accessTokenString, err := accessToken.SignedString([]byte(middleware.GetJWTSecret()))
	if err != nil {
		return nil, err
	}

	// Generate refresh token
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(7 * 24 * time.Hour).Unix(),
	})

	refreshTokenString, err := refreshToken.SignedString([]byte(middleware.GetJWTSecret()))
	if err != nil {
		return nil, err
	}

	return &tokenResponse{
		AccessToken:  accessTokenString,
		RefreshToken: refreshTokenString,
	}, nil
}

func storeRefreshToken(db *gorm.DB, userID int64, token string) error {
	return db.Create(&models.RefreshToken{
		UserID: userID,
		Token:  token,
	}).Error
}
