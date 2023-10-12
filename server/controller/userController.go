package controller

import (
	"log"
	"regexp"
	"strings"

	"github.com/adnguy3n/Go-Blog-Website/server/databases"
	"github.com/adnguy3n/Go-Blog-Website/server/models"
	"github.com/gofiber/fiber/v2"
)

/*
 * Check if password is at least 8 characters long
 */
func checkPasswordLength(password string) bool {
	return len(password) < 8
}

/*
 * Checks if the e-mail address is a valid e-mail address.
 */
func validateEmail(email string) bool {
	emailFormat := regexp.MustCompile(`[a-z0-9._%+\-]+@[a-z0-9._%+\-]+\.[a-z0-9._%+\-]`)
	return emailFormat.MatchString(email)
}

/*
 * Checks if the e-mail address is already in use.
 */
func checkDupeEmail(email string, userData models.Users) bool {
	exists := databases.DB.Where("email=?", email).First(&userData).Error

	// If exists isn't nil, then an account with that e-mail already exists.
	return exists == nil
}

/*
 * Register a user account.
 */
func Register(c *fiber.Ctx) error {
	var (
		data     map[string]interface{}
		userData models.Users
	)

	if err := c.BodyParser(&data); err != nil {
		log.Println("Unable to parse Body.")
	}

	// Check if password is of a valid length.
	if checkPasswordLength(data["password"].(string)) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Password must at least 8 characters.",
		})
	}

	// Checks if the e-mail is valid.
	if !validateEmail(strings.TrimSpace(data["email"].(string))) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Invalid E-Mail Address.",
		})
	}

	// Checks if email already exist in database.
	if checkDupeEmail(strings.TrimSpace(data["email"].(string)), userData) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Email already exist",
		})

	}

	user := models.Users{
		FirstName: data["First_Name"].(string),
		LastName:  data["Last_Name"].(string),
		Phone:     data["phone"].(string),
		Email:     strings.TrimSpace(data["email"].(string)),
	}

	// Encrypt Password.
	user.SetPassword(data["password"].(string))

	// Create the user in the database.
	if err := databases.DB.Create(&user); err.Error != nil {
		log.Println(err.Error)
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Account Creation Unsuccessful.",
		})
	}

	c.Status(200)
	return c.JSON(fiber.Map{
		"user":    user,
		"message": "Account created.",
	})
}
