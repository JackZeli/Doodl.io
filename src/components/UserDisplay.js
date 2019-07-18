import React from "react"
import "./UserDisplay.css"
class UserDisplay extends React.Component{
	constructor(props){
		super(props)
		console.log(props.info.name)
	}

	render(){
		return(
			<div className="displayedUser">
				<div className="name"> {this.props.info.name} </div>
				<br />
				<div className="points"> Points: {this.props.info.points} </div>
			</div>
		)
	}
}

export default UserDisplay