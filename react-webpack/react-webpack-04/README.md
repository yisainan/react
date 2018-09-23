
### 前言
在[开始一个React项目（三）路由基础（v4）](https://www.jianshu.com/p/875225b2ec90)中我大概总结了一下web应用的路由，这一篇我会接着上一篇分享一些例子。
### 简单的路由示例
一个最简单的网站结构是首页和几个独立的二级页面，假如我们有三个独立的二级页面分别为：新闻页、课程页、加入我们，路由配置如下：
`index.js`:
```
import React from 'react'
import ReactDom from 'react-dom'

import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Switch
} from 'react-router-dom'

import Home from './pages/Home'
import News from './pages/News'
import Course from './pages/Course'
import JoinUs from './pages/JoinUs'

const App = () => (
    <Router>
        <div>
            <header>
                <nav>
                    <ul>
                        <li><NavLink exact to="/">首页</NavLink></li>
                        <li><NavLink to="/news">新闻</NavLink></li>
                        <li><NavLink to='/course'>课程</NavLink></li>
                        <li><NavLink to="/joinUs">加入我们</NavLink></li>
                    </ul>
                </nav>
            </header>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/news" component={News}/>
              <Route path="/course" component={Course}/>
              <Route path="/joinUs" render={(props) => <JoinUs {...props}/>}/>
            </Switch>
        </div>
    </Router>
)

ReactDom.render(
    <App />,
    document.getElementById('root')
)
```

一个简单的路由，我们可以将`<NavLink>`和`<Route>`都写在`index.js`里面，但这会让每一个页面都渲染出导航栏。
### 抽离导航的路由
假如现在新增了登录页，要求登录页没有导航栏，其它页面有导航栏。
`index.js`
```
const App = () => (
    <Router>
        <div>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={Login}/>
              <Route path="/news" component={News}/>
              <Route path="/course" component={Course}/>
              <Route path="/joinUs" render={(props) => <JoinUs {...props}/>}/>
            </Switch>
        </div>
    </Router>
)

ReactDom.render(
    <App />,
    document.getElementById('root')
)
```
`components/Header.js`
```
import {
    NavLink
} from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <li><NavLink exact to="/">首页</NavLink></li>
                        <li><NavLink to="/news">新闻</NavLink></li>
                        <li><NavLink to='/course'>课程</NavLink></li>
                        <li><NavLink to="/joinUs">加入我们</NavLink></li>
                    </ul>
                </nav>
            </header>
        )
    }
}
```
每个页面根据需要选择是否引入`<Header>`组件
### 添加404页面
利用`<Switch>`组件的特性，当前面所有的路由都匹配不上时，会匹配最后一个`path="*"`的路由，该路由再重定向到404页面。
`index.js`
```
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/news" component={News}/>
            <Route path="/course" component={Course}/>
            <Route path="/joinUs" render={(props) => <JoinUs {...props}/>}/>
            <Route path="/error" render={(props) => <div><h1>404 Not Found!</h1></div>}/>
            <Route path="*" render={(props) => <Redirect to='/error'/>}/>
        </Switch>
    </Router>
)
```
### 嵌套路由
假如课程页下有三个按钮分别为：前端开发、大数据、算法。
前面我提到过`match`是实现嵌套路由的对象，当我们在某个页面跳转到它的下一级子页面时，我们不会显示地写出当前页面的路由，而是用`match`对象的`path`和`url`属性。
`pages/Course.js`
```
class Course extends Component {
    render() {
        let { match } = this.props;
        return(
            <div className="list">
                <Header />
                <NavLink to={`${match.url}/front-end`}>前端技术</NavLink>
                <NavLink to={`${match.url}/big-data`}>大数据</NavLink>
                <NavLink to={`${match.url}/algorithm`}>算法</NavLink>

                <Route path={`${match.path}/:name`} render={(props) => <div>{props.match.params.name}</div>}/>
            </div>  
        ) 
    }
}
```
> match对象的params对象可以获取到/:name的name值
### 带参的嵌套路由
假如新闻页是一个新闻列表，点击某一条新闻时展示该条新闻详情。与上一个示例不同的是，新闻列表页需要将该条新闻的内容传递给新闻详情页，传递参数可以有三种方式：
- search: '', //会添加到url里面，形如"?name=melody&age=20"
- hash: '', //会添加到url里面，形如"#tab1"
- state: {},//不会添加到url里面

`pages/News.js`
```
import React, { Component } from 'react'
import {
    Route,
    NavLink
} from 'react-router-dom'

import Header from '../components/Header'
//模拟数据
const data = [
    {
        id: 1,
        title: '春运地狱级抢票模式开启',
        content: '春运地狱级抢票模式开启，你抢到回家的票了吗？反正我还没有，难受'
    },
    {
        id: 2,
        title: '寒潮来袭，你，冻成狗了吗？',
        content: '寒潮来袭，你，冻成狗了吗？被子是我亲人，我不想离开它'
    }
]

class News extends Component {
    render() {
        return(
            <div className="news">
                <Header />
                <h1 className="title">请选择一条新闻：</h1> 
                {data.map((item) => (
                    <div key={item.id}>
                        <NavLink to={{
                            pathname: `${this.props.match.url}/${item.id}`,
                            state: {data: item}
                        }}>
                            {item.title}
                        </NavLink>
                    </div>
                    
                ))}
                <Route path={`${this.props.match.path}/:id`} render={(props) => {
                    let data = props.location.state && props.location.state.data;
                    return (
                        <div>
                            <h1>{data.title}</h1>
                            <p>{data.content}</p>
                        </div>
                    )
                }}/>
            </div>  
        ) 
    }
}

export default News 
```
> `<NavLink>`传递的参数是通过location对象获取的。

![嵌套路由演示.gif](http://upload-images.jianshu.io/upload_images/5807862-7f74da232116ad33.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 优化嵌套路由
前面两种嵌套路由，子路由都渲染出了父组件，如果不想渲染出父组件，有两种方法。

**方法一：将配置子路由的`<Route>`写在index.js里面**
`index.js`
```
<Route exact path="/news" component={News}/>
<Route path="/news/:id" component={NewsDetail}/>
```
`pages/News.js`
```
class News extends Component {
    render() {
        return(
            <div className="news">
                <Header />
                <h1 className="title">请选择一条新闻：</h1> 
                {data.map((item) => (
                    <div key={item.id}>
                        <NavLink to={{
                            pathname: `${this.props.match.url}/${item.id}`,
                            state: {data: item}
                        }}>
                            {item.title}
                        </NavLink>
                    </div>
                ))}
            </div>  
        ) 
    }
}
```
`pages/NewsDetail.js`
```
import React, { Component } from 'react'
import Header from '../components/Header'

class NewsDetail extends Component {
    constructor(props) {
        super(props)
        this.data = props.location.state.data; //获取父组件传递过来的数据
    }

    render() {
        return(
            <div className="news">
                <Header />
                <h1>{this.data.title}</h1>
                <p>{this.data.content}</p>
            </div>  
        ) 
    }
}

export default NewsDetail 
```
**方法二：仍然将子路由配置写在News.js里面**
`index.js`
```
<Route path="/news" component={News}/>
```
> 注意：这里一定不能加exact，否则子组件永远渲染不出来。

`pages/News.js`
```
class NewsPage extends Component {
    render() {
        return(
            <div className="news">
                <Header />
                <h1 className="title">请选择一条新闻：</h1> 
                {data.map((item) => (
                    <div key={item.id}>
                        <NavLink to={{
                            pathname: `${this.props.match.url}/${item.id}`,
                            state: {data: item}
                        }}>
                            {item.title}
                        </NavLink>
                    </div>
                ))}
            </div>  
        ) 
    }
}

const News = ({match}) => {
    return (
        <div>
            <Route path={`${match.path}/:id`} component={NewsDetail}/>
            <Route exact path={match.path} render={(props) => <NewsPage {...props} />}/>
        </div>
    )
}

export default News 
```
> 注意：这里的写法其实就是将新闻页也看作一个组件，然后重新定义一个News组件，根据路由来渲染不同的组件，exact参数是加在这里的，并且导出的是News而不是NewsPage。
### 页面间传参的一些注意点
在嵌套路由和带参的嵌套路由两小节可以看到两种传参方式，如果仅仅是获取url里面的参，比如```<Route path={`${match.path}/:name`}/>```的name属性，子组件可以通过`this.props.match.params.name`取得，如果还需要多余的参数，比如选中的某一条数据，则父组件通过`<NavLink>`的to属性的search，hash, state向子组件传参，子组件通过`this.props.location.search|hash|state`获取。
但是，这两者是有区别的！使用的时候一定要小心！
以上面的新闻详情页为例，详情页的数据是从新闻页直接传过来的：
```
this.data = props.location.state.data;
```
现在，让我们随便点进一条新闻，然后刷新它，发现没毛病，然后手动输入另一条存在的新闻id，却报错了：
![路由问题.gif](http://upload-images.jianshu.io/upload_images/5807862-68214e11e00b6e65.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
报错是肯定的，这个页面的数据本身是通过`props.location.state.data`获取的，当我们在这个页面手动输入id时，根本没有数据，而且此时打印state，它的值是undefined.
但是！！通过`props.match.params`却可以获取到id，所以，这种方式显然更保险，不过你应该也看出来了，由于这种方式涉及到url地址栏，所以不可以传递过多的参数，所以开发过程中，要处理好这两种传参方式。
对于上面的新闻详情页例子，一般不需要把整条数据传递过去，而是传递一个id或者别的参数，然后在详情页再向服务器发起请求拿到该条数据的详情，可以修改代码：
`pages/NewsDetail.js`
```
constructor(props) {
    super(props)
    this.id = props.match.params.id;
        this.state = {
          data: ''
        }
}
componentWillMount() {
  this.getNewsDetail();
}
getNewsDetail() {
  fetch(`xxx?id=${this.id}`).then(res => res.json())
      .then(resData => {
        this.setState({data: resData});
      })
}
render() {
    let title = this.state.data && this.state.data.title;
    let content = this.state.data && this.state.data.content;
    return(
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
        </div>  
    ) 
}
```
不过，还是会有必须传递一整条数据过去或者其它更复杂的情况，这种时候就要处理好子组件接收数据的逻辑，以免出现数据为空时报错的情况，修改代码：
`pages/NewsDetail.js`
```
class NewsDetail extends Component {
    constructor(props) {
        super(props)
        this.data = props.location.state ? props.location.state.data : {} ;
    }

    render() {
        let title = this.data.title || '';
        let content = this.data.content || '';
        return(
            <div className="news">
                <Header />
                <h1>{title}</h1>
                <p>{content}</p>
            </div>  
        ) 
    }
}
```
以上两种处理方式都不会再出现用户输入一个不存在的id报错的情况，不过，我们还可以做的更好。
### 根据数据判断是否显示404页面
前面我们实现了一个简单的404页面，即路由不匹配时跳转到404页面，实际开发中还有一种情况，是根据参数去请求数据，请求回来的数据为空，则显示一个404页面，以上面的新闻详情页为例，假如我们现在是在这个页面发起的数据请求，那么我们可以用一个标志位来实现加载404页面：
`pages/NewsDetail.js`
```
constructor(props) {
    super(props)
    this.id = props.match.params.id;
        this.state = {
          data: '',
          hasData: true,// 一开始的初始值一定要为true
        }
}
componentWillMount() {
  this.getNewsDetail();
}
getNewsDetail() {
  fetch(`xxx?id=${this.id}`).then(res => res.json())
      .then(resData => {
         if (resData != null) {
           this.setState({data: resData});
         } else {
            this.setState({hasData: false})
         }
      })
}
//找不到数据重定向到404页面
renderNoDataView() {
    return <Route path="*" render={() => <Redirect to="/error"/>}/>
}
render() {
  return this.state.hasData ? this.renderView() : this.renderNoDataView()
}
```
### 按需加载
这真的是个非常非常重要的功能，单页面应用有一个非常大的弊端就是首屏会加载其它页面的内容，当项目非常复杂的时候首屏加载就会很慢，当然，解决方法有很多，webpack有这方面的技术，路由也有，把它们结合起来，真的就很完美了。
官网的[code-splitting](https://reacttraining.com/react-router/web/guides/code-splitting)就介绍了路由如何配置按需加载，只是不够详细，因为它缺少有关wepback配置的代码。
安装[bundle-loader](https://github.com/webpack-contrib/bundle-loader): ` yarn add bundle-loader`
`webpack.config.js`
```
module.exports = {
    output: {
        path: path.resolve(__dirname, 'build'), //打包文件的输出路径
        filename: 'bundle.js', //打包文件名
        chunkFilename: '[name].[id].js', //增加
        publicPath: publicPath,
    },
    module: {
        loaders: [
            {
                test: /\.bundle\.js$/,
                use: {
                    loader: 'bundle-loader',
                    options: {
                        lazy: true,
                        name: '[name]'
                    }
                }
            },
        ]
    },
}
```
项目中需要新建一个`bundle.js`文件，我们把它放在`components`下：
`components/Bundle.js`
```
import React, { Component } from 'react'

class Bundle extends Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      mod: null
    })
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}

export default Bundle
```
修改`index.js`
首先将引入组件的写法改为：
```
import loaderHome from 'bundle-loader?lazy&name=home!./pages/Home'
import loaderNews from 'bundle-loader?lazy&name=news!./pages/News'
```
相当于先经过`bundle-loader`处理，这里的`name`会作为`webpack.config.js`配置的`chunkFilename: '[name].[id].js'`的`name`。注意这时候`loaderHome`和`loaderNews`不是我们之前引入的组件了，而组件应该这样生成：
```
const Home = (props) => (
  <Bundle load={loaderHome}>
    {(Home) => <Home {...props}/>}
  </Bundle>
)


const News = (props) => (
  <Bundle load={loaderNews}>
    {(News) => <News {...props}/>}
  </Bundle>
)
```
剩下的就和之前的写法一样了，如果还有疑问我会把代码放在github上，地址贴在文末。现在来看看效果：
![image.png](http://upload-images.jianshu.io/upload_images/5807862-876259f6fbb41dba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
可以看到在首页会有一个`home.1.js`文件加载进来，在新闻页有一个`news.2.js`文件，这就实现了到对应页面才加载该页面的js，不过有一点你应该注意到就是`bundle.js`文件依然非常的大，这是因为react本身就需要依赖诸如`react`,`react-dom`以及各种loader,这些文件都会被打包到`bundle.js` 中，而我们虽然用路由实现了各页面的‘按需加载’，但这只分离了一小部分代码出去，剩下的怎么办？还是得用webpack。

### 写在最后
目前为止我使用到的路由例子就是以上这些了，小伙伴如果还有别的疑问可以评论，我们可以一起探讨，代码我放在[github](https://github.com/dengshasha/react-webpack/tree/master/react-webpack-04)上了。

