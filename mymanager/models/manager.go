package models

import (
	"mymanager/database"

	"github.com/gofiber/fiber"
)

type Mylist struct {
	ID uint `gorm:"primarykey" json:"id"`
	Title string `json:"title"`
	IfCompleted bool `json:"iscompleted"`
}

func GetMylist(c *fiber.Ctx) error{
	db := database.DBConn
	var mylist []Mylist
	db.Find(&mylist)

	return c.JSON(&mylist)
}

func CreateMylist(c *fiber.Ctx) error{
	db := database.DBConn
	mylist := new(Mylist)
	err := c.BodyParser(mylist)

	if err!=nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message":"Check your input", "data": err})
	}

	err = db.Create(&mylist).Error

	if err!=nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Could not create the list.", "data": err})
	}

	return c.JSON(&mylist)
}

func GetMylistbyID(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn
	var mylist Mylist
	err := db.Find(&mylist, id).Error

	if err!=nil{
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "List not found.", "data": err})
	}

	return c.JSON(&mylist)
}

func UpdateMylist(c *fiber.Ctx) error{
	type UpdatedMylist struct {
		ID uint `gorm:"primarykey" json:"id"`
		Title string `json:"title"`
		IfCompleted bool `json:"iscompleted"`
	}
	id := c.Params("id")
	db := database.DBConn
	var mylist Mylist
	err := db.Find(&mylist, id).Error

	if err!=nil{
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "List not found.", "data": err})
	}

	var updatedmylist UpdatedMylist
	err = c.BodyParser(&updatedmylist)

	if err!=nil{
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Check your input again.", "data": err})
	}

	mylist.Title = updatedmylist.Title
	mylist.IfCompleted = updatedmylist.IfCompleted
	db.Save(&mylist)
	return c.JSON(&mylist)
}

// func DeleteMylist(c *fiber.Ctx) error{
// 	id := c.Params("id")
// 	db := database.DBConn
// 	var mylist Mylist
// 	err := db.Find(&mylist, id).Error

// 	if err!=nil{
// 		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "List not found.", "data": err})
// 	}

// 	db.Delete(&mylist)
// 	return c.SendStatus(200)
// }