package databases

import (
	"log"

	"github.com/adnguy3n/Go-Blog-Website/server/models"
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

/*
 * Defining the database. Used across the entire app to communicate with the Database.
 */
var TestDB *gorm.DB

/*
 * Connects to the Database or creates it if it doesn't exist.
 * Currently set to test.db which can be found in the database folder.
 */
func ConnectTestDatabase() {
	database, err := gorm.Open(sqlite.Open("database/test.db"), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to database!")
	}

	log.Println("Connection Successful.")

	err = database.AutoMigrate(&models.Users{})
	if err != nil {
		log.Fatal(err)
	}

	TestDB = database
}
