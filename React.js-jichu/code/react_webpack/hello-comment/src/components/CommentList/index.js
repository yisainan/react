/**
 * Created by xfzhang on 2016/11/27.
 * 评论列表组件
 */
import './commentList.css'
import React from 'react';
import CommentItem from '../CommentItem';


class CommentList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let comments = this.props.comments;
    let display = comments.length > 0 ? 'none' : 'block';
    return (
      <div className="col-md-8">
        <h3 className="reply">评论回复：</h3>
        <h2 style={{ display: display }}>暂无评论，点击左侧添加评论！！！</h2>
        <ul className="list-group">
          {
            comments.map((comment, index) => {
              console.log(comment);
              return <CommentItem comment={comment} key={index} index={index} delete={this.props.delete}/>
            })
          }
        </ul>
      </div>
    );
  }
}
CommentList.propTypes = {
  comments: React.PropTypes.array.isRequired,
  delete: React.PropTypes.func.isRequired
};

export default CommentList;