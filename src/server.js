const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 4001

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected')
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('send message', (message) => {
  	io.sockets.emit("receive message", message)
  })

  socket.on("send paint", (strokeStyle, x, y, offsetX, offsetY) =>{
  	io.sockets.emit("receive paint", strokeStyle, x, y, offsetX, offsetY)
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))