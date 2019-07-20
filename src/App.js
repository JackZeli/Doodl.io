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
      console.log(this.state)
    })
    socket.on("word chosen", () => {
      this.setState({wordChosen: true})
    })
    socket.on("update users", (users) => {
      this.setState({users: users})
    })
    socket.on("turn over", () => {
      this.setState({allGuessed: true})
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
  - Word box with underlines that get swapped out with letters
  - Timer (develop alongside word box) DONE
  - Users being able to guess words
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