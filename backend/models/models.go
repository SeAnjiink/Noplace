package models

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

// User represents a NoPlace user
type User struct {
	ID        string    `gorm:"primaryKey" json:"id"`
	Username  string    `gorm:"uniqueIndex;not null" json:"username"`
	Email     string    `gorm:"uniqueIndex;not null" json:"email"`
	Password  string    `json:"-"`
	AuraType  string    `json:"aura_type"` // e.g., "Soft Chaos"
	EnergyBadge string  `json:"energy_badge"` // e.g., "Rising"
	JournalStreak int   `json:"journal_streak"`
	IsAnonymous bool    `json:"is_anonymous"`
	IsActive  bool      `json:"is_active"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	DeletedAt sql.NullTime `gorm:"index" json:"deleted_at"`
}

// Post represents a user post on NoPlace
type Post struct {
	ID        string    `gorm:"primaryKey" json:"id"`
	UserID    string    `gorm:"index" json:"user_id"`
	Content   string    `json:"content"`
	Energy    string    `json:"energy"` // soft, chaos, sadcore, villain, healing, overthinking
	Type      string    `json:"type"` // text, photo, audio, poll
	IsAnon    bool      `json:"is_anonymous"`
	BlurHash  string    `json:"blur_hash"`
	Views     int       `json:"views"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	ExpiresAt sql.NullTime `json:"expires_at"`
	User      User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
}

// Reaction represents a user reaction to a post
type Reaction struct {
	ID        string    `gorm:"primaryKey" json:"id"`
	PostID    string    `gorm:"index" json:"post_id"`
	UserID    string    `gorm:"index" json:"user_id"`
	Type      string    `json:"type"` // relate, tooReal, chaos, mainChar, silentScream
	CreatedAt time.Time `json:"created_at"`
}

// Message represents a direct message between users
type Message struct {
	ID        string    `gorm:"primaryKey" json:"id"`
	SenderID  string    `gorm:"index" json:"sender_id"`
	ReceiverID string   `gorm:"index" json:"receiver_id"`
	Content   string    `json:"content"`
	IsRead    bool      `json:"is_read"`
	CreatedAt time.Time `json:"created_at"`
	ExpiresAt time.Time `json:"expires_at"` // 24 hours from creation
	User      User      `gorm:"foreignKey:SenderID" json:"sender,omitempty"`
}

// MoodCategory represents mood-based content categories
type MoodCategory struct {
	ID        string    `gorm:"primaryKey" json:"id"`
	Name      string    `json:"name"` // 3AM Thoughts, Existential, etc
	Icon      string    `json:"icon"`
	Desc      string    `json:"description"`
	Color     string    `json:"color"`
	CreatedAt time.Time `json:"created_at"`
}

// Before creating a User, generate UUID if not set
func (u *User) BeforeCreate(tx interface{}) error {
	if u.ID == "" {
		u.ID = uuid.New().String()
	}
	return nil
}

// Before creating a Post, generate UUID if not set
func (p *Post) BeforeCreate(tx interface{}) error {
	if p.ID == "" {
		p.ID = uuid.New().String()
	}
	return nil
}

// Before creating a Reaction, generate UUID if not set
func (r *Reaction) BeforeCreate(tx interface{}) error {
	if r.ID == "" {
		r.ID = uuid.New().String()
	}
	return nil
}

// Before creating a Message, generate UUID if not set
func (m *Message) BeforeCreate(tx interface{}) error {
	if m.ID == "" {
		m.ID = uuid.New().String()
	}
	if m.ExpiresAt.IsZero() {
		m.ExpiresAt = time.Now().Add(24 * time.Hour)
	}
	return nil
}
