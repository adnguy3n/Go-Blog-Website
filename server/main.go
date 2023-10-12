package main

import (
	"fmt"

	"github.com/adnguy3n/Go-Blog-Website/server/databases"
)

func main() {
	fmt.Println("Hello World")
	databases.ConnectTestDatabase()
}
