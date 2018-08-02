// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import {DatePicker} from 'antd' //从antd中引入需要使用的组件
// import 'antd/dist/antd.css'; //引入antd的样式
//
// ReactDOM.render(<DatePicker/>, document.getElementById('root'));
// registerServiceWorker();

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
