package models

type Post struct {
	PostID      uint   `json:"PostID" gorm:"unique"`
	Title       string `json:"title"`
	Description string `json:"Description"`
	Image       string `json:"email"`
	UserID      uint   `json:"userID"`
	Users       Users  `json:"user" gorm:"foreignKey:UserID"`
}
