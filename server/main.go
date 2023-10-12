package main

import (
	"fmt"
	//"log"

	"github.com/gofiber/fiber/v2"

	"github.com/adnguy3n/Go-Blog-Website/server/controller"
	"github.com/adnguy3n/Go-Blog-Website/server/databases"
)

/*
 * Main.
 */
func main() {
	fmt.Println("Hello World")
	databases.ConnectDatabase()
	startServer()
}

/*
 * Start Server.
 */
func startServer() {
	app := fiber.New()

	app.Get("/api/healthchecker", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{
			"status":  "success",
			"message": "It's working!",
		})
	})

	routes(app)
	app.Listen(":3000")
}

/*
 * Routes.
 */
func routes(app *fiber.App) {
	app.Post("account/register", controller.Register)
}
