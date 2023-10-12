package models

import "golang.org/x/crypto/bcrypt"

type Users struct {
	Id        uint   `json:"id"`
	FirstName string `json:"First_Name"`
	LastName  string `json:"Last_Name"`
	Email     string `json:"email"`
	Password  []byte `json:"-"`
	Phone     string `json:"phone"`
}

func (user *Users) SetPassword(password string) {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 14)
	user.Password = hashedPassword
}
