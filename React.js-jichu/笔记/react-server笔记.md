# React服务器端渲染入门
* 理解
  * 当服务器端接收到请求时, 在服务器端基于React动态渲染页面, 并返回给浏览器显示
  * 相对于浏览器端渲染的好处?
    * 服务器端和客户端可以共享某些代码，避免重复定义。
    * 首次加载页面的速度加快
    * 便于SEO优化。服务器端渲染可以让搜索引擎更容易读取页面的meta信息以及其他SEO相关信息
  * 相对于浏览器端渲染的不好?
    * 对服务器的压力增大
    * 要求服务器使用基于node搭建
* 简单编码实现服务器端渲染
  * 应用文件结构
    ```
    react-node
      |-- src
          |-- App.js-----------------主组件js
          |-- server.js--------------启动服务器监听, 处理请求的js
      |-- index.js---------入口js
      |-- .babelrc---------babel配置文件
      |-- package.json-----应用包信息文件
    ```
  * 编码
    * package.json
      ```
      {
        "name": "react-node",
        "version": "1.0.0",
        "scripts": {
          "start": "node index"
        },
        "devDependencies": {
          "babel-preset-es2015": "^6.6.0",
          "babel-preset-react": "^6.5.0",
          "babel-register": "^6.8.0"
        },
        "dependencies": {
          "react": "^15.3.1",
          "react-dom": "^15.3.1"
        }
      }
      ```
    * .babelrc
      ```
      {
        "presets": ["react", "es2015"]
      }
      ```
    * App.js
      ```
      import React, {Component} from 'react'
      class App extends Component {
      
        render() {
          return (
            <div>测试React服务器</div>
          )
        }
      }
      export default App
      ```
    * server.js
      ```
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
      ```
    * index.js
      ```
      require('babel-register');
      require('./src/server.js');
      ```
  * 启动服务器运行:
    * 命令: npm start
    * 访问: http://127.0.0.1:8888