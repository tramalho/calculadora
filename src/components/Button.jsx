import React from "react";
import "./Button.css";

export default function Button(props) {
	let classes = "button ";
	classes += props.operation ? "operation" : "";
	classes += props.double ? "double" : "";
	classes += props.triple ? "triple" : "";

	return (
		<>
			<button
				className={classes}
				type="button"
				onClick={(_) => props.click?.(props.label)}
			>
				{props.label}
			</button>
		</>
	);
}
