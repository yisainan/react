import React, { Component } from 'react'
import {
	Route,
	Redirect
} from 'react-router-dom'

import Header from '../components/Header'



class NewsDetail extends Component {
	constructor(props) {
		super(props)
		this.data = props.location.state ? props.location.state.data : null ;
	}

	render() {
		if (this.data != null) {
			let title = this.data.title || '';
			let content = this.data.content || '';
			return(
				<div className="news">
					<Header />
					<h1>{title}</h1>
					<p>{content}</p>
				</div>	
			)
		}
		return (
			<Route path="*" render={(props) => <Redirect to='/error'/>}/>
		)
	}
}

export default NewsDetail 
