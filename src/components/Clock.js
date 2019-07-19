import React from "react"
import {socket} from "./socket.js"

class Timer extends React.Component{
	constructor(){
		super()
		this.state = {
			time: 90
		}
		this.startTimer = this.startTimer.bind(this)
		socket.on("start timer", () => {
      		this.startTimer()
   		})
	}

	startTimer(){
		setInterval(() => this.setState(prevState => {
			return{
				time: prevState.time - 1
			}
		}), 1000)
	}

	render(){
		return(
			<div>
				{this.state.time}
			</div>
		)
	}
}

export default Timer 

/*setInterval(function(){
				this.setState(prevState => {
					return{
						time: prevState.time - 1
					}
			})
		})*/