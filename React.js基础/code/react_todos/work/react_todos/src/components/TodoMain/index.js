/**
 * 主体列表组件
 */
import React, {Component, PropTypes} from 'react'
import TodoItem from '../TodoItem'
import './main.scss'

class TodoMain extends Component {
  render() {

    const todos = this.props.todos
    return (
      <ul className="todo-main">
        {
          todos.map((todo, index) => {
            return (
              <TodoItem key={index} todo={todo} index={index} {...this.props}/>
            )
          })
        }
      </ul>
    )
  }
}

TodoMain.propTypes = {
  todos: PropTypes.array.isRequired
}

export default TodoMain
