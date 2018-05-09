/**
 * 头部组件
 */
import React, {Component, PropTypes} from 'react'
import './header.scss'

class TodoHeader extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }

  //处理enter键的keyup事件
  handleKeyUp = (e) => {
    //判断回车键
    if(e.keyCode===13) {
      //判断,限制一下
      let title = e.target.value.trim()
      if(title==='') {
        return
      }
      //根据输入的数据, 生成一个todo对象
      const todo = {
        title: title,
        isDone: false
      }
      //调用方法, 添加todo到todos
      this.props.addTodo(todo)
      //清理输入
      e.target.value = ''
    }
  }

  render() {
    return (
      <div className="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认" onKeyUp={this.handleKeyUp}/>
      </div>
    )
  }
}

export default TodoHeader
