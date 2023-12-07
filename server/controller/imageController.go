package controller

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

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
		fileName = file.Filename

		if err := c.SaveFile(file, "./uploads/"+fileName); err != nil {
			log.Println(err)
			return err
		}
	}

	return c.JSON(fiber.Map{
		"message": "Image uploaded.",
		"url":     "http://localhost:3000/api/uploads/" + fileName,
	})
}
