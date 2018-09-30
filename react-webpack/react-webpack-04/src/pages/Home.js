import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom'

import Header from '../components/Header'

import '../css/home.css'
import logo from '../images/react.png'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			count: 0,
		}
		this.add = this.add.bind(this)
	}

	fetchTest() {
		const protocol='https://';
		let domain = [`${protocol}www.trip.com/m/`];
		let cityID = [1, 2];
		for (let i = 0; i < domain.length; i++) {
			for (let j = 0; j < cityID.length; j++) {
				let postUrl = `${domain[i]}searchresult/hotel/poi/city=${cityID[j]}`;
				fetch(postUrl, {
					method: 'POST',
					mode: 'cors'
				}).then(response => response.json())
					.then(res => {
						console.log('res:', res)
					})
					.catch(err => {
						console.log('err:', err)
					})
			}
		}
	}

	add() {
		this.setState((preState) => {
			return{
				count: preState.count + 1
			}
		})
	}

	sub = () => {
		this.setState((preState) => {
			return{
				count: preState.count - 1
			}
		})
	}

	async asyncAdd () {
		await setTimeout(() => {
			this.setState((preState) => {
				return{
					count: preState.count + 1
				}
			})
		}, 1000)
	} 

	render() {
		return(
			<div className="home">
				<Header />
				<div>	
					<img className="logo" src={logo} alt="logo" />
				</div>	

				<h1>count的值：{this.state.count}</h1>
				<div className="flexContainer">
					<button onClick={() => this.asyncAdd()}>等待1s再执行count+1</button>

					<button onClick={this.add}>count+1</button>

					<button onClick={() => this.sub()}>count-1</button>
				</div>
			</div>	
		) 
	}
}



export default Home 
