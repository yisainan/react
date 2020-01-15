import React from 'react';

const List = (props) => { // 函数型组件没有生命周期方法和state属性，它仅仅是一个返回jsx的函数，并且参数是props

  const list = props.listItems.map((el, i)=>(
    <li key={i}><h2>el</h2></li>
  ));

  return (
    <div>
      <ul>
        {
          list
        }
      </ul>
    </div>
  )
};

export default List;
