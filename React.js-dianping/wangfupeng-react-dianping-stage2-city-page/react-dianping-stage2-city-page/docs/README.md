# 选择城市页

网页源码：https://github.com/wangfupeng1988/react-simple-o2o-demo/tree/stage2-city-page

## 页面最终效果

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170121133301796-581383353.png)

## 路由

找到路由配置页面`./app/router/routeMap.jsx`可以看到配置城市页面的路由代码。

```
<Route path='/' component={App}>
    ......
    <Route path='/city' component={City}/>
    ......
</Route>
```

从代码可以看出，路由引用的是`./app/containers/City`这个页面。**注意，它还有个`App`的父组件，跟之前讲的`Home`一样**。

## `City`页面

既然是选择城市页面，那么至少要支持两个功能

- 显示当前城市
- 允许修改城市

这两个功能，都需要 Redux 的支持，因此`City`页面要能连接 Redux ，React 组件连接 Redux 之前已经讲解过两次，这里不再详细解释

```
function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)
```

## 跳转到城市选择页

在`HomeHeader`组件中，加一个链接，点击时能跳转到城市选择页面。这里用到了`react-router`中的`<Link>`组件

```
<Link to="/city">
    <span>{this.props.cityName}</span>
    &nbsp;
    <i className="icon-angle-down"></i>
</Link>
```

## `Header`组件

页面最上部是一个红色的 Header，显示页面标题，左侧有一个返回icon。不仅仅是这个页面，其他页面也会有这样的标题。多个页面公用的东西，我们就抽离成一个组件。

在`./app/components`中创建`Header`组件，然后引用到`City`页面中，并传入页面标题

```
<Header title="选择城市"/>
```

`Header`组件的代码非常简单，显示标题，然后支持返回功能

```
    render() {
        return (
            <div id="common-header">
                <span className="back-icon" onClick={this.clickHandle.bind(this)}>
                    <i className="icon-chevron-left"></i>
                </span>
                <h1>{this.props.title}</h1>
            </div>
        )
    }
    clickHandle() {
        window.history.back()
    }
```

最后一步是样式的美化。

## 显示当前城市

用 React、Vue 框架来开发 webapp 时，就得要求页面被拆分成非常细粒度的组件，这里虽然只是显示当前城市，也要作为一个组件抽离出去。

创建一个`CurrentCity`组件，并引用到`City`页面，然后将当前城市传递给它来显示

```
<CurrentCity cityName={this.props.userinfo.cityName}/>
```

`CurrentCity`组件的代码也非常简单，只需要显示出当前城市即可。剩下的就是一些样式的美化。

```
    render() {
        return (
            <div className="current-city">
                <h2>{this.props.cityName}</h2>
            </div>
        )
    }
```

## 可选城市列表

创建一个`CityList`组件来显示可选城市的列表。其中，可选的城市就是固定的几个城市，没有从后台获取，因为我们的关键不在于显示，而在于改变。因此，教程的每一个片段都要注重重点，不要让配角占有太多戏份。

点击每个城市，都需要将这个城市设置为当前城市，而这个设置的方法，我们在`City`页面定义。代码结构如下：

```
    render() {
        return (
            <div>
                ......
                <CityList changeFn={this.changeCity.bind(this)}/>
            </div>
        )
    }
    changeCity(newCity) {
        // 将新选择的城市设置为当前城市
        // 1. 修改 redux 
        // 2. 修改 localStorage
        // 3. 跳转到首页
    }
```

而在`CityList`组件中，我们要使用刚才定义的`changeCity`方法，即

```
render() {
        return (
            <div className="city-list-container">
                <ul className="clear-fix">
                    <li>
                        <span onClick={this.clickHandle.bind(this, '北京')}>北京</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, '上海')}>上海</span>
                    </li>
                    ....
                </ul>
            </div>
        )
    }
    clickHandle(cityName) {
        const changeFn = this.props.changeFn
        changeFn(cityName)
    }
```

## 总结

选择城市这个页面比较简单，要注意

- 两种页面跳转方式
- 修改 Redux 的值
