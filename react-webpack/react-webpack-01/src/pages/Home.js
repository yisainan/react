import React, { Component } from 'react';
import '../css/style.css';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0
		}
	}

	componentDidMount() {
		
	}

	add() {
		this.setState((preState) => {
			return{
				count: preState.count + 1
			}
		})
	}

	sub() {
		this.setState((preState) => {
			return{
				count: preState.count - 1
			}
		})
	}

	render() {
		return(
			<div className="container">
				<h1>count的值：{this.state.count}</h1>
				<button onClick={() => this.add()}>count+1</button>

				<button onClick={() => this.sub()}>count-1</button>
			</div>	
		) 
	}
}