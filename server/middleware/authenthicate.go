package middleware

import (
	"github.com/adnguy3n/Go-Blog-Website/server/authenthication"
	"github.com/gofiber/fiber/v2"
)

/*
 *
 */
func Authenticate(c *fiber.Ctx) error {
	cookie := c.Cookies("JWT")

	if err := authenthication.ValidateToken(cookie); err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	return c.Next()
}
