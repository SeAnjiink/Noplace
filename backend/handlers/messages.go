package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"

	"noplace/models"
)

type MessageService struct {
	db *gorm.DB
}

func NewMessageService(db *gorm.DB) *MessageService {
	return &MessageService{db: db}
}

type SendMessageRequest struct {
	ReceiverID string `json:"receiver_id"`
	Content    string `json:"content"`
}

func (ms *MessageService) SendMessage(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)

	var req SendMessageRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	message := models.Message{
		ID:         uuid.New().String(),
		SenderID:   userID,
		ReceiverID: req.ReceiverID,
		Content:    req.Content,
	}

	if result := ms.db.Create(&message); result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to send message"})
	}

	return c.Status(201).JSON(message)
}

func (ms *MessageService) GetConversation(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	otherUserID := c.Params("userId")

	var messages []models.Message
	result := ms.db.Where(
		"(sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)",
		userID, otherUserID, otherUserID, userID,
	).Order("created_at ASC").Find(&messages)

	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch conversation"})
	}

	return c.JSON(messages)
}

func (ms *MessageService) GetInbox(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)

	var messages []models.Message
	result := ms.db.Where("receiver_id = ?", userID).Order("created_at DESC").Find(&messages)

	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch inbox"})
	}

	return c.JSON(messages)
}
