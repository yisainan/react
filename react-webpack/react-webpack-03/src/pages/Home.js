import React, { Component } from 'react'
import '../css/home.less'
import logo from '../images/react.png'


class Home extends Component {
	constructor(props) {
		super(props)
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
				<div>	
					<img className="logo" src={logo} alt="logo" />
				</div>	

				<h1>count的值：{this.state.count}</h1>
				<div className="flexContainer">
					<button onClick={() => this.add()}>count+1</button>

					<button onClick={() => this.sub()}>count-1</button>
				</div>
			</div>	
		) 
	}
}

export default Home 
