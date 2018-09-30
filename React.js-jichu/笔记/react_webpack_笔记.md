## 使用脚手架创建一个React应用
* react脚手架
  * react提供了一个专门用于创建react项目的脚手架库: create-react-app
  * 项目的整体技术架构为: react + webpack + es6 + eslint
* 创建项目并启动
  * npm install -g create-react-app
  * create-react-app hello-react
  * cd hello-react
  * npm start

## react组件化编码练习1: 实现一个评论管理功能
* 拆分组件:
  * 应用组件: App
  * 添加评论组件: CommentAdd
  * 评论项组件: CommentItem
  * 评论列表组件: CommentList
* 设计复杂数据的数据结构: 评论数组
  ```
  comments = [
    {id: time, name: 'Tom', content: '还不错!'},
    {id: time+1,name: 'Jack', content: '很不错!'}
  ]
  ```
* 确定组件的state和props:
  * App: 
    * state: comments/array
  * CommentAdd
    * state: username/string
    * props: addComment/function
  * commentList
    * props: comments/array   deleteComment/function
  * CommentItem
    * props: comment/object  deleteComment/function  index/number
* 编写静态组件
  * 显示静态数据
* 实现动态组件
  * 动态展示数据
  * 响应用户操作, 更新组件界面
  
## react组件化编码练习2: 实现github用户搜索功能
* 组件的生命周期方法: componentWillReceiveProps(nextProps)
  * 当通过属性关联了父组件的某个状态情况下
  * 如果父组件更新此状态, 此hook函数就会被回调, 且接收到最新的数据
  * 通过此函数实现子组件响应父组件的变化, 从而实现特定功能
* 使用axios发送ajax请求, 获取数据显示
  * 请求url: https://api.github.com/search/users?q=xxx
  * 下载: npm install axios --save
  * 使用:
    ```
    axios.get('https://api.github.com/search/users?q='+searchName)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
    ```

