/**
 * 上部的搜索模块
 */
import React, { Component, PropTypes } from 'react';

class Search extends Component {
  constructor (props) {
    super(props);
    // this.search = this.search.bind(this);
  }

  search = () => {
    var name = this.nameInput.value;
    this.props.refreshName(name);
  }

  render () {
    return (
      <div>
        <input type="text" placeholder="enter the name you search"
               ref={(input=>this.nameInput = input)}/>
        <button onClick={this.search}>Search</button>
      </div>
    );
  }
}
Search.propTypes = {
  refreshName: PropTypes.func.isRequired
};

export default Search;