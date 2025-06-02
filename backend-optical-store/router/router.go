package router

import (
	"backend-optical-store/handlers"
	"backend-optical-store/middleware"

	"net/http"

	"github.com/go-chi/chi/v5"
	"gorm.io/gorm"
)


// New configures all routes for the application
func New(db *gorm.DB) chi.Router {
	r := chi.NewRouter()

	// Public routes
	r.Post("/api/register", handlers.Register(db))
	r.Post("/api/login", handlers.Login(db))
	r.Post("/api/refresh-token", handlers.RefreshToken(db))
	r.Get("/api/products/{id}", handlers.GetProduct(db))
	r.Get("/api/products", handlers.GetProducts(db))
	
	fileServer := http.FileServer(http.Dir("./uploads"))
	r.Handle("/api/uploads/*", http.StripPrefix("/api/uploads/", fileServer))
	// Protected routes
	r.Group(func(r chi.Router) {
		r.Use(middleware.AuthMiddleware)

		r.Route("/api", func(r chi.Router) {
			r.Get("/profile", handlers.GetProfile(db))
			r.Put("/profile", handlers.UpdateProfile(db))
			r.Delete("/profile", handlers.DeleteProfile(db))
		}) 
	})

	return r
}
