package models

import (
	"golang.org/x/crypto/bcrypt"
)

type Users struct {
	Id        uint   `json:"id" gorm:"unique"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  []byte `json:"-"`
	Phone     string `json:"phone"`
}

/*
 * Set a password for the account.
 */
func (user *Users) SetPassword(password string) {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 14)
	user.Password = hashedPassword
}

/*
 * Compare the password to the one on the account.
 */
func (user *Users) ComparePassword(password string) error {
	return bcrypt.CompareHashAndPassword(user.Password, []byte(password))
}
