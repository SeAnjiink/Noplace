package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"

	"noplace/models"
)

type ReactionService struct {
	db *gorm.DB
}

func NewReactionService(db *gorm.DB) *ReactionService {
	return &ReactionService{db: db}
}

type AddReactionRequest struct {
	Type string `json:"type"` // relate, tooReal, chaos, mainChar, silentScream
}

func (rs *ReactionService) AddReaction(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	postID := c.Params("postId")

	var req AddReactionRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	// Check if reaction already exists
	var existingReaction models.Reaction
	rs.db.Where("post_id = ? AND user_id = ? AND type = ?", postID, userID, req.Type).First(&existingReaction)

	if existingReaction.ID != "" {
		// Remove reaction if it already exists
		rs.db.Delete(&existingReaction)
		return c.JSON(fiber.Map{"message": "Reaction removed"})
	}

	reaction := models.Reaction{
		ID:     uuid.New().String(),
		PostID: postID,
		UserID: userID,
		Type:   req.Type,
	}

	if result := rs.db.Create(&reaction); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to add reaction"})
	}

	return c.Status(201).JSON(reaction)
}

func (rs *ReactionService) GetReactions(c *fiber.Ctx) error {
	postID := c.Params("postId")

	var reactions []models.Reaction
	if result := rs.db.Where("post_id = ?", postID).Find(&reactions); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch reactions"})
	}

	return c.JSON(reactions)
}
