## 使用脚手架创建一个React应用
* react脚手架
  * react提供了一个专门用于创建react项目的脚手架库: create-react-app
  * 项目的整体技术架构为: react + webpack + es6 + eslint
* 创建项目并启动
  * npm install -g create-react-app
  * create-react-app hello-react`
  * cd hello-react
  * npm start
* 说明:
  

## react组件化编码练习1: 实现一个评论管理功能
* 拆分组件:
  * 应用组件: App
  * 添加评论组件: CommentAdd
  * 评论项组件: CommentItem
  * 评论列表组件: CommentList
* 确定组件的state和props:
  * App: 
    * state: comments/array
  * CommentAdd
    * state: username/string, content/string
  * CommentItem
    * props: comment/object
  * commentList
    * props: comments/array
* 编写静态组件

* 实现动态组件
  * 动态展示数据
  * 响应用户操作, 更新组件界面

## react组件化编码练习2: 实现github用户搜索功能

