import React from "react"
import "./UserList.css"
import UserDisplay from "./UserDisplay"

class UserList extends React.Component{
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
	    console.log(this.state.users)
  	}

	render(){
		const display = Object.keys(this.state.users).map(key => <UserDisplay info={this.state.users[key]} />)
		return(
			<div className="userlist">
				{display}
			</div>
		)
	}
}

export default UserList