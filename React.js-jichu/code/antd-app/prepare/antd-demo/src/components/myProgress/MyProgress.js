import React from 'react';
import {Progress, Button} from 'antd';
const ButtonGroup = Button.Group;

const MyProgress = React.createClass({
  getInitialState() {
    return {
      percent: 0,
    };
  },
  increase() {
    let percent = this.state.percent + 10;
    if (percent > 100) {
      percent = 100;
    }
    this.setState({ percent });
  },
  decline() {
    let percent = this.state.percent - 10;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({ percent });
  },
  render() {
    return (
      <div>
        <Progress type="circle" percent={this.state.percent} />
        <ButtonGroup>
          <Button type="ghost" onClick={this.decline} icon="minus" />
          <Button type="ghost" onClick={this.increase} icon="plus" />
        </ButtonGroup>
      </div>
    );
  },
});

export default MyProgress;
