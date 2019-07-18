import React from "react"
import {socket} from "./socket.js"


class WordBox extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			username: this.props.username,
			drawingUser: this.props.currentPlayer,
			word: "",
		}
		socket.on("word chosen", (choice) => {
			this.setState({word: choice})
			//console.log(this.state.word[0])
		})
	}

	render(){

		return(
			<h1> {this.state.word} </h1>
		)
	}
}

export default WordBox