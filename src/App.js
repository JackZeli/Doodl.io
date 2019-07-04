import React, { Component, Fragment } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import ChatBox from './components/ChatBox';
class App extends Component {

  render() {
    return (
      <Fragment>
        <div className="main">
          <Canvas />
          <ChatBox />
        </div>
      </Fragment>
    );
  }
}
export default App;