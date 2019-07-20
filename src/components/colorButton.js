import React from "react"
import "./colorButton.css"


function ColorButton(props){
	return(
		<div className="button">
			<button onClick={() => props.handleClick(props.color)}>{props.color}</button> 
		</div>
	)
}

export default ColorButton