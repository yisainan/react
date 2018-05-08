
# react-router 基础知识

## 安装

安装 react-router `npm install react-router --save`，完成之后可查看`package.json`的变化。

本章节演示 react-router 的一些基本用法，为了能让大家快速了解。接下来的项目开发中，可能会有另外的用法（应该不多），到时候遇到再讲。当然也欢迎大家去[官网文档](https://github.com/ReactTraining/react-router)自己提前学习。

## 创建页面

创建以下几个页面，用于演示

- `./app/containers/App.jsx` 所有页面的外壳
- `./app/containers/Home` 主页
- `./app/containers/List` 列表页
- `./app/containers/Detail` 详情页
- `./app/containers/NotFound` 404

注意`App.jsx`中的代码目前是这样子的，而且放在这里有点多余，但是在正式的项目开发中，这个文件很有用，而且这个文件和`react-router`也将会结合的很好。

```jsx
class App extends React.Component {
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}
```

## 配置 router

创建 `./app/router/routeMap.jsx` 文件，主要代码如下，详细的代码看源文件。

```jsx
class RouteMap extends React.Component {
    updateHandle() {
        console.log('每次router变化之后都会触发')
    }
    render() {
        return (
             <Router history={this.props.history} onUpdate={this.updateHandle.bind(this)}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home}/>
                    <Route path='list' component={List}/>
                    <Route path='detail/:id' component={Detail}/>
                    <Route path="*" component={NotFound}/>
                </Route>
            </Router>
        )
    }
}
```

注意，代码中`path='detail/:id'`，最后一个标记表示参数，例如`/detail/123`这个`123`就是参数，具体的使用在下文详解。

还要注意，`<Route>`是可以嵌套的，上面的代码中只嵌套了一层，在后面的项目开发中，可能会嵌套层次多一些，不过是一个道理

## 使用 router

`./app/index.jsx`中的代码如下，这样就使用了我们刚才定义的`routeMap`组件

```jsx
import React from 'react'
import { render } from 'react-dom'
import { hashHistory } from 'react-router'

import RouteMap from './router/routeMap'

render(
    <RouteMap history={hashHistory}/>,
    document.getElementById('root')
)
```

注意这里的`hashHistory`，规定用 url 中的 hash 来表示 router 例如`localhost:8080/#/list`。与之对应的还有一个`browserHistory`也可用，它就不使用 hash ，直接可以这样`localhost:8080/list`表示。但是后者需要服务器端支持，我们这里用前者。两者在前端开发中，使用起来都是一样的，只是表示形式不一样。

到此为止就可以`npm start`运行看效果了。

## 页面跳转

从给一个页面跳转到另一个页面，有两种方法。第一种是 `<Link>` 跳转，例如在 Home 页面中的代码。（其实这个`<Link>`渲染完了就是html中的`<a>`）

```
import React from 'react'
import { Link } from 'react-router'

class Home extends React.Component {
    render() {
        return (
            <div>
                <p>Home</p>
                <Link to="/list">to list</Link>
            </div>
        )
    }
}

export default Home
```

另一个方法是使用 js 跳转，例如在 List 页面中

```jsx
import React from 'react'
import { hashHistory } from 'react-router'

class List extends React.Component {
    render() {
        const arr = [1, 2, 3]
        return (
            <ul>
                {arr.map((item, index) => {
                    return <li key={index} onClick={this.clickHandler.bind(this, item)}>js jump to {item}</li>
                })}
            </ul>
        )
    }
    clickHandler(value) {
        hashHistory.push('/detail/' + value)
    }
}

export default List
```

## 获取参数

Detail 页面需要获取 url 中的`id`参数，否则配置这个参数就无用了。可以使用 `this.props.params.id` 获取，可查看 Detail 的源码。


## 高级 & 进阶

使用到了 router 的项目，其规模不会太小，代码量也不会太少。但是如果项目规模非常非常大的情况下，就会带来各种性能问题，其中给一个就是——视屏时间。

就像我们这次的demo，如何让`/`路由（即首页）加载的更快？抛开代码效率问题，其中一个解决方案就是先不要加载其他页面的代码，**即首页需要哪些代码我就先加载、执行哪些，不需要的就先别加载**。

反观我们现在的做法，页面一出来，不管暂时有用没用的代码，都统统加载下来了。如果项目规模很大、代码行数很多的时候，就不行了。

针对大型项目的**静态资源懒加载**问题，react-router 也给出了解决方案 —— [huge-apps](https://github.com/ReactTraining/react-router/tree/master/examples/huge-apps)，它将 react-router 本身和 webpack 的 `require.ensure` 结合起来，就解决了这一问题。

不过——最后——我们还是不用这种方式——因为我们的项目还没有到那种规模。任何收获都要付出相应的代价，设计越复杂风险就越大，因此我推崇精简设计。至于这个“静态资源懒加载”，大家看一下刚才的源码就能明白了。
