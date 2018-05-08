# 登录页面的开发

源码地址 https://github.com/wangfupeng1988/react-simple-o2o-demo/tree/stage5-login-page

## 页面效果

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170123195603191-1796366032.png)

## 路由配置

打开路由配置文件`./app/router/routeMap.jsx`找到配置登录页面的代码

```
<Router history={this.props.history}>
    <Route path='/' component={App}>
        ......
        <Route path='/Login(/:router)' component={Login}/>
        ......
    </Route>
</Router>
```

需要注意两点：

- 父组件`App`
- 路由配置`/Login(/:router)`

可选的参数`router`即登录之后需要跳转的页面。即在哪个页面登录的，登录完了之后还要再跳转到哪个页面，这种功能很常见。

路由指向的页面是`./app/containers/Login`页面。这个页面中，除了要显示登录所需要的输入框和按钮之外，还需要干另外一件事儿————**判断是否已经登录，如果已经登录了，则不要再重新登录了**。

这个功能需要用户ID，而用户ID是存储到 Redux 中的，因此需要连接 Redux 。如何连接直接讲过很多次了，这里直接把代码写上，不详细讲了。

如果没有登录，则直接显示一个登录组件，来完成登录的功能。

```
{
    // 等待验证之后，再显示登录信息
    this.state.checking
    ? <div>{/* 等待中 */}</div>
    : <div>显示登录组件</div>
}
```

## Header 组件

这里直接引用通用的`Header`组件即可，跟选择城市页和详情页一样。

```
<Header title="登录"/>
```

## 登录组件

登录页面的登录功能，还需要一个单独的组件做，创建`./app/components/Login`组件，并引用到页面中。但是引用时需要传递一个方法`loginHandle`，这个方法来处理登录之后的事情。

```
render() {
    return (
        <div>
            <Header title="登录"/>
            {
                // 等待验证之后，再显示登录信息
                this.state.checking
                ? <div>{/* 等待中 */}</div>
                : <LoginComponent loginHandle={this.loginHandle.bind(this)}/>
            }
        </div>
    )
}
loginHandle() {
    // 登录成功之后的业务处理
}
```

**注意，为何要把登录之后的处理代码单独分割出来了？**————因为登录组件作为一个组件，是一种功能性的存在（木偶组件），它只懂得执行交给它任务，不理会交给了它什么。而登录之后的处理，一种业务性的存在，需要在更外层的组件（智能组件）中定义出来，然后传递给它。

在开发登录组件内部的代码时，需要注意两点：

- 遇到输入框，就要记得之前讲过的“约束性组件”
- 发送短信验证码是假的，教程以演示技术为准，不一定非得把功能完全实现到位，特别是这种需要连接外部服务又和教程主线关系不大的功能，就更加没有必要了。


