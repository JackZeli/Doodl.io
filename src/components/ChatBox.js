import React from "react"
import "./ChatBox.css"
import socketIOClient from 'socket.io-client'


class ChatBox extends React.Component{
	constructor(){
		super()
		this.state ={
			messages: [],
			guess: "",
			chat: [],
			endpoint: "localhost:4001"
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		const socket = socketIOClient(this.state.endpoint);
		socket.on('update chat', (updated) => {
			console.log("received ", updated)
			const displayed = updated.map(message => <div> {message} <br /> </div>)
			this.setState({chat: displayed, messages: updated})
		})
	}

	handleChange(event){
		this.setState({guess: event.target.value})
	}

	handleSubmit(event){
		event.preventDefault()
		if(this.state.guess !== ""){
			let tempMessages = this.state.messages.concat(this.state.guess);
			
			this.setState(prevState =>{
				return{
					messages: tempMessages,
					guess: "",
				}
			})
			const socket = socketIOClient(this.state.endpoint)
			socket.emit('update chat', tempMessages)
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