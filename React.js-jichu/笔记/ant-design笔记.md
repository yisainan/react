# 使用开源的ant-design库开发项目指南

## 1. 最流行的开源React UI组件库
* material-ui(国外)
  * 官网: http://www.material-ui.com/#/
  * github: https://github.com/callemall/material-ui
* ant-design(国内蚂蚁金服)
  * 官网: https://ant.design/
  * github: https://github.com/ant-design/ant-design/

## 2. ant-design使用入门
* 使用create-react-app搭建react开发环境
  ```
  npm install create-react-app -g
  create-react-app antd-demo
  cd antd-demo
  npm start
  ```
* 搭建antd开发环境
  * 下载
    ```
    npm install antd --save
    ```
  * 编码: index.js
    ```
    import React from 'react';
    import ReactDOM from 'react-dom';
    import {DatePicker} from 'antd' //从antd中引入需要使用的组件
    import 'antd/dist/antd.css'; //引入antd的样式
    
    ReactDOM.render(<DatePicker/>, document.getElementById('root'));     
    ```
  * 编译运行测试
    ```
    npm start
    ```
* antd的深入使用
  * 下载react-router路由
    ```
    npm install react-router --save
    ```
  * 编码
    * index.js
      ```
      import React from 'react';
      import ReactDOM from 'react-dom';
      import {Router, Route, hashHistory, IndexRoute} from 'react-router';
      //引入各个路由模块组件
      import App from './components/app/App'
      import MyIntroduce from './components/myIntroduce/MyIntroduce';
      import MyTable from './components/myTable/MyTable';
      import MyForm from './components/myForm/MyForm';
      import MyProgress from './components/myProgress/MyProgress';
      import MyCarousel from './components/myCarousel/MyCarousel';
      //引入antd库的内置样式
      import 'antd/dist/antd.css';
      
      ReactDOM.render((
        <Router history={hashHistory}>
          <Route path='/' component={App}>
            <IndexRoute component={MyIntroduce}></IndexRoute>
            <Route path='/introduce' component={MyIntroduce}/>
            <Route path='/form' component={MyForm}/>
            <Route path='/table' component={MyTable}/>
            <Route path='/progress' component={MyProgress}/>
            <Route path='/carousel' component={MyCarousel}/>
          </Route>
        </Router>
      ), document.getElementById('root'));
      ```
    * App组件: app.css
      ```
      @charset "UTF-8";
      
      .app .leftMenu {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        background: #333;
        width: 200px;
        box-sizing: border-box;
      }
      
      .app .leftMenu .logo {
        display: block;
        margin: 20px auto;
        transition: all 1s;
      }
      
      .app .leftMenu .logo:hover {
        transform: rotate(360deg);
      }
      
      .app .rightWrap {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 20px 20px 0 20px;
        position: absolute;
        top: 0;
        left: 200px;
        right: 0;
        bottom: 0;
        overflow-y: auto;
      }
      
      .app .rightWrap .right-box {
        box-sizing: border-box;
        padding: 20px 20px 0;
        position: absolute;
        top: 73px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
      }
      
      .app .rightWrap .ant-menu-submenu {
        float: right;
      }
      ```
    * App组件: app.js
      ```
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
      ```    
    * 简单实现各个子路由组件
      * MyIntroduce: 默认路由组件
      * MyTable: 测试表格组件的组件
      * MyForm: 测试表单组件的组件
      * MyProgress: 测试进度条组件的组件
      * MyCarousel: 测试轮播组件的组件
    * 编译运行访问:
      ```
      npm start
      ```
  * MyIntroduce: 默认路由组件
    * introduce.css
      ```
      .ani-box {
        text-align: center;
        font-size: 20px;
      }
      ```
    * MyIntroduce.js
      ```
      import React from 'react'
      import './introduce.css'
      //应用介绍的简单组件
      export default function MyIntroduce() {
        return (
          <div className="ani-box">
            Designed as Ant Design，提炼和服务企业级中后台产品的交互语言和视觉风格。
          </div>
        )
      }
      ```
  * MyTable: 测试表格组件的组件(参照antd组件文档)
    ```
    import React from 'react'
    import {Table, Button} from 'antd';
    
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Age',
      dataIndex: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }];
    
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
    
    const MyTable = React.createClass({
      getInitialState() {
        return {
          selectedRowKeys: [],  // Check here to configure the default column
          loading: false,
        };
      },
      start() {
        this.setState({loading: true});
        // ajax request after empty completing
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }, 1000);
      },
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
      },
      render() {
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
          <div>
            <div style={{marginBottom: 16}}>
              <Button type="primary" onClick={this.start}
                      disabled={!hasSelected} loading={loading}>Reload</Button>
              <span style={{marginLeft: 8}}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
          </div>
        );
      },
    });
    export default MyTable
    ```
  * MyForm: 测试表单组件的组件(参照antd组件文档)
    ```
    import React from 'react';
    import { Form, Icon, Input, Button } from 'antd';
    const FormItem = Form.Item;
    
    let MyForm = React.createClass({
      handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },
      render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <Form inline onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input addonBefore={<Icon type="user" />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">Log in</Button>
            </FormItem>
          </Form>
        );
      }
    })
    MyForm = Form.create()(MyForm)
    
    export default MyForm;
    ```
  * MyProgress: 测试进度条组件的组件(参照antd组件文档)
    ```
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
    ```
  * MyCarousel: 测试轮播组件的组件(参照antd组件文档)
    * myCarousel.css
      ```
      .carousel-wrap {
        width: 350px;
        height: 220px;
        margin: 0 auto;
      }
      
      .carousel-wrap img {
        width: 350px;
        height: 220px;
      }
      ```
    * MyCarousel.js
      ```
      /**
       * 轮播图效果组件
       */
      import React from 'react';
      import { Carousel } from 'antd';
      import img01 from './img01.jpg'
      import img02 from './img02.jpg'
      import img03 from './img03.jpg'
      import img04 from './img04.jpg'
      import './myCarousel.css'
      
      class MyCarousel extends React.Component {
      
        render() {
          return (
            <div className="carousel-wrap">
              <Carousel autoplay>
                <div><img src={img01} /></div>
                <div><img src={img02} /></div>
                <div><img src={img03} /></div>
                <div><img src={img04} /></div>
              </Carousel>
            </div>
          )
        }
      }
      export default MyCarousel
      ```