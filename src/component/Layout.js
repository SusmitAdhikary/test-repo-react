import React, { Component } from 'react';


export default class Layout extends Component {
	constructor(){
		super();
		this.name = "Susmit";
	}
	render(){
		return (
			<div>
			<input
			type="text"
			ref="textInput" /><br/><br/>
			<input
			type="text"
			/><br/><br/>
			<input
			type="button"
			value="Focus the text input"
			/>
			</div>
	);
	}
}