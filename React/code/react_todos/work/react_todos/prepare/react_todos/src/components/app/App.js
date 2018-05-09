/**
 * 应用组件
 */
import React, {Component} from 'react'
import TodoHeader from '../TodoHeader'
import TodoMain from '../TodoMain'
import TodoFooter from '../TodoFooter'
import './app.scss'

class App extends Component {

  constructor() {
    super()
    this.state = {
      todos: [{isDone: false, title: '吃饭'}, {isDone: false, title: '睡觉'}],
      isAllChecked: false
    }
  }

  /**
   * 添加todo
   * @param todo
   */
  addTodo = (todo) => {
    const todos = this.state.todos
    todos.unshift(todo)
    this.setState({todos})
  }

  /**
   * 修改指定todo
   * @param index
   */
  deleteTodo = (index) => {
    const todos = this.state.todos
    todos.splice(index, 1)
    this.setState({
      todos,
      isAllChecked: this.getUnDoneTodos().length===0 && todos.length>0
    })
  }

  /**
   * 删除指定的todo
   * @param index
   * @param isDone
   */
  changeTodoState = (index, isDone) => {
    const todos = this.state.todos
    todos[index].isDone = isDone
    this.setState({
      todos,
      isAllChecked: this.getUnDoneTodos().length===0
    })
  }

  /**
   * 得到所有未完成的todo的数组
   * @returns {Array.<*>}
   */
  getUnDoneTodos = () => {
    return this.state.todos.filter(todo => !todo.isDone)
  }

  /**
   * 删除选中的todo
   */
  deleteDone = () => {
    const todos = this.getUnDoneTodos()
    this.setState({
      todos,
      isAllChecked: false
    })
  }

  /**
   * 改变所有todo的状态
   * @param isCheckAll
   */
  changeAllState = (isCheckAll) => {
    const todos = this.state.todos
    todos.map(todo => {todo.isDone = isCheckAll})
    this.setState({
      todos,
      isAllChecked: isCheckAll
    })
  }

  render() {
    //main组件的props
    const mainProps = {
      todos: this.state.todos,
      deleteTodo: this.deleteTodo,
      changeTodoState: this.changeTodoState
    }
    //footer组件的props
    const footerProps = {
      isAllChecked: this.state.isAllChecked,
      doneCount: this.state.todos.filter(todo => todo.isDone).length,
      totalCount: this.state.todos.length,
      deleteDone: this.deleteDone,
      changeAllState: this.changeAllState,
    }

    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <TodoHeader addTodo={this.addTodo} />
          <TodoMain {...mainProps} />
          <TodoFooter {...footerProps}/>
        </div>
      </div>
    )
  }
}

export default App