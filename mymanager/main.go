package main

import (
	"fmt"
	"mymanager/database"
	//"mymanager/models"
	"github.com/gofiber/fiber"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"github.com/gofiber/fiber/v2/middleware/cors"

)

type Mylist struct {
	ID uint `gorm:"primarykey" json:"id"`
	Title string `json:"title"`
	IfCompleted bool `json:"iscompleted"`
}

func getMylist(c *fiber.Ctx) error{
	db := database.DBConn
	var mylist []Mylist
	db.Find(&mylist)

	return c.JSON(&mylist)
}

func createMylist(c *fiber.Ctx) error{
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

func getMylistbyID(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DBConn
	var mylist Mylist
	err := db.Find(&mylist, id).Error

	if err!=nil{
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "List not found.", "data": err})
	}

	return c.JSON(&mylist)
}

func updateMylist(c *fiber.Ctx) error{
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

func deleteMylist(c *fiber.Ctx) error{
	id := c.Params("id")
	db := database.DBConn
	var mylist Mylist
	err := db.Find(&mylist, id).Error

	if err!=nil{
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "List not found.", "data": err})
	}

	db.Delete(&mylist)
	c.Status(200).SendString("Deleted")
	return nil
}

func initDatabase(){
	var err error
	dsn := "host=localhost user=neha.kumari11 dbname=postgres port=5432"
	database.DBConn, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err!=nil {
		panic("Failed to connect to database!")
	}

	fmt.Println("Database connected!")
	database.DBConn.AutoMigrate(Mylist{})
	fmt.Println("Migrated database!")
}

func setupRoutes(app *fiber.App){
	app.Get("/mylist", getMylist)
	app.Post("/mylist", createMylist)
	app.Get("/mylist/:id", getMylistbyID)
	app.Put("/mylist/:id", updateMylist)
	app.Delete("/mylist/:id", deleteMylist)
} 

func main(){
	app := fiber.New()
	app.Use(cors.New())
	initDatabase()
	app.Get("/", helloWorld)
	setupRoutes(app)
	
	app.Listen(":3000")
}

func helloWorld(c *fiber.Ctx) error{
	c.SendString("Hello World")
	return nil
}



