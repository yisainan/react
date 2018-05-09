import React, {Component} from 'react'
import {Link} from 'react-router'
import {Menu, Icon} from 'antd'
const SubMenu = Menu.SubMenu
import './app.css'
import logo from './logo.png'

export default class App extends Component {

  render() {
    return (
      <div className="app">
        <div className="leftMenu">
          <img src={logo} width='50' className="logo"/>
          <Menu theme="dark"
                style={{width:200}}
                mode='inline'>
            <Menu.Item>
              <Link to='/introduce'><Icon type="mail"/>我没有子菜单</Link>
            </Menu.Item>
            <SubMenu title={<span><Icon type="bars"/><span>主导航</span></span>}>
              <Menu.Item><Link to='/table'>表格</Link></Menu.Item>
              <Menu.Item><Link to='/form'>表单</Link></Menu.Item>
              <Menu.Item><Link to='/progress'>进度条</Link></Menu.Item>
              <Menu.Item><Link to='/carousel'>轮播</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </div>

        <div className="rightWrap">
          <Menu mode='horizontal'>
            <SubMenu title={<span><Icon type="user"/><span>xfzhang</span></span>}>
              <Menu.Item>退出</Menu.Item>
            </SubMenu>
          </Menu>
          <div className="right-box">{this.props.children}</div>
        </div>
      </div>
    )
  }
}