/**
 * Created by xfzhang on 2016/11/27.
 * 应用主组件
 */
import React from 'react';
import Search from './Search';
import UserList from './UserList';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searchName: ''
    };
    this.refreshName = this.refreshName.bind(this);
  }

  refreshName (searchName) {
    this.setState({ searchName });
  }

  render () {
    return (
      <div className="container">
        <section className="jumbotron">
          <h3 className="jumbotron-heading">Search Github Users</h3>
          <Search refreshName={this.refreshName}/>
        </section>
        <UserList searchName={this.state.searchName}/>
      </div>
    );
  }
}
