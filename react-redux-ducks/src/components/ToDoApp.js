import React from 'react';
import List from './List';
import Input from './Input';

class ToDoApp extends React.Component {

  onInputChange = (event) => {
    this.props.inputChange(event.target.value);
  };

  onInputSubmit = (event) => {
    event.preventDefault();
    this.props.inputSubmit();
  };

  onListItemClick = (i) => {
    this.props.listItemClick(i)
  };

  deleteListItem = (i) => {
    this.props.deleteListItem(i)
  };

  render(){
    console.log(this.props)
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="panel panel-default">
            <div className="panel-body">
              <h1>My To Do App</h1>
              <hr/>
              <List
                onClick={this.onListItemClick}
                listItems={this.props.toDoApp.list}
                deleteListItem={this.deleteListItem}
              />
              <Input
                value={this.props.toDoApp.newToDo}
                onChange={this.onInputChange}
                onSubmit={this.onInputSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoApp;