import React from "react"
import {socket} from "./socket.js"

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
		return(
			<div>
				<button onClick={this.start}> Start Game </button>
			</div>
		)
	}
}

export default Lobby