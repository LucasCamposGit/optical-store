package middleware

import (
	"context"
	"errors"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

var (
	ErrNoToken      = errors.New("no token provided")
	ErrInvalidToken = errors.New("invalid token")
)

type contextKey string

const UserIDKey contextKey = "userID"

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, ErrNoToken.Error(), http.StatusUnauthorized)
			return
		}

		// Bearer token format
		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			http.Error(w, ErrInvalidToken.Error(), http.StatusUnauthorized)
			return
		}

		token, err := jwt.Parse(tokenParts[1], func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, ErrInvalidToken
			}
			return []byte(GetJWTSecret()), nil
		})

		if err != nil || !token.Valid {
			http.Error(w, ErrInvalidToken.Error(), http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			http.Error(w, ErrInvalidToken.Error(), http.StatusUnauthorized)
			return
		}

		userID, ok := claims["user_id"].(float64)
		if !ok {
			http.Error(w, ErrInvalidToken.Error(), http.StatusUnauthorized)
			return
		}

		// Add userID to request context
		ctx := context.WithValue(r.Context(), UserIDKey, int64(userID))
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetJWTSecret() string {
	// TODO: Load from environment variable
	return "your-secret-key"
}
