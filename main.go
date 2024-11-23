package main

import (
	"log"
	"mime"
	"net/http"

	"github.com/gorilla/websocket"
)

var validInputs = map[string]bool{
	"w": true,
	"s": true,
	"a": true,
	"d": true,
}

type webSocketHanlder struct {
	upgrader websocket.Upgrader
	player   Player
}

type Player struct {
	x int8
	y int8
}

type PlayerUpdate struct {
	updateType string
	player     Player
}

func (p *Player) updatePosition(command string) {
	switch command {
	case "w":
		{
			p.y -= 1
			return
		}
	case "s":
		{
			p.y += 1
			return
		}
	case "a":
		{
			p.x -= 1
			return
		}
	case "d":
		{
			p.x += 1
			return
		}
	}
}

func (wsh webSocketHanlder) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	c, err := wsh.upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("error: %s when upgrading connection to websocket", err)
		return
	}

	defer func() {
		log.Println("Closing connection")

		c.Close()
	}()

	for {

		mt, message, err := c.ReadMessage()
		if err != nil {
			log.Printf("Error %s when reading message from client", err)

			return

		}

		if mt == websocket.BinaryMessage {

			err = c.WriteMessage(websocket.TextMessage, []byte("server doesn't support binary messages"))
			if err != nil {
				log.Printf("Error %s when sending message to client", err)
			}

			return

		}

		log.Printf("Receive message %s", string(message))

		if !validInputs[string(message)] {
			log.Printf("Invalid input: %s", string(message))
			return
		}

		log.Println("start responding to client...")

		wsh.player.updatePosition(string(message))

		log.Printf("New position %d, %d", wsh.player.x, wsh.player.y)
		// err = c.WriteMessage(websocket.TextMessage, []byte(json.NewEncoder(w)))
		err = c.WriteJSON(PlayerUpdate{
			updateType: "movement",
			player:     wsh.player,
		})
		if err != nil {

			log.Printf("Error %s when sending message to client", err)

			return

		}

	}
}

func main() {
	mime.AddExtensionType(".js", "application/javascript")
	http.Handle("/", http.FileServer(http.Dir("./view")))
	log.Println("Starting server...")
	log.Fatal(http.ListenAndServe("localhost:8080", nil))
}
