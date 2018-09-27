### 前言
搭一个脚手架真不是一件容易的事，之前为了学习webpack是怎么配置的选择自己搭建开发环境，折腾了好几天总算对入口文件、打包输出、JSX, es6编译成es5、css加载、压缩代码等这些基础的东西有了一个大体的了解。后来有一次组内分享技术，我作死的选择了webpack，为了看起来高大上又去折腾它的按需加载、怎样处理第三方插件、拆分CSS文件、利用Happypack实现多进程打包等等。彻底把自己搞晕了。再后来接手了一个紧急的项目，实在来不及去折腾webpack了，就选择使用react官方推荐的脚手架[create-react-app](https://github.com/facebookincubator/create-react-app)，这个脚手架确实搭的非常完善，几乎不需要我们修改配置，我也研究了一下它的配置，准备从零开始搭建一个react+webpack的开发环境，配置从简单到复杂，由于内容较多，我将分为几篇文章讲述，这是第一篇。
另外，热更新我单独写成一篇文章了，当你修改一次代码就需要手动启动服务器，然后你烦了的时候，你可以先去把热更新配置好再回来继续：[开始一个React项目(二) 彻底弄懂webpack-dev-server的热更新](http://www.jianshu.com/p/bcad129a1c69)
### 初始化
先贴出项目结构
```
my-app/
  |
  ---  README.md
  --- package.json
  --- webpack.config.js
  --- public/
       |
       --- index.html（模板文件）
       --- favicon.ico（网站图标）
   --- src/（项目文件都在这里）
      |
       --- index.js（入口文件）
       --- pages/ （页面）
       --- components/（抽离的公用组件）
       --- css/
       --- js/
       --- images/
```
一开始最重要的需要你建好的文件是`public/index.html`和`src/index.js`。

新建一个项目，使用`npm init`初始化生成一个package.json文件。可以全部回车，后面反正是可以修改的。

安装webpack: `npm install webpack --save-dev`

全局安装： ```npm install webpack -g```(全局安装以后才可以直接在命令行使用webpack)

一个最简单的webpack.config.js文件可以只有entry(入口文件)和output(打包输出路径)
新建`webpack.config.js`
```
const path = require('path');

module.exports = {
    entry: './src/index.js', //相对路径
    output: {
        path: path.resolve(__dirname, 'build'), //打包文件的输出路径
        filename: 'bundle.js' //打包文件名
    }
}
```
新建入口文件 `src/index.js`
```
function hello() {
    console.log('hello world');
}
```
好了这就够了，我们已经可以运行这个项目了，打开命令窗口试一下：`webpack`

编译成功了，项目根目录下已经生成好build/bundle.js文件了，bundle.js文件前面的几十行代码其实就是webpack对怎么加载文件，怎么处理文件依赖做的一个声明。
我们可以将启动wepback的命令写到package.json中并添加一些有用的参数：

`package.json`
```
"scripts": {
    "start": "webpack --progress --watch --hot"
  },
```
`progress`是显示打包进程，`watch`是监听文件变化，`hot`是启动热加载，更多命令行参数详见：[webpack cli](https://webpack.js.org/api/cli/)
以后只需要执行`npm start`就可以了。
### 添加模板文件index.html
配置react项目最重要的两个文件是入口文件（这里是src/index.js）和html模板文件(这里是public/index.html)，入口文件是整个项目开始运行的地方，模板文件是构建DOM树的地方，相信有一部分小伙伴在网上看到的教程是直接在打包路径build里面建一个index.html，然后手动或者使用`html-webpack-plugin`将打包后的js引入，这样存在一个问题是build本身是打包路径，而这个路径的所有文件都不应该是我们手动去添加的，甚至包括这个文件夹也不是我们事先建好的。所以最好是按照`create-react-app`的方式，将这类不需要被webpack编译的文件放到public路径下。

```public/index.html```
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My App</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```
现在要让webpack知道这就是我们的html入口文件，并且我们不需要手动引入打包后的js文件，需要安装`html-webpack-plugin`:

`npm install html-webpack-plugin --save-dev`

`webpack.config.js`
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', //指定模板路径
            filename: 'index.html', //指定文件名
        })
    ]
}
```
> plugins是用于扩展webpack功能的，它帮助webpack构建项目，比如上面的`html-webpack-plugin`自动生成模板文件，以及后面用到的分离CSS等。

这里提示一下生成的HTML路径就是`output.path`指定的路径，不仅如此，像`extract-text-webpack-plugin`分离CSS文件打包的文件路径也是这个路径。
重新运行一下：`npm start`
现在可以看到build路径下已经生成好了一个index.html文件，并且这个文件已经引入了bundle.js文件了。
### 开始React项目
安装: `npm install react react-dom --save-dev`，现在来修改我们的入口文件
`src/index.js`
```
import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
    render() {
        return <h1> Hello, world! </h1>
    }
}

ReactDom.render(
    <App />,
    document.getElementById('root')
)
```
别着急运行，react里面的JSX语法普通浏览器可解析不了，需要安装babel来解析：
`npm install babel babel-cli babel-loader --save-dev`
再安装两个分别用于解析es6和jsx语法的插件：
`npm install babel-preset-env babel-preset-react --save-dev `
> 注：以前编译es6以上语法用的是`babel-preset-es2015`，现在是时候说再见了，`babel-preset-env`是一个更定制化的插件，你可以指定你要兼容的浏览器版本，这样babel会选择编译该版本不支持的语法而不是全部编译成旧的语法，具体配置参见：[babel-preset-env](https://github.com/babel/babel-preset-env)

`webpack.config.js`
```
module.exports = {
...
  module: {
        loaders: [ //配置加载器
            {
                test: /\.js$/, //配置要处理的文件格式，一般使用正则表达式匹配
                loader: 'babel-loader', //使用的加载器名称
                query: { //babel的配置参数，可以写在.babelrc文件里也可以写在这里
                    presets: ['env', 'react']
                }
            }
        ]
    }
}
```
> webpack最重要的配置都在modules（模块）里，loaders（加载器）是处理源文件的，后面你会看到，loader可以处理不同的js（jsx, es6等）编译成js，less等编译成css，将项目中引用的图片等静态资源路径处理成打包以后可以正确识别的路径等。

现在试着运行一下，没有报错的话，直接双击打开`build/index.html`就可以看到`hello world!`了。

### 加载和解析CSS样式
我们以前写CSS大致是两种方式，一写在html里，二写在CSS文件里。现在我们没有html只有JSX了，JSX通俗一点理解就是可以在js里面写html，所以我们如果要在jsx里面写css，就是在js里面写css，写过RN的小伙伴应该对这种写法比较熟悉。

```
//方式一：
const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px'
    },
    containerBtn: {
        margin: '0 20px',
        backgroundColor: '#dde18e'
    }
}
//使用：
<div style={styles.container}>
        <button style={styles.containerBtn}>count+1</button>
</div>  

//方式二：
<div style={{textAlign: 'center', marginTop: '50px'}}>
        
</div>  
```

而如果想在JSX文件里面像我们以前的用法一样去引入CSS文件，就只能使用import语句，但是import引入的都会被当做js处理，所以，我们需要对css文件做一个转换。这就需要`css-loader`和`style-loader`，其中`css-loader`用于将css转换成对象，而`style-loader`则将解析后的样式嵌入js代码。
安装：`npm install style-loader css-loader --save`

`webpack.config.js：`
```
loaders: [
            {
                test: /\.css/,
                loader: 'style-loader!css-loader'
            },
        ]
```
使用方式三：
```
//index.css
.container {
    text-align: center;
    margin-top: 40px;
}

//index.js
import '../css/index.css

<div className="container">
</div>
```
需要注意用`className`而不是`class`。


### 单独编译CSS文件（只在生产环境配置）
一般发布到线上以后，为了加载速度更快会把CSS和JS打包到不同的文件中，使用`extract-text-webpack-plugin`插件可以分离CSS。而其实，开发的时候是不需要单独编译CSS文件的。如果你在开发环境加了这个，又配置了热更新，那么你会发现CSS发生变化时热更新用不了了，所以建议开发环境就不要配置这个了。
`npm install extract-text-webpack-plugin --save`

`webpack.config.js`文件：
```
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    //...
    module: {
        loaders: [
            {
                test: /\.css/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        new ExtractTextWebpackPlugin("bundle.css")
    ],
};
```
### 使用PostCSS或者Less, Sass等CSS工具
Less或Sass想必大家都非常熟悉了，[PostCSS](https://github.com/postcss/postcss/blob/HEAD/README.cn.md)可能有的小伙伴没有用过，我也是在`create-react-app`的配置里第一次见到，然后就去搜了一下，发现它挺强大的。它不是什么预处理后处理语言，而是一个平台，这就像Node一直宣称的那样：我是平台！我是平台！我是平台！既然是个平台，那我们就可以在平台上做很多事情，比如说：检查CSS（像eslint检查js那样）、添加浏览器前缀（该平台目前最火的插件）、使用未来的CSS语法（大概就像现在的花呗？？）、函数式语法（类似Sass语法）等等。目前像阿里爸爸，维基百科等都在使用它。我觉得虽然官方介绍了很多插件，但我们用其中的几个就可以了。

之前写过Sass或Less的童鞋估计会问：既然它是个平台那我可以在它上面写Sass(Less)吗？答案是可以的，另外，它也有一个类似于Sass语法的插件，在它上面配置起来非常容易，所以，怎么选择看你咯。

安装：`npm install postcss-loader --save`
安装一些你需要的工具：`npm install autoprefixer precss postcss-flexbugs-fixes --save
`
> 注：[autoprefixer](https://github.com/postcss/autoprefixer)是自动添加浏览器前缀的插件，[precss](https://github.com/jonathantneal/precss)是类似Sass语法的css插件，[postcss-flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes)是修复了flex布局bug的插件，具体会有哪些bug你可以自行[查看](https://github.com/luisrudge/postcss-flexbugs-fixes)。

`webpack.config.js`文件：
```
{
    test: /\.css$/,
    use: [
        {
            loader: 'style-loader',
        },
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: () => [
                    require('autoprefixer'),
                    require('precss'),
                    require('postcss-flexbugs-fixes')
                ]
            }
            
        }
    ]
},
```
测一下配置生效了没有
`src/css/style.css`:
```
$mainColor: #8ce7b4;
$fontSize: 1rem;

@keyframes rotate {
    0%      {transform: rotate(0deg);left:0px;}
    100%    {transform: rotate(360deg);left:0px;}

}
button {
    background: $mainColor;
    font-size: calc(1.5 * $fontSize);
}
.container .logo {
    animation: rotate 10s linear 0s infinite;
}
```
![image.png](http://upload-images.jianshu.io/upload_images/5807862-0c89dbb69cc98d92.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
可以看到已经自动帮我们添加了前缀以及可以使用sass语法了,而且这是在css文件里直接写，不需要建其他后缀的文件。
如果你非要用less或者sass，也可以，但我还是会建议你保留postcss，毕竟它有很多有用的插件，只是去掉precss即可。安装：`npm less less-loader --save`
```
{
    test: /\.(css|less)$/, 
    use: [
           //...
        {
            loader: 'postcss-loader',
            options: {
                plugins: () => [
                    require('autoprefixer'),
                    require('postcss-flexbugs-fixes')
                ]
            }
        },
        {
            loader: 'less-loader',
        }
    ]
},
```
好了，现在你可以写less了。
### 加载图片资源
我们知道webpack打包会将所有模块打包成一个文件，而我们在开发项目时引入图片资源的时候是相对于当前文件的路径，打包以后这个路径是错误的路径，会导致引入图片失败，所以我们需要一个处理静态资源的加载器，url-loader和file-loader。我看到网上说url-loader是包含了file-loader的功能的，所以我们只需要下载url-loader就可以了，但是我下载完以后它却提示我url-loader依赖file-loader，并且运行项目会报错，所以我又下载了file-loader。url-loader有一个功能是对于指定大小以下的图片会转成base64，这样可以有效减少http请求。
安装：`npm install file-loader url-loader --save`

`webpack.config.js`
```
{
    test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: 'url-loader',
    options: {
      limit: 10000, //1w字节以下大小的图片会自动转成base64
    },
}
```
使用图片有两种情况，一在CSS里面设置背景，二在JSX里面设置背景或`<src>`，
CSS里面和以前的使用方式一样，假如你的目录结构长这样：
```
src
  |
  ---pages/
  --- css/
  --- images/
```
那么在CSS文件里引入背景图的路径就为：
```
.container {
    background: url('../images/typescript.jpeg') no-repeat center / contain;
}
```
在JSX里面引入图片有几种方式：(该页面在pages/下)
```
//方式一：
import tsIcon from '../images/typescript.jpeg';

//方式二：
const tsIcon = require('../images/typescript.jpeg');

//使用方式一：
<img src={tsIcon} alt="" />

//使用方式二：
<div style={{background: `url(${tsIcon}) no-repeat`}}></div>

//使用方式三：
const styles = {
    test: {
        background: `url(${tsIcon}) no-repeat center`
    }
}

render() {
  return (
    <div style={styles.test}></div>
  )
}
```
另外，你也可以测试一些小的icon，看看是不是转换成了很长的一串字符串。
### 配置ESLint
js的松散真的是体现在方方面面，现在除了有TypeScript这种一心想用C#风格帮助js走上人生巅峰的语言，也有ESLint这种控制规则从娃娃抓起的工具，ESLint的创始人可是js红皮书的作者，所以，赶紧用起来吧，这样你就完全不必和队友争论到底Tab键设置为4还是为2，加不加分号等一系列问题啦。
安装：`npm install eslint eslint-plugin-react eslint-loader --save`
> 注：可以全局安装eslint，这样你才可以直接在命令行使用`eslint xxx`，如果选择全局安装eslint那么你使用的任何插件或可分享的配置也都必须在全局安装。如果选择本地安装，命令行使用应该是`./node_modules/.bin/eslint xxx`
[eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)是检查react项目的插件，[eslint-loader](https://github.com/MoOx/eslint-loader)是webpack需要的加载器插件。

`webpack.config.js`
```
loaders: [
    {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
            presets: ['env', 'react'], //babel编译es6以上语法以及jsx语法
            plugins: ["react-hot-loader/babel"]
        }
    },
    {
        test: /\.js$/,
        enforce: 'pre', //加载器的执行顺序，不设置为正常执行，pre（前）|post（后），eslint是检查代码规范，应该在编译前就执行
        loader: 'eslint-loader',
    },
]         
```
接下来需要配置ESLint规则，为了满足大家“稀奇古怪”的代码风格，ESLint遵循各种规则自定义的原则，所以，前面我说有了它就可以避免因代码风格不同而与队友发生争执的问题是不准确的，因为，我们还是要制定规则啊。对于我等小菜鸟来说，遵守别人的规则会比自己制定好一些，因为，怕你对自己太好了。
我们先来看看如何配置吧，采用命令行来初始化：`eslint --init`，如果是本地安装的话：`./node_modules/.bin/eslint --init`
遇到的第一个问题：你喜欢怎么配置你的ESLint呢？
![image.png](http://upload-images.jianshu.io/upload_images/5807862-8bfac00868bdf488.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1. 根据你喜欢的方式来制定规则，你需要回答一些问题。
2. 使用当下流行的代码规则。
3. 根据你的js文件生成一些规则。

使用当下流行的代码规则就是用大公司制定的一套规则啦，这里只有三个选项：
![image.png](http://upload-images.jianshu.io/upload_images/5807862-9f0723d820f550e7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果你都不喜欢，没关系，[这里](https://www.npmjs.com/search?q=eslint-config)有很多款式供你选择，比如[eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app)就是`create-react-app`的代码规则。据说目前最常用的是Airbnb，它也被称为史上最严规则，选择这个回车，接着回答问题：是否使用React，希望生成的eslint文件格式是什么，我选择的是javascript，Airbnb需要安装一些插件，耐心等待就好。
好了，运行一下代码，没有意外的话你的代码肯定有很多报错，反正我一共就两js文件，加起来七十多行代码，报了九十多个错，哈哈哈哈，让我先冷静冷静换个姿势，选择自定义规则，别误会，我是打算另外写一篇文章专门来解决我那九十多行的报错的，写在这里篇幅有点太长了。

现在选择第一种方式，自定义代码规则，ESLint附带了一些默认规则帮你起步，具体查看[默认规则列表](http://eslint.cn/docs/rules/)，打勾的表示已经启用的规则，然后另外还需要你回答一些问题：
![image.png](http://upload-images.jianshu.io/upload_images/5807862-f1efedc4b29b6b52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这里有几个要注意的选项：

**注意事项一：indentation(缩进)是用tab还是空格**
意思不是你缩进的时候是按空格键缩进还是tab键缩进，或者说很多时候缩进是编辑器做的事情，我们要做的是告诉编辑器是用哪种方式，而怎么看的出来用的是什么呢？以sublime编辑器为例，当你选中代码的时候，缩进的样式就出来了：
![image.png](http://upload-images.jianshu.io/upload_images/5807862-2b3f7103b8267436.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
其中，..是空格，—是tab，如何修改文件的缩进风格呢？sublime编辑器是选择View--> Indentation，首先，你可以选择tab的宽度是多少，一般是2，4，然后，如果你想修改当前已有的文件缩进风格，选择 Convert Indentation to Tabs或者 Convert Indentation to Spaces，这样，整个文件的缩进风格就统一了，并且，以后你新建的文件也会按照这个风格，但是！你已有的文件风格不会变，你需要手动去每个文件下修改。所以，配置这种检查工具肯定是越早越好，等你写了一大半了再跑回来配置看到几千个错误都是很正常的，而这时候，估计你会选择放弃。

**注意事项二：line endings 选择**
了解Windows和Unix系统的童鞋都知道，这俩系统的行尾结束符不一样，Unix的行尾是两个字符："\r\n"，Windows的行尾是一个字符："\n"，而如果假如你在mac里写代码这里却选择了Windows，你就会看见`Expected linebreaks to be 'CRLF' but found 'LF'`,同理反过来也一样，所以不要选错了。

**注意事项三：semicolons(分号)的选择**
分号在js里面实在是个很随意的东西，有的人喜欢打，有的人不喜欢打，有的人喜欢打一部分，但是这个选择却引起了很多争议，有人认为，虽然js有自动分号插入 (ASI)的功能，但总是依赖js去帮我们打分号是不可靠的，首先，js也会累是吧，其次，有些地方js也不知道该打在哪里，然后它就会乱打，然后你懂的，你就会被喷。有人认为，不打分号可以节省编译时间，而且，看起来很棒。然后就有一群和事佬跳出来说：我可以在可能会引起js困惑的地方打分号，在js可以自动引入分号的地方省略，嗯，应该说我们大部分人都属于这一类人。
在react里面，如果选择了始终使用分号就会有一些比较困惑的地方，比如：
```
add() {
        this.setState((preState) => {
            return{
                count: preState.count + 1
            }
        })
    }
render() {
  return (
    <div>hello </div>  
  )
}
```
那么，ESLint会报return{}后缺少分号，this.setState({})后缺少分号，甚至render里的return()后也缺少分号，而这应该是大部分人都不会选择加分号的地方，所以，始终使用分号这个选项在react项目里恐怕不是那么适用。不过，你是自由的，你的代码风格由你决定。

现在你应该有能力解决`Missing semicolon (或Extra semicolon )`，`Expected indentation of 1 tab but found 4 spaces`，`Mixed spaces and tabs`等这种问题了。
但是ESLint依然对react非常不友好啊，比如：`'React' is defined but never used`，或者是引入其他组件也会报这个警告，当然，引入了又没有用或者根本没有引入某个组件，报了警告是非常正常的，但是我们明明用到了引入的东西它还是报警告这就说不过去了，修改.eslintrc.js文件：
```
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended" //增加
    ],
```
这绝对是最万能的解决办法！！相信大家以前用过这种写法：
```
"rules": {
        //...
        "react/jsx-uses-react": 1,
    }
```
但这个只能解决` 'React' is defined but never used`这个错误，如果是引入其他组件比如`import Home from './pages/Home'`依然会报` 'Home' is defined but never used`,而这时候你还需要添加一句：` "no-unused-vars": 1`才可以，所以用第一种方法是最好的。
### 写在最后
我把该项目放在[github](https://github.com/dengshasha/react-webpack)上了。虽然这是webpack配置的第一篇，但是为了开发方便，我把webpack-dev-server的热更新配置也放进来了，如果你对热更新有疑问可以阅读[开始一个React项目(二) 彻底弄懂webpack-dev-server的热更新](http://www.jianshu.com/p/bcad129a1c69)。