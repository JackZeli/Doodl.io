import React from "react"
import "./Login.css"
import {socket} from "./socket"
class Login extends React.Component{

	constructor(){
		super()
		this.state = {
			name: "",
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		const name = event.target.value
		this.setState({name: name})
	}

	render(){
		return(
			<div className="login">
				<input onChange={this.handleChange} value={this.state.name}/>
				<button type="submit" onClick={() => this.props.setUser(this.state.name)}> Log In </button>
			</div>
		)
	}

}

export default Login;

