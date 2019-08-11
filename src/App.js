import React, { Component, Fragment } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import ChatBox from './components/ChatBox';
import Login from './components/Login';
import WordBox from './components/WordBox'
import ChoosingScreen from './components/ChoosingScreen'
import Timer from "./components/Clock"
import Lobby from "./components/Lobby"
import EndTurn from "./components/EndTurn"
import {socket} from "./components/socket.js"
import UserList from "./components/UserList"
import socketIOClient from 'socket.io-client'
class App extends Component {

  constructor(){
    super()
    this.state = {
      isLoggedIn: false,
      gameStart: false,
      username: "",
      currentPlayer: "",
      wordChosen: false,
      allGuessed: false,
      users: {},
    }
    this.setUser = this.setUser.bind(this)
    socket.on("set turn", (username) => {
      this.setState({currentPlayer: username, allGuessed: false, wordChosen:false})
    })
    socket.on("word chosen", () => {
      this.setState({wordChosen: true})
    })
    socket.on("update users", (users) => {
      this.setState({users: users})
    })
    socket.on("turn over", () => {
      this.setState({allGuessed: true})
      console.log("AAAAAAAAAA")
      setTimeout(function(){
        socket.emit("next turn")
      }, 1000)
    })
    socket.on("game start", () => {
      this.setState({gameStart: true})
    })
    socket.on("bad name", () => {
      alert("This name is already taken")
      this.setState({username: "", isLoggedIn: false})
    })
    socket.on("get name", () => {
      if(this.state.username !== ""){
        socket.emit("had name", this.state.username)
      }
    })
  }

  setUser(name){
    if(name === ""){
      alert("Enter a valid name!")
    }
    else{
      this.setState({username: name, isLoggedIn: true})
      socket.emit("register user", name)
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.isLoggedIn ? 
          <div>
          {!this.state.gameStart ? 
            <div className="main">
              <Timer />
              <UserList users={this.state.users} />
              <WordBox username={this.state.username} currentPlayer={this.state.currentPlayer}/>
              <div className="box">
                {!this.state.wordChosen && <ChoosingScreen username={this.state.username} currentPlayer={this.state.currentPlayer}/>}
                {this.state.allGuessed && <EndTurn users={this.state.users}/>}
                <Canvas username={this.state.username} currentPlayer={this.state.currentPlayer}/>
              </div>
              <ChatBox username={this.state.username} currentPlayer={this.state.currentPlayer}/>

            </div> :
            <Lobby users={this.state.users} username={this.state.username} currentPlayer={this.state.currentPlayer}/>
          }
          </div>
          :
          <Login setUser={this.setUser} name={this.state.username}/>
        }
      </Fragment>
    );
  }
}
export default App;

/* 
NEXT GOALS:
  - Word box with underlines that get swapped out with letters DONE
  - Timer (develop alongside word box) DONE
  - TURNS like a proper working turn system
  - ROUNDS like a proper working round system
  - AUDIENCE like a proper working audience system
    - they can guess and chat in their own box
    - if all players guess the word before time runs out audience is SOL just as to not slow down the game
    - Never reorder audience players
    - When a player disconnect (find the stipulation between leaving the game by accident and on purpose, maybe a timer?) fill spot with audience member
      - points wont carry
  - reorder the users based on their points at the end of a round


  - Users being able to guess words DONE
      - Display a message to only them saying they guessed it, everyone else sees a different, similar message DONE
      - Actually give the user points DONE

  - Make it not based on username but socket id lmfao

  - Style the word selector lol

User info needed:
  - Username
  - Password (?)
  - Points
  - isDrawing

            <WordBox username={this.state.username} currentPlayer={this.state.currentPlayer}/>


*/

/*{this.state.isLoggedIn ? 
          <loginScreen /> : 
          <div>
            <Canvas />
            <ChatBox endpoint="localhost:4001" />
            </div>
        }*/

        /*{this.state.isLoggedIn ?
          <div>
            <Canvas/>
            <ChatBox endpoint="localhost:4001" />
          </div> :
            <Login setUser={this.setUser} name={this.state.username}/>
        }*/