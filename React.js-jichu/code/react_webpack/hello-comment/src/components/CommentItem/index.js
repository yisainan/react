/**
 * Created by xfzhang on 2016/11/27.
 * 评论列表项组件
 */
import './commentItem.css'
import React from 'react';

class CommentItem extends React.Component {
  constructor (props) {
    super(props);
    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment () {
    let username = this.props.comment.username;
    if (confirm(`确定删除${username}的评论吗?`)) {
      this.props.delete(this.props.index);
    }
  }

  render () {
    let comment = this.props.comment;
    return (
      <li className="list-group-item">
        <div className="handle">
          <a href="javascript:;" onClick={this.deleteComment}>删除</a>
        </div>
        <p className="user"><span >{comment.username}</span><span>说:</span></p>
        <p className="centence">{comment.content}</p>
      </li>
    );
  }
}
CommentItem.propTypes = {
  comment: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  delete: React.PropTypes.func.isRequired
};

export default CommentItem;
