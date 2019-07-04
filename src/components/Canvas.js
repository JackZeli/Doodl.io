import React, { Component } from 'react';
import "./Canvas.css"
import ColorButton from "./colorButton.js"

class Canvas extends Component {
  constructor() {
    super();

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.endPaintEvent = this.endPaintEvent.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
    	isPainting: false,
    	paintColor: "#dfc30e",
    	line: [],
    	prevPos: {
    		offsetX: 0,
    		offsetY: 0
    	},
    	width: 10,
    }
  }

  onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    this.setState({
    		isPainting: true,
    		prevPos: {
    			offsetX: offsetX,
    			offsetY: offsetY,
    		
    	}
    })
  
  }

  handleClick(color) {
  	this.setState({
      paintColor: color
    })
  }

  onMouseMove({ nativeEvent }) {
    if (this.state.isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      const position = {
        start: { ...this.state.prevPos },
        stop: { ...offSetData },
      };
      this.setState(prevState => {
      	return{
	      	line: prevState.line.concat(position),
	      	width: prevState.width + 5
	      }
      })
      this.paint(this.state.prevPos, offSetData, this.state.paintColor);
    }
  }

  endPaintEvent() {
    if (this.state.isPainting) {
    	this.setState({
    		isPainting: false
    	})
    }
  }

  paint(prevPos, currPos, strokeStyle) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
    this.state.prevPos = { offsetX, offsetY };
  }

  componentDidMount() {
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = this.state.width;
  }

  render() {
    const colors=["red", "blue", "green", "yellow", "orange", "purple"]
    const colorChoices = colors.map(item => <ColorButton id={item} handleClick={this.handleClick} color={item}/>)
    return (
    <div>
      <canvas
        ref={(ref) => (this.canvas = ref)}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onMouseMove={this.onMouseMove}
      />
        {colorChoices}
      </div>
    );
  }
}

export default Canvas;