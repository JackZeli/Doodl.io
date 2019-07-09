import React, { Component, Fragment } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import ChatBox from './components/ChatBox';
import Login from './components/Login';
class App extends Component {

  constructor(){
    super()
    this.state = {
      isLoggedIn: false,
      username: "",
    }
    this.setUser = this.setUser.bind(this)
  }

  setUser(name){
    this.setState({username: name, isLoggedIn: true})
  }

  render() {
    return (
      <Fragment>
        {this.state.isLoggedIn ? 
          <div className="main">
            <Canvas />
            <ChatBox username={this.state.username} endpoint="localhost:4001" />
          </div> 
          :
          <Login setUser={this.setUser} name={this.state.username}/>
        }
      </Fragment>
    );
  }
}
export default App;

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