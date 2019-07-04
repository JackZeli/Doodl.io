import React from "react"
import "./ChatBox.css"

class ChatBox extends React.Component{
	constructor(){
		super()
		this.state ={
			messages: [],
			guess: "",
			chat: [],
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		this.setState({guess: event.target.value})
	}

	handleSubmit(event){
		event.preventDefault()
		if(this.state.guess !== ""){
			let tempMessages = this.state.messages.concat(this.state.guess);
			const displayed = tempMessages.map(message => <div> {message} <br /> </div>)
			this.setState(prevState =>{
				return{
					messages: tempMessages,
					guess: "",
					chat: displayed
				}
			})
		}
	}

	render(){
		return(
			<div>
				<div className="log">
					{this.state.chat}
				</div>
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.handleChange} value={this.state.guess} type="text" />
				</form>
			</div>
		)
	}
}

export default ChatBox