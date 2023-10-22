package routes

import (
	"github.com/adnguy3n/Go-Blog-Website/server/controller"
	"github.com/adnguy3n/Go-Blog-Website/server/middleware"
	"github.com/gofiber/fiber/v2"
)

/*
 * Routes.
 */
func Routes(app *fiber.App) {
	app.Post("account/register", controller.Register)
	app.Post("account/login", controller.Login)

	app.Use(middleware.Authenticate)
	app.Post("blog/post", controller.CreatePost)
	app.Get("blog/getAllPosts", controller.GetAllPosts)
	app.Get("blog/getPost/:post_id", controller.GetPost)
	app.Post("blog/update/:post_id", controller.UpdatePost)
}
