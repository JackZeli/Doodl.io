import React from "react"

class WordBox extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			username: this.props.username,
			drawingUser: this.props.currentPlayer,
			word: this.props.word,
		}
	}

	render(){

		return(
			<h1> {this.props.currentPlayer} </h1>
		)
	}
}

export default WordBox