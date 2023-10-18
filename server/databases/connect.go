package databases

import (
	"log"

	"github.com/adnguy3n/Go-Blog-Website/server/models"
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

/*
 * Defining the database. Used across the entire app to communicate with the Database.
 */
var DB *gorm.DB

/*
 * Connects to the Database or creates it if it doesn't exist.
 */
func ConnectDatabase() {
	database, err := gorm.Open(sqlite.Open("database/DB.db"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})

	if err != nil {
		log.Fatal("Failed to connect to database!")
	}

	log.Println("Connection Successful.")

	err = database.AutoMigrate(&models.Users{})
	if err != nil {
		log.Fatal(err)
	}

	err = database.AutoMigrate(&models.Post{})
	if err != nil {
		log.Fatal(err)
	}

	DB = database
}
