package models

type Post struct {
	PostID      uint   `json:"postID" gorm:"unique"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Image       string `json:"image"`
	UserID      uint   `json:"userID"`
	Users       Users  `json:"user" gorm:"foreignKey:UserID"`
}
