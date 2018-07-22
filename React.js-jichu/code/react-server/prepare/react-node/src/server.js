import React from 'react';
import { renderToString } from 'react-dom/server';
var http = require('http');
import App from './App';

//创建服务器对象, 并启动监听
http.createServer(function (request, response) {
  //向浏览器端写头信息
  response.writeHead(200, {'Content-Type': 'text/html'});
  //渲染组件成标签结构字符串
  const appHTML = renderToString(<App />);
  //向浏览器返回结果
  response.end(appHTML);
}).listen(8888);
// 终端打印提示信息
console.log('Server running at http://127.0.0.1:8888/');
