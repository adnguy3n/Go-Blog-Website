package middleware

import (
	"github.com/adnguy3n/Go-Blog-Website/server/authenthication"
	"github.com/gofiber/fiber/v2"
)

/*
 * Check to see if the user has the proper authenthication.
 */
func Authenticate(c *fiber.Ctx) error {
	cookie := c.Cookies("JWT")

	if err := authenthication.ValidateToken(cookie); err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated.",
		})
	}

	return c.Next()
}
