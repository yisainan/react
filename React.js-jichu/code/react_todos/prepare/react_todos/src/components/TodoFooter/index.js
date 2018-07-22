import React, {Component, PropTypes} from 'react'
import './footer.scss'

/**
 * 底部组件
 */
class TodoFooter extends Component {

  static propTypes = {
    isAllChecked: PropTypes.bool.isRequired,
    doneCount: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    deleteDone: PropTypes.func.isRequired,
    changeAllState: PropTypes.func.isRequired,
  }

  /**
   * 改变全选的状态
   * @param event
   */
  handleAllChange = (event) => {
    this.props.changeAllState(event.target.checked)
  }

  /**
   * 删除选中的todo
   */
  deleteDone = () => {
    this.props.deleteDone()
  }

  render() {
    const {isAllChecked, doneCount, totalCount} = this.props

    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" checked={isAllChecked} onChange={this.handleAllChange}/>
        </label>
        <span>
          <span>已完成{doneCount}</span> / 全部{totalCount}
        </span>
        <button className="btn btn-danger" onClick={this.deleteDone}>清除已完成任务</button>
      </div>
    )
  }
}

export default TodoFooter