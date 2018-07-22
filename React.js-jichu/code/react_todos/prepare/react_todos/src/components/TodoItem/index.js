import React, {Component, PropTypes} from 'react'
/*
Todo功能组件
 */
class TodoItem extends Component {

  /**
   * 修改todo的选中状态
   */
  changeTodoState = () => {
    const {changeTodoState, index, todo} = this.props
    changeTodoState(index, !todo.isDone)
  }

  /**
   * 删除todo
   */
  deleteTodo = () => {
    const {deleteTodo, index, todo} = this.props
    if(confirm(`确定删除${todo.title}吗?`)) {
      deleteTodo(index)
    }
  }

  /**
   * 鼠标移入
   */
  handleEnter = () => {
    this.refs.li.background = '#aaa'
    this.refs.button.style.display = 'block'
  }

  /**
   * 鼠标移出
   */
  handleLeave = () => {
    this.refs.li.background = '#fff'
    this.refs.button.style.display = 'none'
  }

  render() {
    const {todo} = this.props
    return (
      <li onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave} ref='li'>
        <label>
          <input type="checkbox" checked={todo.isDone} onChange={this.changeTodoState}/>
          <span>{todo.title}</span>
        </label>
        <button className="btn btn-danger" style={{display: 'none'}}
          onClick={this.deleteTodo} ref='button'>删除</button>
      </li>
    )
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoState: PropTypes.func.isRequired
}

export default TodoItem