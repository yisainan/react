import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link, hashHistory } from 'react-router'

import './style.less'

class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            kwd: ''
        }
    }
    render() {
        return (
            <div id="home-header" className="clear-fix">
                <div className="home-header-left float-left">
                    <Link to="/city">
                        <span>{this.props.cityName}</span>
                        &nbsp;
                        <i className="icon-angle-down"></i>
                    </Link>
                </div>
                <div className="home-header-right float-right">
                    <i className="icon-user"></i>
                </div>
                <div className="home-header-middle">
                    <div className="search-container">
                        <i className="icon-search"></i>
                        &nbsp;
                        <input 
                            type="text" 
                            placeholder="请输入关键字" 
                            onChange={this.ChangeHandle.bind(this)}
                            onKeyUp={this.KeyUpHandle.bind(this)}
                            value={this.state.kwd}/>
                    </div>
                </div>
            </div>
        )
    }
    ChangeHandle(e) {
        var val = e.target.value
        this.setState({
            kwd: val
        })
    }
    KeyUpHandle(e) {
        if (e.keyCode !== 13) {
            return
        }
        hashHistory.push('/search/all/' + encodeURIComponent(this.state.kwd))
    }
}

export default HomeHeader