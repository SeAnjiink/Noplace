package routes

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"noplace/config"
	"noplace/handlers"
	"noplace/middleware"
)

func SetupRoutes(app *fiber.App, db *gorm.DB, cfg config.Config) {
	// Middleware
	app.Use(middleware.CORSMiddleware())

	// Services
	userService := handlers.NewUserService(db, cfg)
	postService := handlers.NewPostService(db)
	reactionService := handlers.NewReactionService(db)
	messageService := handlers.NewMessageService(db)

	// Public routes
	app.Post("/api/auth/signup", userService.Signup)
	app.Post("/api/auth/login", userService.Login)

	// Protected routes
	apiGroup := app.Group("/api", middleware.JWTMiddleware(cfg.JWTKey))

	// User routes
	apiGroup.Get("/user/profile", userService.GetProfile)

	// Post routes
	apiGroup.Post("/posts", postService.CreatePost)
	apiGroup.Get("/posts/feed", postService.GetFeed)
	apiGroup.Get("/posts/:id", postService.GetPostByID)
	apiGroup.Delete("/posts/:id", postService.DeletePost)

	// Reaction routes
	apiGroup.Post("/posts/:postId/reactions", reactionService.AddReaction)
	apiGroup.Get("/posts/:postId/reactions", reactionService.GetReactions)

	// Message routes
	apiGroup.Post("/messages", messageService.SendMessage)
	apiGroup.Get("/messages/inbox", messageService.GetInbox)
	apiGroup.Get("/messages/:userId", messageService.GetConversation)

	// Health check
	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok"})
	})
}
