import React, { Component, Fragment } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import ChatBox from './components/ChatBox';
import Login from './components/Login';
import WordBox from './components/WordBox'
import {socket} from "./components/socket.js"
import socketIOClient from 'socket.io-client'
class App extends Component {

  constructor(){
    super()
    this.state = {
      isLoggedIn: false,
      username: "",
      currentPlayer: "",
    }
    this.setUser = this.setUser.bind(this)
    socket.on("set turn", (username) => {
      this.setState({currentPlayer: username})
      console.log(this.state)
    })
  }

  setUser(name){
    this.setState({username: name, isLoggedIn: true})
    socket.emit("register user", name)
  }

  render() {
    return (
      <Fragment>
        {this.state.isLoggedIn ? 
          <div className="main">
            <WordBox username={this.state.username} currentPlayer={this.state.currentPlayer}/>
            <Canvas username={this.state.username} currentPlayer={this.state.currentPlayer}/>
            <ChatBox username={this.state.username} currentPlayer={this.state.currentPlayer}/>
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
  - Timer (develop alongside word box)
  - Users being able to guess words
      - Display a message to only them saying they guessed it, everyone else sees a different, similar message
      - Actually give the user points

User info needed:
  - Username
  - Password (?)
  - Points
  - isDrawing


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