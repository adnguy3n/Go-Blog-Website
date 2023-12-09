package controller

import (
	"log"
	"regexp"
	"strings"
	"time"

	"github.com/adnguy3n/Go-Blog-Website/server/authenthication"
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
 * Checks if an account with the e-mail address exists.
 */
func emailExists(email string, userData *models.Users) bool {
	exists := databases.DB.Where("email=?", email).First(userData).Error

	// If exists isn't nil, then an account with that e-mail exists.
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

	// Checks if the e-mail address is already in use.
	if emailExists(strings.TrimSpace(data["email"].(string)), &userData) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "E-Mail address already in use.",
		})

	}

	user := models.Users{
		FirstName: data["first_name"].(string),
		LastName:  data["last_name"].(string),
		Phone:     data["phone"].(string),
		Email:     strings.TrimSpace(data["email"].(string)),
	}

	// Set an encrypted password for the account.
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
		"message": "Account created.",
	})
}

/*
 * Log into a user account.
 */
func Login(c *fiber.Ctx) error {
	var (
		data     map[string]string
		userData models.Users
	)

	if err := c.BodyParser(&data); err != nil {
		log.Println("Unable to parse Body.")
	}

	// Checks there is an account with that e-mail address.
	if !emailExists(strings.TrimSpace(data["email"]), &userData) {
		c.Status(404)
		return c.JSON(fiber.Map{
			"message": "An account with that E-Mail Address does not exist.",
		})
	}

	// Generate a JWT token using the E-Mail address and account ID.
	token, err := authenthication.GenerateJWT(userData.Email, userData.Id)

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return nil
	}

	// Check if the password is correct.
	if err := userData.ComparePassword(data["password"]); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Incorrect Password.",
		})
	}

	cookie := fiber.Cookie{
		Name:     "JWT",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "You have successfully logged in.",
	})
}

/*
 * Logout.
 */
func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:    "JWT",
		Value:   "",
		Expires: time.Now().Add(-time.Hour * 24),
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "Logged out.",
	})
}

/*
 * Check if the current login is still valid.
 */
func CheckLogin(c *fiber.Ctx) error {
	if c.Cookies("JWT") == "" {
		return c.JSON(fiber.Map{
			"isValid": false,
		})
	}

	return c.JSON(fiber.Map{
		"isValid": true,
	})
}
