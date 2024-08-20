let conn = new WebSocket("ws://" + document.location.host + "/ws");

conn.onclose = (evt) => {
  alert("Connection closed");
}

conn.onmessage = (evt) => {
  console.log({ evt });
}

document.addEventListener("keydown", (e) => {
  conn.send(e.key)
})
