package controller

import (
	"log"

	"github.com/adnguy3n/Go-Blog-Website/server/databases"
	"github.com/adnguy3n/Go-Blog-Website/server/models"
	"github.com/gofiber/fiber/v2"
)

/*
 * Create Blog Post.
 */
func CreatePost(c *fiber.Ctx) error {
	var blogPost models.Post

	if err := c.BodyParser(&blogPost); err != nil {
		log.Println("Unable to parse body")
	}

	if err := databases.DB.Create(&blogPost).Error; err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unable to create blog post.",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Blog post posted!",
	})
}
