import React from 'react';

class Input extends React.Component {
  render() {
    return (
      <form>
        <div
          className="form-group">
          <label
            htmlFor="listInput">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="listItemInput"
            placeholder="Add new todo"
          />
          <button
            className="btn btn-primary">
            Add Item
          </button>
        </div>
      </form>
    );
  }
}

export default Input;