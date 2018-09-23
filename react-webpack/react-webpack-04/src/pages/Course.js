import React, { Component } from 'react'
import {
	Route,
	NavLink
} from 'react-router-dom'

import Header from '../components/Header'

class Course extends Component {
	render() {
		let { match } = this.props;
		return(
			<div className="list">
				<Header />
				<p>
					<NavLink to={`${match.url}/front-end`}>前端技术</NavLink>
				</p>
				<p>
					<NavLink to={`${match.url}/big-data`}>大数据</NavLink>
				</p>
				<p>
					<NavLink to={`${match.url}/algorithm`}>算法</NavLink>
				</p>

				<Route path={`${match.path}/:name`} render={(props) => <div>{props.match.params.name}</div>}/>
			</div>	
		) 
	}
}

export default Course 