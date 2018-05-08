import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';

export default class Root extends React.Component{
  render(){
    return (
    <div>Init</div>
    );
  };
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
