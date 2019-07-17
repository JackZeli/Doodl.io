import React from "react"
import "./ChatBox.css"
import {socket} from "./socket.js"
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
		socket.on('receive message', (message, username) => {
			let tempMessages = this.state.messages.concat(message)
			const display = <div> {username}: {message} <br /> </div>

			//const displayed = tempMessages.map(message => <div> {username}: {message} <br /> </div>)
			this.setState(prevState =>{
				return{
					chat: prevState.chat.concat(display), 
					messages: tempMessages
				}
			})
			
		})
		socket.on('member joined', (username) => {
			const display = <div className="join"> {username} has joined the game. <br /> </div>
			this.setState(prevState =>{
				return{
					chat: prevState.chat.concat(display), 
				}
			})
		})
		socket.on('member left', (username) => {
			const display = <div className="leave"> {username} has left the game. <br /> </div>
			this.setState(prevState =>{
				return{
					chat: prevState.chat.concat(display), 
				}
			})
		})
	}

	handleChange(event){
		this.setState({guess: event.target.value})
	}

	handleSubmit(event){
		event.preventDefault()
		if(this.state.guess !== ""){
			let tempMessages = this.state.messages.concat(this.state.guess);
			socket.emit('send message', this.state.guess, this.props.username)
			this.setState(prevState =>{
				return{
					guess: "",
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