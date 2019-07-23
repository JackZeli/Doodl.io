import React from "react"
import {socket} from "./socket.js"
import "./Clock.css"

class Timer extends React.Component{
	constructor(){
		super()
		this.state = {
			time: 90,
			guessed: false
		}
		this.startTimer = this.startTimer.bind(this)
		socket.on("set timer", (time) => {
      		this.setState({time:time})
   		})
   		/*socket.on("word guessed", () => {
   			if(!this.state.guessed){
   				this.setState({guessed:true, time:30})
   			}
   		})*/
	}

	startTimer(time){
		this.setState({time:time})
		if(!this.state.isSet){
			var myInterval = setInterval(() => this.setState(prevState => {
				if(this.state.time == 1){
					clearInterval(myInterval)
					socket.emit("turn over")
				}
				return{
					time: prevState.time - 1,
					isSet: true
				}
			}), 1000)
		}
	}

	render(){
		return(
			<div className="clock">
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