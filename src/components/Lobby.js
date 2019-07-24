import React from "react"
import {socket} from "./socket.js"
import "./Lobby.css"
import UserDisplay from "./UserDisplay"

class Lobby extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			
		}
		this.start = this.start.bind(this)

	}

	start(){
		socket.emit("begin game");
	}

	render(){
		const display = Object.keys(this.props.users).map(key => <div className="lobbyUser"> {this.props.users[key].name} <br /> </div>)
		return(
			<div>
				{display} <br />
				{Object.keys(this.props.users).length > 0 && <button onClick={this.start}> Start Game </button>}
				
			</div>
		)
	}
}

export default Lobby