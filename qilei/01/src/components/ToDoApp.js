import React from 'react';
import List from  './List.js'
import Input from './Input.js'
class ToDoApp extends React.Component {

  componentWillMount(){ // run before the render method
    this.setState({ // add an array of strings to state.
      list: ['thing1', 'thing2', 'thing3'],
       newToDo: 'test'
    })
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <div className="panel panel-default">
            <div className="panel-body">
              <h1>My To Do App</h1>
              <hr/>
              <List listItems={this.state.list} />
              <Input/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoApp;
