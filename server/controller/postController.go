package controller

import (
	"errors"
	"strconv"

	"github.com/adnguy3n/Go-Blog-Website/server/authenthication"
	"github.com/adnguy3n/Go-Blog-Website/server/databases"
	"github.com/adnguy3n/Go-Blog-Website/server/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

/*
 * Create Blog Post.
 */
func CreatePost(c *fiber.Ctx) error {
	cookie := c.Cookies("JWT")
	id, _ := authenthication.ValidateToken(cookie)

	blogPost := models.Post{
		UserID: id,
	}

	if err := c.BodyParser(&blogPost); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"Message": "Unable to parse body",
		})
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
 * Get all Blog Post.
 */
func GetAllPosts(c *fiber.Ctx) error {
	var (
		total    int64
		blogPost []models.Post
	)

	page, _ := strconv.Atoi(c.Query("page", "1"))
	limit := 12
	offset := (page - 1) * limit

	databases.DB.Preload("Users").Offset(offset).Limit(limit).Find(&blogPost)
	databases.DB.Model(&models.Post{}).Count(&total)

	return c.JSON(fiber.Map{
		"data": blogPost,
		"meta": fiber.Map{
			"total":     total,
			"page":      page,
			"last_page": float64(int(total) / limit),
		},
	})
}

/*
 * Get Blog Post.
 */
func GetPost(c *fiber.Ctx) error {
	var blogPost models.Post
	id, _ := strconv.Atoi(c.Params("post_id"))

	if err := databases.DB.Where("post_id=?", uint(id)).Preload("Users").First(&blogPost).Error; err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Post not found.",
		})
	}

	return c.JSON(fiber.Map{
		"data": blogPost,
	})
}

/*
 * Update Blog Post.
 */
func UpdatePost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("post_id"))

	blogPost := models.Post{
		PostID: uint(id),
	}

	if err := c.BodyParser(&blogPost); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"Message": "Unable to parse body",
		})
	}

	if err := databases.DB.Model(&blogPost).Updates(blogPost).Error; err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"Error": err,
		})
	}

	return c.JSON(fiber.Map{
		"message": "Post updated.",
	})
}

/*
 * Get All Posts by current user.
 */
func GetUserPosts(c *fiber.Ctx) error {
	var blogPosts []models.Post
	cookie := c.Cookies("JWT")
	id, _ := authenthication.ValidateToken(cookie)

	if err := databases.DB.Model(&blogPosts).Where("user_id=?", id).Preload("Users").Find(&blogPosts).Error; err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"Error": err,
		})
	}

	return c.JSON(blogPosts)
}

/*
 * Delete Post.
 */
func DeletePost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("post_id"))

	blogPost := models.Post{
		PostID: uint(id),
	}

	if err := databases.DB.Delete(&blogPost).Error; errors.Is(err, gorm.ErrRecordNotFound) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"Error": "Post not found.",
		})
	} else if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"Error": err,
		})
	}

	return c.JSON(fiber.Map{
		"message": "Post Deleted.",
	})
}
