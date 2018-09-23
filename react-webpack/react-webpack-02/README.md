### 前言
webpack-dev-server配置热更新看起来很简单，但是实际上是有很多坑的，目前为止我没有搜到一篇深入讲解这个的，如果你觉得它很简单，那么或许等你看完这篇文章你会有不一样的看法。
由于HMR非常强大，本来这篇文章我是准备总结`webpack-dev-server`的，最后基本只总结了它的两个参数：`inline`和`hot`，其它的配置我会另外再写一篇文章讲解。
### 模块热替换(Hot Module Replacement)
HMR是webpack最令人兴奋的特性之一，当你对代码进行修改并保存后，webpack 将对代码重新打包，并将新的模块发送到浏览器端，浏览器通过新的模块替换老的模块，这样在不刷新浏览器的前提下就能够对应用进行更新。HMR是一个非常值得去深入研究的东西，它绝不是目前我们看到的大多数技术文章说的配置一个`hot`参数这么简单，有兴趣的小伙伴可以去看看它的实现原理，目前为止我也只看过一点点。

其实实现HMR的插件有很多，`webpack-dev-server`只是其中的一个，当然也是优秀的一个，它能很好的与webpack配合。另外，`webpack-dev-server`只是用于开发环境的。
### webpack-dev-server实现自动刷新
全局安装：`npm install webpack-dev-server --g` (全局安装以后才可以直接在命令行使用webpack-dev-server)

本地安装：`npm install webpack-dev-server --save-dev`
在webpack的配置文件里添加`webpack-dev-server`的配置：
```
module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
    },
}
```
`webpack-dev-server`为了加快打包进程是将打包后的文件放到内存中的，所以我们在项目中是看不到它打包以后生成的文件／文件夹的，但是，这不代表我们就不用配置路径了，配置过`webpack.config.js`的小伙伴都知道`output.path`这个参数是配置打包文件的保存路径的，`contentBase`就和`output.path`是一样的作用，如果不配置这个参数就会打包到项目的根路径下。有关这几个配置路径的参数我会再写一篇文章总结，这里就不展开了。
当然你也可以选择在命令行中启动的时候加这个参数：

`webpack-dev-server --content-base build/`

`webpack-dev-server`支持两种自动刷新方式：
> 1.  Iframe mode 
> 2.  Inline mode

