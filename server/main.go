package main

import (
	"fmt"
	//"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"github.com/adnguy3n/Go-Blog-Website/server/databases"
	"github.com/adnguy3n/Go-Blog-Website/server/routes"
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

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3001",
	}))

	routes.Routes(app)
	app.Listen(":3000")
}
