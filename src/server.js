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

var curWord = "";

var time = 90;

var diffy = 0;

var points = 200;

var guessed = false;

var myInterval;

var words = ["cat",
"sun",
"cup",
"ghost",
"flower",
"pig",
"cow",
"banana",
"snowflake",
"bug",
"book",
"jar",
"snake",
"light",
"tree",
"lips",
"apple",
"slide",
"socks",
"smile",
"swing",
"coat",
"shoe",
"water",
"heart",
"hat",
"ocean",
"kite",
"dog",
"mouth",
"milk",
"duck",
"eyes",
"skateboard",
"bird",
"boy",
"apple",
"person",
"girl",
"mouse",
"ball",
"house",
"star",
"nose",
"bed",
"whale",
"jacket",
"shirt",
"hippo",
"beach",
"egg",
"face",
"cookie",
"cheese",
"ice cream",
"drum",
"circle",
"spoon",
"worm",
"spider web"]

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected')
  
  socket.on('disconnect', () => {
    if(Object.keys(users).length !== 0 && socket.id in users){
      const temp = users[socket.id]
      io.sockets.emit("member left", temp.name)
      delete users[socket.id]
      io.sockets.emit("update users", users)
    }
    if(Object.keys(users).length === 0){
      users = {}
      allLines = []
      currentPlayer = ""
      curWord = ""
      time = 90;
      diffy = 0;
      points = 200;
      guessed = false;
      clearInterval(myInterval)
    }
    console.log('user disconnected')
  })

  socket.on("begin game", () => {
    io.sockets.emit("game start")
    io.sockets.emit("receive words", words)
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

    if(curWord !== ""){
      io.sockets.emit("word chosen", curWord)
      io.sockets.emit("set timer", time)
      io.sockets.emit("set points", points)
    }
   
  })

  socket.on('send message', (message, username, hidden) => {
  	io.sockets.emit("receive message", message, username, hidden)
  })

  socket.on("send choice", (choice) =>{
    curWord = choice
    io.sockets.emit("word chosen", choice)
    io.sockets.emit("start points")
    io.sockets.emit("set timer", time)
    io.sockets.emit("set points", points)
    myInterval = setInterval(function(){
      if(time == 1){
        clearInterval(myInterval)
      }
      time = time - 1;   
      diffy = diffy + 1;
      points = points - 2;
      if(diffy === 30 || diffy === 60 ){
        io.sockets.emit("update box")
      }
      io.sockets.emit("set timer", time)
      io.sockets.emit("set points", points)   
    }, 1000)
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

  socket.on("correct guess", (username) => {
    users[socket.id].points += points
    io.sockets.emit("word guessed", username)
    if(!guessed){
      time = 30
      io.sockets.emit("set timer", time)
    }
    io.sockets.emit("update users", users)
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))