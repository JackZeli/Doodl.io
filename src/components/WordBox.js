import React from "react"
import {socket} from "./socket.js"
import "./WordBox.css"


class WordBox extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			username: this.props.username,
			drawingUser: this.props.currentPlayer,
			word: "",
			blanks: "",
		}
		socket.on("word chosen", (choice) => {
			let temp = ""
			var letter;
			for(letter in choice){
				temp += "-"
			}
			this.setState({word: choice, blanks: temp})

			//console.log(this.state.word[0])
		})
		socket.on("update box", () => {
			let bool = false;
			while(!bool){
				let num = Math.floor(Math.random() * this.state.word.length);
				if(this.state.blanks[num] === "-"){
					let tempWord = ""
					let i;
					for (i = 0; i < this.state.blanks.length; i++){
						if(i === parseInt(num)){
							tempWord += this.state.word[parseInt(num)]
						}
						else{
							tempWord += this.state.blanks[i]
						}
					}
					this.setState({blanks: tempWord})
					bool = true
				}
			}
			
		})
	}

	render(){

		return(
			<h1> {this.state.blanks} </h1>
		)
	}
}

export default WordBox