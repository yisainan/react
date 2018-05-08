
# 用户主页的开发

源码地址    https://github.com/wangfupeng1988/react-simple-o2o-demo/tree/stage7-user-page

## 页面实现效果

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170125201523394-1791020710.png)

## 路由配置

查看该页面的路由配置代码。

```
            <Router history={this.props.history}>
                <Route path='/' component={App}>
                    <Route path='/User' component={User}/>
                </Route>
            </Router>
```

路由指向的是`./app/containers/User`页面，创建`User`页面，并**连接 Redux**，因为需要用户登录的信息。

需要用户登录信息的用意是————渲染完成之后要判断用户是否登录，如果未登录则跳转到登录页面

```
    componentDidMount() {
        // 如果未登录，跳转到登录页面
        if (!this.props.userinfo.username) {
            hashHistory.push('/Login')
        }
    }
```

## Header

页面头部可引用通用的`Header`组件，但是要对`Header`组件做一次简单的改造。

```
<Header title="用户主页" backRouter="/home"/>
```

此前的`Header`组件中，返回时直接写了`hashHistory.push(hashHistory)`，简单粗暴。但是用户主页是从 Login 页面过来的，如果这样返回到 Login 页面，它判断用户已经登录了，会再次跳转到用户主页，就死循环了。因此我们这里要干预`Header`组件的返回事件，让它乖乖的返回的 Home 页面。

## 显示用户信息

创建`UserInfo`组件用以显示用户信息（用户名和城市），并引入到`User`页面中，同时将用户信息传入到组件中

```
<UserInfo username={userinfo.username} city={userinfo.cityName}/>
```

## 购买列表 - 子页面

接下来要显示用户购买的商品的列表。此前在讲解“购买”功能的时候，曾经详细说明这里是**模拟购买**，即没有正式的购买流程。因此这里的购买列表也是模拟的，从后端获取数据，然后展示到页面中。

在`subpage`中创建`OrderList.jsx`子页面（注意要引用同级别下的`style.less`），并将用户名传入。虽然这里是模拟的购买列表，但是获取后端接口时该有的参数还是得有，每个用户的购买列表不一样，因此要传递用户名过去。

```
<OrderList username={userinfo.username}/>
```

在`OrderList`子页面中，我们通过用户名获取后端数据，fetch 接口（`./app/fetch/user/orderlist.js`）是这样的

```
export function getOrderListData(username) {
    const result = get('/api/orderlist/' + username)
    return result
}
```

## 购买列表 - 组件

获取完后端数据之后，然后交给一个组件来展示数据。创建`OrderListComponent`组件，并引用到子页面中，用以展示购买列表。

```
<OrderListComponent data={this.state.data}/>
```

在`OrderListComponent`组件中，先通过一个列表，将标题展示出来，详细内容用另外一个组件来展示。

至此，回顾一下`./app/components/List`组件，其中还有一个`Item`组件，想想当时为什么这么设计。

同理，这里也创建一个`Item`组件，用来展示详细信息。

```
            <div>
                {data.map((item, index) => {
                    return <Item key={index} data={item}/>
                })}
            </div>
```

在`Item`组件中有一个`<button>评价</button>`按钮，该按钮点击没有反应，什么都没有做。这个评价功能将在下一大节详细讲解。

