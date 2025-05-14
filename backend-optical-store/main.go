package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	chimw "github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"

	"backend-optical-store/db"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: Error loading .env file, using default environment variables")
	}

	// Connect to database
	db.ConnectDB()
	r := SetupRouter(db.DB)
	r.Use(chimw.Logger)
	r.Use(chimw.Recoverer)

	// CORS middleware
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

	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Create server with graceful shutdown
	server := &http.Server{
		Addr:    ":" + port,
		Handler: r,
	}

	// Channel to listen for interrupt signals
	serverCtx, serverStopCtx := context.WithCancel(context.Background())

	// Listen for interrupt signals
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT)
	go func() {
		<-sig
		// Shutdown signal with 30 seconds timeout
		shutdownCtx, cancelCtx := context.WithTimeout(serverCtx, 30*time.Second)
		defer cancelCtx() // Ensure the cancel function is called to avoid context leak

		go func() {
			<-shutdownCtx.Done()
			if shutdownCtx.Err() == context.DeadlineExceeded {
				log.Fatal("Graceful shutdown timed out.. forcing exit.")
			}
		}()

		// Trigger graceful shutdown
		err := server.Shutdown(shutdownCtx)
		if err != nil {
			log.Fatal(err)
		}
		serverStopCtx()
	}()

	// Start server
	log.Printf("Server starting on port %s", port)
	err = server.ListenAndServe()
	if err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}

	// Wait for server context to be stopped
	<-serverCtx.Done()
	log.Println("Server stopped")
}
