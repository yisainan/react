import React from 'react';
export default class BodyIndex extends React.Component{

  componentWillMount(){
    //定义你的逻辑即可
    console.log("BodyIndex - componentWillMount");
  }

  componentDidMount(){
    console.log("BodyIndex - componentDidMount");
  }

  render(){
    var userName = '';
    var boolInput = false;

    var html = "IMOOC&nbsp;LESSON";

    //comments

    return (
      <div>
        <h2>页面的主体内容</h2>
        <p>{userName=='' ? '用户还没有登录' : '用户名：' + userName}</p>
        <p><input type='button' value = {userName} disabled={boolInput}/></p>
        {/*注释*/}
        <p>{html}</p> {/*需要进行 Unicode 的转码*/}
        <p dangerouslySetInnerHTML ={{__html : html}}></p>
      </div>
    )
  }
}
