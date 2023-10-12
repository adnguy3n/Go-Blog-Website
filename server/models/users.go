package models

type Users struct {
	Id        uint   `json:"id"`
	FirstName string `json:"First_Name"`
	LastName  string `json:"Last_Name"`
	Email     string `json:"email" gorm:"unique"`
	Password  []byte `json:"-"`
	Phone     string `json:"phone"`
}
