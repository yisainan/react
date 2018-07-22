import React, {Component, PropTypes} from 'react'
import TodoItem from '../TodoItem'
import './main.scss'

/**
 * 主体部分组件
 */
class TodoMain extends Component {
  render() {
    return (

      <ul className="todo-main">
        {
          this.props.todos.map((todo,index) => {
            return <TodoItem key={index} todo={todo} index={index} {...this.props}/>
          })
        }
      </ul>
    )
  }
}
TodoMain.propTypes = {
  todos: PropTypes.array.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoState: PropTypes.func.isRequired
}

export default TodoMain