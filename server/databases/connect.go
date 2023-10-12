package databases

import (
	"fmt"

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
		panic("Failed to connect to database!")
	}

	fmt.Println("Connection Successful.")

	TestDB = database
}
