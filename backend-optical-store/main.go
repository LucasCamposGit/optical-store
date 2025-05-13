package main

import (
	"github.com/joho/godotenv"
	"log"

	chimw "github.com/go-chi/chi/v5/middleware"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	db.ConnectDB()
	r := chi.NewRouter()

	r.use(chimw.Logger)
	r.use(chimw.Recoverer)

	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}
			next.ServeHTTP(w, r)
		})
	})

	r.Post("/api/register", handlers.Register)
	r.Post("/api/login", handlers.Login)
	r.Post("/api/refresh-token", handlers.RefreshToken)
	r.Post("/api/google-login", handlers.GoogleLogin)

}
