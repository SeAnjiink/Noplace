package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"

	"noplace/models"
)

type PostService struct {
	db *gorm.DB
}

func NewPostService(db *gorm.DB) *PostService {
	return &PostService{db: db}
}

type CreatePostRequest struct {
	Content   string `json:"content"`
	Energy    string `json:"energy"`
	Type      string `json:"type"`
	IsAnon    bool   `json:"is_anonymous"`
	BlurHash  string `json:"blur_hash"`
}

type PostResponse struct {
	ID        string `json:"id"`
	UserID    string `json:"user_id"`
	Content   string `json:"content"`
	Energy    string `json:"energy"`
	Type      string `json:"type"`
	IsAnon    bool   `json:"is_anonymous"`
	Views     int    `json:"views"`
	CreatedAt string `json:"created_at"`
}

func (ps *PostService) CreatePost(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)

	var req CreatePostRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	post := models.Post{
		ID:       uuid.New().String(),
		UserID:   userID,
		Content:  req.Content,
		Energy:   req.Energy,
		Type:     req.Type,
		IsAnon:   req.IsAnon,
		BlurHash: req.BlurHash,
		Views:    0,
	}

	if result := ps.db.Create(&post); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create post"})
	}

	return c.Status(201).JSON(post)
}

func (ps *PostService) GetFeed(c *fiber.Ctx) error {
	var posts []models.Post

	// Random order (anti-algorithm)
	result := ps.db.Order("RANDOM()").Limit(20).Find(&posts)

	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch feed"})
	}

	return c.JSON(posts)
}

func (ps *PostService) GetPostByID(c *fiber.Ctx) error {
	postID := c.Params("id")

	var post models.Post
	if result := ps.db.Preload("User").First(&post, "id = ?", postID); result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Post not found"})
	}

	// Increment views
	ps.db.Model(&post).Update("views", gorm.Expr("views + ?", 1))

	return c.JSON(post)
}

func (ps *PostService) DeletePost(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	postID := c.Params("id")

	posting := models.Post{}
	if result := ps.db.First(&posting, "id = ? AND user_id = ?", postID, userID); result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Post not found"})
	}

	ps.db.Delete(&posting)

	return c.JSON(fiber.Map{"message": "Post deleted"})
}
