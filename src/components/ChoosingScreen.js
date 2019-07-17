import React from "react"
import "./ChoosingScreen.css"
import {socket} from "./socket.js"

class ChoosingScreen extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			username: this.props.username,
			currentPlayer: this.props.currentPlayer,
			choices: ["apple", "banana", "orange"]
		}
		this.sendChoice = this.sendChoice.bind(this)
	}

	componentDidUpdate(prevProps){
    if(this.props.currentPlayer !== prevProps.currentPlayer){
      this.setState({currentPlayer: this.props.currentPlayer})
    }
  }

  	sendChoice(choice){
  		socket.emit("send choice", choice);
  	}


	render(){
		var display = ""
		if(this.state.username === this.state.currentPlayer){
			const wordChoices = this.state.choices.map(choice => <button onClick={() => this.sendChoice(choice)}> {choice} </button>)
			display = <div className="wordSelector"> <h2> Pick a word </h2> {wordChoices} </div>
		}
		else {
			display = <div className="wordSelector"> <h2> {this.state.currentPlayer} is choosing a word </h2> </div>
		}
		return(
			<h1> {display} </h1>
		)
	}
}

export default ChoosingScreen