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
	app.Post("api/register", controller.Register)
	app.Post("api/login", controller.Login)
	app.Get("api/logout", controller.Logout)
	app.Get("api/checklogin", controller.CheckLogin)
	app.Get("api/getpost/:post_id", controller.GetPost)
	app.Get("api/getallposts", controller.GetAllPosts)

	app.Use(middleware.Authenticate)
	app.Post("api/post", controller.CreatePost)
	app.Patch("api/update/:post_id", controller.UpdatePost)
	app.Get("api/userposts", controller.GetUserPosts)
	app.Delete("api/delete/:post_id", controller.DeletePost)
	app.Post("api/upload", controller.Upload)
	app.Static("api/uploads", "./uploads")
}
