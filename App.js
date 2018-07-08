import React, { Component } from 'react';
import ToDoList from './src/components/ToDoList/index';
import './src/assets/common.less'

class App extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<main>
				<ToDoList/>
			</main>
			)
	}
}

export default App;