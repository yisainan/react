// import React from 'react';
// export default class BodyIndex extends React.Component {
// 	constructor() {
// 		super(); //调用基类的所有的初始化方法
// 		this.state = {
// 			username: "Parry",
// 			age: 20
// 		}; //初始化赋值
// 	}
// 	render() {
// 		setTimeout(() => {
// 			//更改 state 的时候
// 			this.setState({username: "IMOOC", age: 30});
// 		}, 4000);
// 		return (
// 			<div>
// 				<h2>页面的主体内容</h2>
// 				<p>{this.state.username} {this.state.age}</p>
// 			</div>
// 		)
// 	}
// }

// 1
import React from 'react';
export default class BodyIndex extends React.Component{
	constructor() {
		super();
		this.state = {
			username:'qilei 四秒变 sainan'
		}
	}
	render () {
		setTimeout(() => {
			//更改 state 的时候
			this.setState({username: "sainan"});
		}, 4000);
		return (
			<div>
				<span>主体 name:</span><span>{this.state.username}</span>
			</div>
		)
	}
}
