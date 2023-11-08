package main

import (
	"fmt"
	//"log"

	"github.com/gofiber/fiber/v2"

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

	routes.Routes(app)
	app.Listen(":3000")
}
