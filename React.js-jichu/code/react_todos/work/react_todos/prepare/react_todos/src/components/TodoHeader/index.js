import React, {Component, PropTypes} from 'react'
import './header.scss'

/*
头部组件
 */
class TodoHeader extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }

  //监听enter的keyup事件响应
  handleKeyUp = (event) => {
    if(event.keyCode===13) {
      //如果输入不合法, 不添加
      const inputTodo = event.target.value.trim()
      if(inputTodo==='') {
        return
      }
      // 得到输入的数据, 生成一个todo对象
      const todo = {
        title: event.target.value,
        isDone: false
      }
      console.log(todo)
      //保存todo
      this.props.addTodo(todo)
      //清除输入
      event.target.value = ''
    }
  }

  render() {
    return (
      <div className="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认"
          onKeyUp={this.handleKeyUp}/>
      </div>
    )
  }
}

export default TodoHeader