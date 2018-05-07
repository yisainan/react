import React from 'react';
import BodyChild from './bodychild';
export default class BodyIndex extends React.Component {
	constructor() {
		super(); //调用基类的所有的初始化方法
		this.state = {
			username: "Parry",
			age: 20
		}; //初始化赋值
	};
	changeUserInfo(age) {
		this.setState({age: age});
	};
	handleChildValueChange(event) {
		this.setState({age: event.target.value});
	};
	render() {
		// setTimeout(()=>{
		//   //更改 state 的时候
		//   this.setState({username: "IMOOC",age : 30});
		// },4000);
		return (
			<div>
				<h2>页面的主体内容</h2>
				<p>{this.props.userid} {this.props.username}</p>
				<p>age: {this.state.age}</p>
				<input type="button" value="提交" onClick={this.changeUserInfo.bind(this,99)}/>
				<BodyChild handleChildValueChange={this.handleChildValueChange.bind(this)}/>
			</div>
		)
	}
}
