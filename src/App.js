import React, { Component, Fragment } from 'react';
import './App.css';
import Canvas from './components/Canvas';
class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="main">
          <Canvas />
        </div>
      </Fragment>
    );
  }
}
export default App;