import React from "react"


function ColorButton(props){
	return(
		<div>
			<button onClick={() => props.handleClick(props.color)}>{props.color}</button> 
		</div>
	)
}

export default ColorButton