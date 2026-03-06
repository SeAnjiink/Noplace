package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port     string
	DBHost   string
	DBPort   string
	DBUser   string
	DBPass   string
	DBName   string
	JWTKey   string
	RedisURL string
	Env      string
}

func LoadConfig() Config {
	godotenv.Load()

	return Config{
		Port:     getEnv("PORT", "3001"),
		DBHost:   getEnv("DB_HOST", "localhost"),
		DBPort:   getEnv("DB_PORT", "5432"),
		DBUser:   getEnv("DB_USER", "postgres"),
		DBPass:   getEnv("DB_PASS", "postgres"),
		DBName:   getEnv("DB_NAME", "noplace"),
		JWTKey:   getEnv("JWT_SECRET", "your-secret-key"),
		RedisURL: getEnv("REDIS_URL", "redis://localhost:6379"),
		Env:      getEnv("ENV", "development"),
	}
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
