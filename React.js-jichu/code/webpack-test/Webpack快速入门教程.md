* 了解Webpack相关
  * 什么是webpack
    * Webpack是一个模块打包器。
    * 在Webpack看来, 前端的所有资源文件(js/css/img/less/...)都会作为模块处理
    * 它将根据模块的依赖关系进行静态分析，生成对应的静态资源
  * 理解Loader
    * Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换
    * Loader 本身也是运行在 node.js 环境中的 JavaScript 模块
    * 它本身是一个函数，接受源文件作为参数，返回转换的结果
    * loader 一般以 xxx-loader 的方式命名，xxx 代表了这个 loader 要做的转换功能，比如 json-loader。
  * 配置文件
    * webpack.config.js : 是一个node模块，返回一个 json 格式的配置信息对象
  * 插件
    * 插件件可以完成更多loader不能完成的功能。
    * 插件的使用一般是在 webpack 的配置信息 plugins 选项中指定。
    * Webpack 本身内置了一些常用的插件，还可以通过 npm 安装第三方插件
* 学习文档 : 
  * webpack官方入门: http://webpack.github.io/docs/tutorials/getting-started/
  * Webpack中文指南: http://zhaoda.net/webpack-handbook/index.html
* 你将学到:
  * How to install webpack
  * How to use webpack
  * How to use loaders
  * How to use the development server
  * How to use image
* 初始化项目: package.json
  ```   
  {
    "name": "webpack_test",
    "version": "1.0.0"
  } 
  ```
* 安装webpack
  ```
  npm install webpack -g  //全局安装
  npm install webpack --save-dev  //局部安装
  ```
* 开始编译
  * 创建入口js : entry.js
    ```
    document.write("It works.");
    ```
  * 创建主页面 : index.html
    ```
    <script type="text/javascript" src="bundle.js"></script>
    ```
  * 编译js
    ```
    webpack entry.js bundle.js
    ```
  * 查看页面效果
* 第二个js
  * 创建第二个js: content.js
    ```
    module.exports = " <br> It works from content.js.";
    ```
  * 更新入口js : entry.js
    ```
    * document.write("It works.");
    + document.write(require("./content.js"));
    ```
  * 编译js:
    ```
    webpack entry.js bundle.js
    ```
  * 查看页面效果
* 第一个加载器(loader)
  * 安装样式的loader
    ```
    npm install css-loader style-loader --save-dev
    ```
  * 创建样式文件: test.css
    ```
    body {
      background: yellow;
    }
    ```
  * 更新入口js : entry.js
    ```
    + require("!style!css!./test.css");
    * document.write("It works.");
    * document.write(require("./content.js"));
    ```
  * 编译js, 并查看页面效果
    ```
    webpack entry.js bundle.js
    ```
* 绑定加载器
  * 更新入口js : entry.js
    ```
    - require("!style!css!./test.css");
    + require("./test.css");
    ```
  * 编译:
    ```
    webpack entry.js bundle.js --module-bind "css=style\!css"
    ```
  * 查看页面效果
* 使用webpack配置文件
  * 创建webpack.config.js
    ```
    module.exports = {
      entry: "./entry.js",
      output: {
          path: __dirname,
          filename: "bundle.js"
      },
      module: {
        loaders: [
          { test: /\.css$/, loader: "style!css"}
        ]
      }
    };
    ```
  * 编译
    ```
    webpack
    webpack --progress --colors   //编译显示进度带颜色
    ```
  * 自动编译
    ```
    webpack --watch  //编译并启动监视(但需要刷新浏览器)
    ```
  * 浏览器自动刷新
    ```
    npm install webpack-dev-server -g
    webpack-dev-server
    http://localhost:8080/webpack-dev-server/
    ```
* 加载图片
    * 安装依赖的loader
      ```
      npm install url-loader file-loader --save-dev
      ```
    * 添加config中loader的配置
      ```
      { test: /\.(png|jpg)$/, loader: "url-loader?limit=8192" }  //如果图片小于limit就会进行Base64编码
      ```
    * 拷入2张图片: 
      * 小图: img/logo.png
      * 大图: img/big.jpg
    * 定义引用图片的样式: test.css
      ```
      #div1{
        background-image: url(./img/logo.jpg);
        height: 200px;
        width: 200px;
      }
      #div2{
        background-image: url(./img/big.jpg);
        height: 200px;
        width: 200px;
      }
      ```
    * 在页面引用样式或图片: index.html
      ```
      <div id="div1"></div>
      <div id="div2"></div>
      ```
    * 编译并浏览
      ```
      webpack-dev-server
      ```