package main

import (
	"log"
	"mime"
	"net/http"
)

const PORT = "8080"

func main() {
	err := mime.AddExtensionType(".js", "application/javascript")
	if err != nil {
		log.Println("Error occured")
	}

	http.Handle("/", http.FileServer(http.Dir("./view")))
	log.Println("Starting server...")
	log.Fatal(http.ListenAndServe("localhost:8080", nil))
}
