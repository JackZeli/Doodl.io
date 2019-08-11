import React from "react"
import "./result.css"

class Result extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div className="result">
				{this.props.user.name}: {this.props.user.diff} points
			</div>
		)
	}
}

export default Result