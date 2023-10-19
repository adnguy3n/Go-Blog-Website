package controller

import (
	"log"
	"math"
	"strconv"

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

/*
 * Get Blog Post.
 */
func GetAllPosts(c *fiber.Ctx) error {
	var (
		total int64
		blog  models.Post
	)

	page, _ := strconv.Atoi(c.Query("page", "1"))
	limit := 5
	offset := (page - 1) * limit

	databases.DB.Preload("Users").Offset(offset).Limit(limit).Find(&blog)
	databases.DB.Model(&models.Post{}).Count(&total)

	return c.JSON(fiber.Map{
		"data": blog,
		"meta": fiber.Map{
			"total":     total,
			"page":      page,
			"last_page": math.Ceil(float64(int(total) / limit)),
		},
	})
}
