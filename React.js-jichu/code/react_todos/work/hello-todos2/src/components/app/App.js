/**
 * 应用组件
 */
import React, {Component} from 'react'
import PubSub from 'pubsub-js'
import TodoHeader from '../TodoHeader'
import TodoMain from '../TodoMain'
import TodoFooter from '../TodoFooter'
import './app.css'

class App extends Component {

  constructor(props) {
    super(props)
    //初始化state
    this.state = {
      todos: [{isDone: false, title: '吃饭2'}, {isDone: true, title: '睡觉2'}],
      isAllDone: false
    }
  }

  //内置的方法, 不要用箭头函数
  componentDidMount() {
    //订阅消息(删除todo)
    PubSub.subscribe('delete', (index) => {
      this.deleteTodo(index)
    })
  }

  /**
   * 添加todo
   * @param todo
   */
  addTodo = (todo) => {
    const todos = this.state.todos
    //添加
    todos.unshift(todo)
    //更新
    this.setState({
      todos,
      isAllDone: false
    })
  }

  /**
   * 得到所有未选中的todo组成的数组
   * @returns {Array.<*>}
   */
  getUndoneTodos = () => {
    return this.state.todos.filter(todo => !todo.isDone)
  }

  /*
  更新指定todo的isDone值
   */
  updateTodoChecked = () => {
    const todos = this.state.todos
    //有todo, 且没有选中的个数为0
    const isAllDone = this.getUndoneTodos().length===0&&todos.length>0
    this.setState({
      todos,
      isAllDone
    })
  }

  /**
   * 删除指定下标todo
   * @param index
   */
  deleteTodo = (index) => {
    const todos = this.state.todos
    //删除
    todos.splice(index, 1)
    //更新
    const isAllDone = this.getUndoneTodos().length===0&&todos.length>0
    this.setState({
      todos,
      isAllDone
    })
  }

  /**
   * 删除所有选中的todos
   */
  deleteDoneTodos = () => {

    //得到所有未完成的todo组成的数组
    const todos = this.getUndoneTodos();
    //更新状态
    this.setState({
      todos,
      isAllDone: false
    })
  }

  /**
   * 设置所有todos的选中状态
   * @param isAllDone
   */
  changeAllChecked = (isAllDone) => {
    //更新todos中所有的todo的状态
    const todos = this.state.todos
    todos.forEach(todo => {
      todo.isDone = isAllDone
    })
    this.setState({
      isAllDone,
      todos
    })
  }

  render() {
    //定义main标签的props
    const mainProps = {
      todos: this.state.todos,
      updateTodoChecked: this.updateTodoChecked,
      // deleteTodo: this.deleteTodo
    }
    //定义footer标签的props
    const footerProps = {
      totalCount: this.state.todos.length,
      doneCount: this.state.todos.filter(todo => todo.isDone).length,
      deleteDoneTodos: this.deleteDoneTodos,
      isAllDone: this.state.isAllDone,
      changeAllChecked: this.changeAllChecked
    }

    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <TodoHeader addTodo={this.addTodo}/>
          <TodoMain {...mainProps}/>
          <TodoFooter {...footerProps}/>
        </div>
      </div>
    )
  }
}

export default App
