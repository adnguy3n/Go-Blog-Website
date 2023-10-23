package controller

import (
	"log"
	"math/rand"

	"github.com/gofiber/fiber/v2"
)

/*
 * Lowercase alphabet.
 */
var letters = []rune("abcdefghijklmnopqrsuvwxyz")

/*
 * Returns a string of n random letters.
 */
func randomLetters(n int) string {
	res := make([]rune, n)

	for i := range res {
		res[i] = letters[rand.Intn(len(letters))]
	}

	return string(res)
}

/*
 * Upload Image.
 */
func Upload(c *fiber.Ctx) error {
	form, err := c.MultipartForm()

	if err != nil {
		return err
	}

	files := form.File["image"]
	fileName := ""

	for _, file := range files {
		fileName = randomLetters(5) + "-" + file.Filename

		if err := c.SaveFile(file, "./uploads/"+fileName); err != nil {
			log.Println(err)
			return err
		}
	}

	return c.JSON(fiber.Map{
		"message": "Image uploaded.",
	})
}
