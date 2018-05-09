/**
 * Todo列表项组件
 */
import React, {Component, PropTypes} from 'react'
import './item.scss'

class TodoItem extends Component {

  /**
   * checkbox状态改变的监听回调函数
   */
  handleChange = () => {
    const {updateTodoChecked, todo} = this.props
    todo.isDone = !todo.isDone
    updateTodoChecked()
  }

  /**
   * 点击删除响应
   */
  deleteTodo = () => {
    const {deleteTodo, todo, index} = this.props
    if(confirm(`确定删除${todo.title}吗`)) {
      deleteTodo(index)
    }
  }

  /**
   * 处理鼠标移入
   */
  handleEnter = () => {

    this.refs.li.style.background = '#888'
    this.refs.button.style.display = 'block'
  }

  /**
   * 处理鼠标移出
   */
  handleLeave = () => {
    this.refs.li.style.background = '#fff'
    this.refs.button.style.display = 'none'
  }

  render() {
    const {title, isDone} = this.props.todo
    return (
      <li onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave} ref='li'>
        <label>
          <input type="checkbox" checked={isDone} onChange={this.handleChange}/>
          <span>{title}</span>
        </label>
        <button className="btn btn-danger" style={{display:'none'}} onClick={this.deleteTodo} ref='button'>删除</button>
      </li>
    )
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  updateTodoChecked: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}

export default TodoItem
