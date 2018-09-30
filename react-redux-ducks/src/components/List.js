import React from 'react';

const List = (props) => {

  return (
    <div>
      <ul>
        {
          props.listItems.map((el, i)=>(
            <li
              key={i}>
              <div className="form-inline">
                <div className="form-group">
                  <span
                    style={
                      el.done
                      ? {textDecoration: 'line-through', fontSize: '20px'}
                      : {textDecoration: 'none', fontSize: '20px'}
                    }
                    onClick={() => props.onClick(i)}
                  >
                    {el.item}
                  </span>
                  <button
                    className="btn btn-danger pull-right"
                    onClick={props.deleteListItem.bind(null, i)}>
                    x
                  </button>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default List;