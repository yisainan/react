按着笔记 写demo

1.npm install create-react-app -g
2.npm install antd --save

如下是 测试调用antd的日期组件
import React from 'react';
import ReactDOM from 'react-dom';
import {DatePicker} from 'antd' //从antd中引入需要使用的组件
import 'antd/dist/antd.css'; //引入antd的样式

ReactDOM.render(<DatePicker/>, document.getElementById('root'));
registerServiceWorker();
