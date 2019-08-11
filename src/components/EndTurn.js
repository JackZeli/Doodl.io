import React from "react"
import "./EndTurn.css"
import Result from "./result"
import {socket} from "./socket.js"

class EndTurn extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			users: this.props.users
		}
	}

	componentDidUpdate(prevProps){
	    if(this.props.users !== prevProps.users){
	      this.setState({users: this.props.users})
	    }
  	}

	render(){
		const display = Object.keys(this.state.users).map(key => <Result user={this.state.users[key]}/>)
		return(
			<div className="endTurn">
				{display}
			</div>
		)
	}
}

export default EndTurn