/**
 * 底部组件
 */
import React, {Component, PropTypes} from 'react'
import './footer.scss'

class TodoFooter extends Component {

  static propTypes = {
    totalCount: PropTypes.number.isRequired,
    doneCount: PropTypes.number.isRequired,
    deleteDoneTodos: PropTypes.func.isRequired,
    isAllDone: PropTypes.bool.isRequired
  }

  //删除完成的todos
  deleteDoneTodos = () => {
    this.props.deleteDoneTodos()
  }

  //处理改变
  handleChange = () => {
    const {changeAllChecked, isAllDone} = this.props

    changeAllChecked(!isAllDone)
  }

  render() {

    const {doneCount, totalCount, isAllDone} = this.props
    const display = doneCount>0 ? 'block' : 'none'
    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" checked={isAllDone} onChange={this.handleChange}/>
        </label>
        <span>
          <span>已完成{doneCount}</span> / 全部{totalCount}
        </span>
        <button className="btn btn-danger" onClick={this.deleteDoneTodos} style={{display:display}}>清除已完成任务</button>
      </div>
    )
  }
}

export default TodoFooter
