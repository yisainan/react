import React from 'react';
import {Link} from 'react-router';
export default class ComponentHeader extends React.Component {
constructor(){
	super();
	this.state ={
		miniHeader: false //默认加载的时候还是高（不是 mini）的头部
	};
};

switchHeader(){
	this.setState({
		miniHeader: !this.state.miniHeader
	});
};

	render() {
		const styleComponentHeader = {
			header: {
				backgroundColor: "#333333",
				color: "#FFFFFF",
				"paddingTop": (this.state.miniHeader) ? "3px" : "15px",
				paddingBottom: (this.state.miniHeader) ? "3px" : "15px"
			},
			//还可以定义其他的样式
		};
		return (
			<header style={styleComponentHeader.header} class="smallFontSize">
				<h1>这里是头部</h1>
				<ul>
					<li><Link to={`/`}>首页</Link></li>
					<li><Link to={`/details`}>嵌套的详情页面</Link></li>
					<li><Link to={`/list`}>列表页面</Link></li>
				</ul>
			</header>
		)
	}
}