使用iframe模式不需要配置任何东西，只需要在你启动的项目的端口号后面加上`/webpack-dev-server/`即可，比如：
[http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/)
![image.png](http://upload-images.jianshu.io/upload_images/5807862-6c27c825f4e706f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

打开调试器可以看到`webpack-dev-server`在页面中嵌入了一个<iframe>标签来实现热更新，具体原理我还没去研究，有兴趣的小伙伴可以自行搜索。此时试着更改`src/index.js`发现页面已经可以自动刷新了。

inline模式实在是个磨人的小妖精，[官方文档](http://webpack.github.io/docs/webpack-dev-server.html)有关Inline mode的使用说明比较少，而且还极容易误导人，再加上网上很多自己都没搞清楚`webpack-dev-server`的博主的文章，就更容易让人懵逼了。

**误导一：inline模式的HTML方式和Node.js方式都需要配置参数`inline`才能生效。**

文档把HTML方式和Node.js方式都称为inline模式，以至于很多人都误解了这两种用法，但是文档里有这么一句话：
> Inline mode with Node.js API
There is no inline: true flag in the webpack-dev-server configuration, because the webpack-dev-server module has no access to the webpack configuration. 

意思是使用Node.js方式是没有inline这个参数的，这里的inline模式其实就是三种配置方式，三选一就行。
- 在webpack.config.js里面配置
```
module.exports = {
  ...
  devServer: {
    inline: true,
  },
}
```
- 在HTML里面添加`<script src="http://localhost:8080/webpack-dev-server.js"></script>`
- 在node.js的配置文件里面配置(以下摘自官网，后面我会详解这个配置)
```
var config = require("./webpack.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {...});
server.listen(8080);
```
**误导二：需要在entry属性里添加`webpack-dev-server/client?http://«path»:«port»/`**

这个误解应该来自于别的博客，我搜了很多文章都在entry里加了这句话，如果是开启热更新还会加`webpack/hot/dev-server`。这一点[官网](http://webpack.github.io/docs/webpack-dev-server.html)解释的非常清楚，由于采用Node.js配置，webpack-dev-server模块无法读取webpack的配置，所以用户必须手动去webpack.config.js的entry指定webpack-dev-server客户端入口。意思是只有采用Node.js方式才会需要添加这句话，而且，我们并不需要去污染webpack.config.js文件，而是将这句代码写在Node.js 的配置文件里：
```
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
```
`config.entry`就是`webpack.config.js`的entry, entry是一个数组，这里要注意一下你自己的entry配置，如果是
```
entry: [
    path.resolve(__dirname, './src/index.js')
],
```
那你应该写成：
`config.entry.unshift("webpack-dev-server/client?http://localhost:8080/");`

**还懵逼吗？那我再多说两句**

以上这些乱七八糟的配置估计把你都看晕了吧，我再梳理一下有关inline模式的东西，HTML方式最简单，在`index.html`页面里添加一个<script>标签就行了，如果不想用Node.js配置，直接用`webpack-dev-server`，那么配置参数可以写在`webpack.config.js`的`devServer`里面，或者直接写在命令行里面，具体写法参考[https://webpack.js.org/configuration/dev-server/](https://webpack.js.org/configuration/dev-server/)，它会注明哪些参数是只能用于CLI（命令行）的。此时启动项目：
```
"scripts": {
    "start": "webpack-dev-server 你的启动参数可以写在这里也可以写在devServer里"
  },
```
如果使用Node.js方式，那么即使你配置了`devServer`也会被忽略，真正起作用的应该是Node.js的`server.js`文件，这个文件作为配置文件放在根目录下。
此时启动项目：
```
"scripts": {
    "start": "node server.js"
  },
```
### webpack-dev-server实现热更新(HMR)
> 注：以下配置都是针对inline模式，官方也只提了inline模式的配置方式。

热更新可以做到在不刷新浏览器的前提下刷新页面，热更新的好处是：
- 保持刷新前的应用状态(这一点在react里是做不到的，具体原因看下面)
- 不浪费时间在等待不必要更新的组件被更新上面
- 调整CSS样式的速度更快

采用非Node模式，添加`hot: true`，并且一定要指定`output.publicPath`，建议`devServer.publicPath`和`output.publicPath`一样。

`webpack.config.js`
```
const publicPath = '/';
const buildPath = 'build';

output: {
        path: path.resolve(__dirname, buildPath), //打包文件的输出路径
        filename: 'bundle.js', //打包文件名
        publicPath: publicPath, //重要！
    },
    devtool: 'inline-source-map',
    devServer: {
        publicPath: publicPath,
        contentBase: path.resolve(__dirname, buildPath),
        inline: true,
        hot: true,  
    },
```
这里有一个坑，官网说这样配置以后它会自动添加`HotModuleReplacementPlugin`插件到配置文件里，但是我却发现报错了：
![image.png](http://upload-images.jianshu.io/upload_images/5807862-c38978aa4e9c323b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
一开始我是手动在plugins里面添加`new webpack.HotModuleReplacementPlugin()`，（配置与使用Node方式一样），这样就可以正常启动起来了，后来我无意间看到了一篇博客，说的是除了在devServer里面写，还要在启动参数里面加`--hot`
```
    "start": "webpack-dev-server --hot --open"
```
这样webpack才能帮我们把`HotModuleReplacementPlugin`自动添加进来而不用我们再手动添加，`--open`也是一个比较好用的参数，可以帮我们自动打开浏览器窗口，这个参数如果写在devServer也是没用的。
我以前一直以为写在命令行里面和写在devServer是没差的，现在看来是我太年轻了啊Q。

采用Node模式分三步走：
- webpack的entry添加：`webpack/hot/dev-server`
- webpack的plugins添加`new webpack.HotModuleReplacementPlugin()`
- webpack-dev-server添加`hot: true`

这里我再说明一下，采用Node方式做不到自动将`webpack/hot/dev-server`添加到entry里面，这和前面的自动刷新是一样的。然后！！使用Node方式启动也不能在命令行里面添加启动参数了，所以我们需要手动添加`HotModuleReplacementPlugin`，还有,`--open`自然也没法用了，这时候要自动打开浏览器估计会麻烦一点，有兴趣的小伙伴可以去研究一下`create-react-app`是怎么配置这个的。

`server.js`
```
config.entry.unshift("webpack-dev-server/client?http://localhost:8080/", 'webpack/hot/dev-server');
let server = new WebpackDevServer(compiler, {
    contentBase: config.output.path,  
    publicPath: config.output.publicPath,
    hot: true
    ...
});
注：我不太清楚这里是否必须要配置publicPath，经测试不配置也是可以的。
```
`webpack.config.js`
```
plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
],
```
好的，选择一个你喜欢的方式启动起来吧，如果能在控制台看到以下的信息，代表热更新启动起来了：
```
[HMR] Waiting for update signal from WDS...
[WDS] Hot Module Replacement enabled.
```

最后根据[Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/)的指示再添加一个`NamedModulesPlugin `，它的作用大概是更容易分析依赖：
```
plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
```
### HMR真的开始发挥作用了吗？
你大概要生气了，我做了这么多事情就配置了hot和inline两个参数，现在你告诉我我的热更新还不可用？我不要面子的吗？
其实我也很烦，尽管官网看起来很简单，但我却花了很长时间来弄这个。我也以为我弄好了，直到我看到了这个：
![滚屏.gif](http://upload-images.jianshu.io/upload_images/5807862-ca56e84a31a01767.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我修改了`src/index.js`文件并保存，注意看右边调试器的变化，它打印了`[WDS] App updated.Recompiling`等信息，然后浏览器刷新，左边界面更新。
这，不是HMR的功劳。我们不配置HMR，只配置自动刷新就是这种效果。
再看一个真正的热更新：

![热更新.gif](http://upload-images.jianshu.io/upload_images/5807862-4e1b1319a728d2eb.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

注意看当我代码修改的时候，页面并没有刷新，并且左边日志能看到HMR开始工作打印的日志。
而出现这两种情况的原因是：前一个是修改的js，后一个是修改的css。

来自于devServer官方的解释是（找了半天也没找到）借助于`style-loader`CSS很容易实现HMR，而对于js，devServer会尝试做HMR，如果不行就触发整个页面刷新。你问我什么时候js更改才会只触发HMR，那你可以试着再加一个参数`hotOnly: true`试一试，这时候相当于禁用了自动刷新功能，然而devServer会告诉你这个文件不能被热更新哦。
![image.png](http://upload-images.jianshu.io/upload_images/5807862-442fd5ff8282c142.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果你觉得可以接受每次修改js都重刷页面，那么到这里就可以了。如果你还想继续追究下去，那么继续吧。
> 如果已经通过 [`HotModuleReplacementPlugin`](https://doc.webpack-china.org/plugins/hot-module-replacement-plugin) 启用了[模块热替换(Hot Module Replacement)](https://doc.webpack-china.org/concepts/hot-module-replacement)，则它的接口将被暴露在[`module.hot`属性](https://doc.webpack-china.org/api/module-variables#module-hot-webpack-specific-)下面。通常，用户先要检查这个接口是否可访问，然后再开始使用它。
——引自webpack官网

其实很简单，我们把整个项目的要被webpack编译的文件都设置为接受热更新，而最简单的方式就是在入口文件的地方添加：
`src/index.js`
```
if (module.hot) {
  module.hot.accept(() => {
    ReactDom.render(
        <App />,
        document.getElementById('root')
    )
  })
}

ReactDom.render(
    <App />,
    document.getElementById('root')
)
```
尝试修改js文件，可以看到控制台：
![image.png](http://upload-images.jianshu.io/upload_images/5807862-11fef8f780c0eabc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
很棒，它终于起作用了。

你以为的结局其实并不是结局。
OK，到这里我是不是该写点总结然后愉快的结束这篇文章了？嗯。。我只能说不能高兴的太早。
还有什么问题没有解决？让我们再看个经典的计时器栗子
```
constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
}
add() {
        this.setState((preState) => {
            return{
                count: preState.count + 1
            }
        })
    }

    sub() {
        this.setState((preState) => {
            return{
                count: preState.count - 1
            }
        })
    }

    render() {
        return(
            <div className="container">
                <h1>{this.state.count}</h1>
                <button onClick={() => this.add()}>count+1</button>
                <br/>
                <button onClick={() => this.sub()}>count-1</button>
                <h1>Hello, React</h1>
            </div>  
        ) 
    }
```
现在让我到页面里面执行几次加减，只要让`count`不停在初始值就好，然后修改js，看看热更新的效果：

![react热更新.gif](http://upload-images.jianshu.io/upload_images/5807862-674974c25801a384.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
它没有保存上一次的状态，而是回到了初始状态0。如果希望热更新还可以保留上一次的状态，我们需要另一个插件：[react-hot-loader](https://github.com/gaearon/react-hot-loader)
### 可以保存状态的热更新插件——react-hot-loader
`webpack-dev-server`的热更新对于保存react状态是无法做到的，所以才有了`react-hot-loader`这个东西，这个不是必须配置的插件，至少我没在`create-react-app`里面看到它。不过如果你想要更新时可以保存state，这是必须的。
让我们接着配置它吧，照着[github上的教程](https://github.com/gaearon/react-hot-loader)走就行。
1. 下载：`npm install --save react-hot-loader`
2.  接着，添加babel配置：
```
{
    test: /\.js$/,
    loader: 'babel-loader',
    query: {
        presets: ['env', 'react'],
        plugins: ["react-hot-loader/babel"] //增加
    }
}
```
3.  entry参数：
```
entry: [
    'react-hot-loader/patch', //添加
    path.resolve(__dirname, './src/index.js')
],
```
4. 修改index.js
```
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Home from './pages/Home';

if (module.hot) {
  module.hot.accept(() => {
    ReactDom.render(
        <AppContainer>
            <Home />
        </AppContainer>,
        document.getElementById('root')
    )
  })
}

ReactDom.render(
    <AppContainer>
        <Home />
    </AppContainer>,
    document.getElementById('root')
)
```
这里要注意一下，index.js里面不能直接render一个组件然后让它包裹在<AppContainer>里面，只能单独抽离组件，否则会报错。
现在可以见证奇迹啦：
![react热更新1.gif](http://upload-images.jianshu.io/upload_images/5807862-5ec0faf40df557f0.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 小结
这篇文章花了我一周多的时间，最后总算弄清楚了热更新到底是怎么回事，百度一搜全都是你只要配置一个`hot: true`就好啦，然后都没弄明白这到底是热更新还是自动刷新，可供参考的文档只有官网，官网又讲的太简单，所以折腾了特别久。看不懂的小伙伴可以给我留言，或者我哪里讲的不对的都可以提出来。
