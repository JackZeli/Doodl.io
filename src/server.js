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

var users = {};

var allLines = [];

var currentPlayer = "";

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected')
  
  socket.on('disconnect', () => {
    if(Object.keys(users).length !== 0 && socket.id in users){
      const temp = users[socket.id]
      io.sockets.emit("member left", temp.name)
      delete users[socket.id]
    }
    if(Object.keys(users).length === 0){
      users = {}
      allLines = []
      currentPlayer = ""
    }
    console.log('user disconnected')
  })

  socket.on('register user', (username) => {
    if(Object.keys(users).length == 0){
      io.sockets.emit("set turn", username)
      currentPlayer = username;
    }
    else{
      io.sockets.emit("set turn", currentPlayer)
    }
    const user = {
      name: username,
      points: 0,
    }
    users[socket.id] = user
    io.sockets.emit("member joined", username)
    io.sockets.emit("update users", users)
    io.sockets.emit("draw up", allLines)
  })

  socket.on('send message', (message, username, hidden) => {
  	io.sockets.emit("receive message", message, username, hidden)
  })

  socket.on("send choice", (choice) =>{
    io.sockets.emit("word chosen", choice)
    io.sockets.emit("start timer")
  })

  socket.on("send paint", (strokeStyle, x, y, offsetX, offsetY) =>{
    const paint = {
      strokeStyle: strokeStyle,
      x: x,
      y: y,
      offsetX: offsetX,
      offsetY: offsetY
    }
    allLines.push(paint)
  	io.sockets.emit("receive paint", strokeStyle, x, y, offsetX, offsetY)
  })

  socket.on("correct guess", (username, points) => {
    users[socket.id].points += points
    io.sockets.emit("word guessed", username)
    io.sockets.emit("update users", users)
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))