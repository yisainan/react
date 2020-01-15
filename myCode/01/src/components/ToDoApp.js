import React from 'react';
import List from  './List.js'
import Input from './Input.js'
class ToDoApp extends React.Component {

  componentWillMount(){ // run before the render method
    this.setState({
      list: ['thing1', 'thing2', 'thing3'],
      newToDo: 'test'
    })
  };
  onInputChange = (event) => {
    this.setState({ newToDo: event.target.value}); // updates state to new value when user changes the input value
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
              <Input value={this.state.newToDo}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoApp;
