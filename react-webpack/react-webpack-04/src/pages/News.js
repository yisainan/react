import React, { Component } from 'react'
import {
	Route,
	NavLink
} from 'react-router-dom'

import Header from '../components/Header'
import NewsDetail from './NewsDetail'

const data = [
	{
		id: 1,
		title: '春运地狱级抢票模式开启',
		content: '春运地狱级抢票模式开启，你抢到回家的票了吗？反正我还没有，难受'
	},
	{
		id: 2,
		title: '寒潮来袭，你，冻成狗了吗？',
		content: '寒潮来袭，你，冻成狗了吗？被子是我亲人，我不想离开它'
	}
]


class NewsPage extends Component {

	render() {
		return(
			<div className="news">
				<Header />
				<h1 className="title">请选择一条新闻：</h1>	
				{data.map((item) => (
					<div key={item.id}>
						<NavLink to={{
							pathname: `${this.props.match.url}/${item.id}`,
							state: {data: item}
						}}>
							{item.title}
						</NavLink>
					</div>
				))}
			</div>	
		) 
	}
}

const News = ({match}) => {
	return (
		<div>
			<Route path={`${match.path}/:id`} component={NewsDetail}/>
			<Route exact path={match.path} render={(props) => <NewsPage {...props} />}/>
		</div>
	)
}

export default News 
