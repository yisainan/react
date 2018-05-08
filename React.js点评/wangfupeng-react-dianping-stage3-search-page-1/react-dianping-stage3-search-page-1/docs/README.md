# 搜索页面的开发 - part1

源代码地址 https://github.com/wangfupeng1988/react-simple-o2o-demo/tree/stage3-search-page-1

## part1 && part2

- part1 主要介绍一些正式进入页面开发前的准备工作，但是也都非常重要（否则不会单独拿出来）
- part2 正式开发搜索页面，详解页面每一部分的开发过程

## 两个入口

从首页进入搜索结果页的场景有以下两种：

- 通过输入框输入关键字搜索
- 通过轮播图的类型搜索

输入框进入搜索页面的的实现方式，我们最后再介绍，到时候会引入`约束性和非约束性组件`的概念，内容比较多。

轮播图进入搜索页面的方式比较简单，就是通过`<Link>`组件设置一个路由就好了

```
<Link to="/search/jingdian"><li className="float-left jingdian">景点</li></Link>
<Link to="/search/ktv"><li className="float-left ktv">KTV</li></Link>
```

**演示过程中需要注意的是，这两种方式跳转到搜索结果页时路由是怎样的。**

## 路由配置

找到配置路由的文件`./app/router/routeMap.jsx`，找到搜索结果页的代码

```
<Router history={this.props.history}>
    <Route path='/' component={App}>
        ......
        <Route path='/search/:category(/:keyword)' component={Search}/>
        ......
    </Route>
</Router>
```

路由定位的页面在`./app/containers/Search`中，再次强调，它也有一个`App`的父组件。

注意看路由的配置规则`/search/:category(/:keyword)`，在之前讲`react-router`基础知识的时候，都已经介绍过了。这里再重申一遍，其中`/search`是路径，`/:category`是必填参数，`(/:keyword)`是选填参数。

上文让大家注意两种跳转到搜索结果页的方式的路由，可以和这里的规则对应一下。

代码中如何得到这些参数呢？可以通过以下的方式得到：

```
componentDidMount() {
    const params = this.props.params
    console.log('category param: ' + params.category)
    console.log('key param:' + params.keyword)
}
```

## 约束性和非约束性组件

**非约束性**

针对`<input>`输入框这种类型，你可以通过这种方式来实现（其中`defaultValue`就是原生DOM中的`value`属性）

```
<input type="text" defaultValue="a" ref="input"/>
```

获取输入框的值的时候，需要这样做——即通过查询DOM，获取DOM属性的方式来做。

```
var input = this.refs.input
console.log(input.value)
```

这样做，跟之前jquery的做法一样，都是围绕着DOM来做的。缺点有两个：

- 依赖DOM操作，不符合组件化的设计，也不易扩展
- 查询DOM消耗更多性能

**约束性**

比较推荐的方式是这一种。即监控`<input>`的变化，将值实时保存到`state`中，直接从`state`中获取值。

```
<input type="text" value={this.state.name} onChange={this.handleChange} />

//...省略部分代码
handleChange: function(e) {
  this.setState({name: e.target.value});
}
```

React或者Vue都是一种基于数据驱动视图的设计方式，定好数据和视图的规则之后，只更改数据，不直接操作DOM。操作DOM的事情，交给React或者Vue这个框架的代码来搞定。

最后看一下实际代码中如何修改`Home`页面的输入框。
