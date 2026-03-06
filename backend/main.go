package main

import (
	"log"

	"github.com/gofiber/fiber/v2"

	"noplace/config"
	"noplace/database"
	"noplace/routes"
)

func main() {
	// Load config
	cfg := config.LoadConfig()

	// Initialize database
	db := database.InitDB(cfg)

	// Create Fiber app
	app := fiber.New(fiber.Config{
		AppName: "NoPlace API",
	})

	// Setup routes
	routes.SetupRoutes(app, db, cfg)

	// Start server
	log.Println("🚀 Server starting on port", cfg.Port)
	if err := app.Listen(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
