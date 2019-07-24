import React from "react"
import "./ChatBox.css"
import {socket} from "./socket.js"
import socketIOClient from 'socket.io-client'

class ChatBox extends React.Component{

	constructor(props){
		super(props)
		this.state ={
			messages: [],
			guess: "",
			guessed: false,
			chat: [],
			word: "",
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		socket.on('receive message', (message, username, hidden) => {
			if(this.state.guessed && hidden){
				let tempMessages = this.state.messages.concat(message)
				const display = <div className="join"> {username}: {message} <br /> </div>
				this.setState(prevState =>{
				return{
					chat: prevState.chat.concat(display), 
					messages: tempMessages
				}
			})
			}
			else if(!hidden){
				let tempMessages = this.state.messages.concat(message)
				const display = <div> {username}: {message} <br /> </div>
				this.setState(prevState =>{
				return{
					chat: prevState.chat.concat(display), 
					messages: tempMessages
				}
			})
			}
			
			//const displayed = tempMessages.map(message => <div> {username}: {message} <br /> </div>)
			
			
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
		socket.on("word chosen", (choice) => {
			this.setState({word: choice})
			//console.log(this.state.word[0])
		})
		socket.on("word guessed", (username) => {
			var display = ""
			if(username === this.props.username){
				display = <div className="join"> You guessed the word! <br /> </div>
			}
			else{
				display = <div className="join"> {username} guessed the word! <br /> </div>
			}
			this.setState(prevState =>{
				return{
					chat: prevState.chat.concat(display), 
				}
			})
		})
	}

	componentDidUpdate(prevProps){
		if(this.props.currentPlayer !== prevProps.currentPlayer || !this.state.guessed){
			if(this.props.username === this.props.currentPlayer){
				this.setState({guessed: true})
			}
		}
	}

	handleChange(event){
		this.setState({guess: event.target.value})
	}

	handleSubmit(event){
		event.preventDefault()
		if(this.state.guess !== ""){
			if(this.state.guess === this.state.word && !this.state.guessed){
				console.log('word')
				//TODO: actually add points
				socket.emit("correct guess", this.props.username)
				this.setState(prevState =>{
					return{
						guess: "",
						guessed: true
					}
				})
			}
			else{
				let tempMessages = this.state.messages.concat(this.state.guess);
				socket.emit('send message', this.state.guess, this.props.username, this.state.guessed)
				this.setState(prevState =>{
					return{
						guess: "",
					}
				})
			}
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