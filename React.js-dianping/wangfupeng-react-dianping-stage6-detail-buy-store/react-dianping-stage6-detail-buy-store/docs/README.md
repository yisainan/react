
# 收藏和购买的开发

源码地址 https://github.com/wangfupeng1988/react-simple-o2o-demo/tree/stage6-detail-buy-store

## 最终页面效果

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170124221152503-437566496.png)

## 增加“收藏 & 购买”子页面

定位到`Detail`页面，本节教程讲解的功能需要在该页面的基础上再做增加。先增加一个`subpage/Buy.jsx`的子页面，然后引入到`Detail`页面中，并传入`id`

```
<Buy id={id}/>
```

该子页面中需要用到用户信息（将用于下文的登录验证功能），因此要连接 Redux ，跟之前连接的代码一样

```
function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)
```

## 创建组件

在`Buy.jsx`子页面中，需要两个按钮——“收藏”和“购买”，这两个按钮我们要放在一个组件中做。创建`./app/components/BuyAndStore`组件，然后引入到子页面中。不过需要注意两点

- 需要告诉组件，这个商户是否已经被收藏了。如果已经被收藏需要显示“已收藏”文字，如果未被收藏需要显示“收藏”按钮
- “收藏”和“购买”两个按钮点击之后的事件，需要在子页面中定义（再去回顾**智能组件**和**木偶组件**的区别）

```
<BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
```

## 登录验证

收藏和购买功能，都需要用户登录之后才能执行，因此这里先定义一个登录验证的功能，后面会用到。大家注意，下面代码中跳转到`/Login`页面时，带了一个`router`参数。具体可以回顾之前讲登录页面时路由配置中的`router`参数的作用。

```
    // 检查登录状态
    loginCheck() {
        const id = this.props.id
        const userinfo = this.props.userinfo
        if (!userinfo.username) {
            // 跳转到登录页面的时候，要传入目标router，以便登录完了可以自己跳转回来
            hashHistory.push('/Login/' + encodeURIComponent('/detail/' + id))
            return false
        }
        return true
    }
```

## 购买功能

购买功能，首先要验证登录，然后**模拟购买**。

```
    // 购买事件
    buyHandle() {
        // 验证登录，未登录则retur
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }

        // 此过程为模拟购买，因此可省去复杂的购买过程

        // 跳转到用户主页
        hashHistory.push('/User')
    }
```

**需要重点说明这里的模拟购买**。其实，一个真实的购买流程非常复杂，就拿咱们日常使用的团购、O2O这些app来说，购买需要购物车、订单、付款等一个完整的流程，另外订单还有各种管理、付款还有各种支付方式……，如果把这一套搞下来将会耗费大量的精力和时间。然而，这个巨大的流程在我们的 React 教程中，其实并没有那么重要。因此，根据成本（我的录制成本和大家的时间成本）和收益的估算，我们决定忽略这个流程，把时间更多的留给 React 和 Redux 的讲解上。希望大家能理解。

另外这里提一下，我们之前用到的数据操作，都是`GET`方法，没有用到`POST`。而这里的购买按钮，如果实现的话，肯定是`POST`数据，但是被我们忽略了。此事不要担心，后面会有课程讲到`POST`的使用。

## 收藏功能

虽然购买流程我们进行了大量的简化，但是收藏功能却实现的很详细，虽然它也很麻烦。因为————通过收藏功能，我们能更好的学习 Redux

> 到底哪里该简化，哪里该详细，都是经过详细斟酌的，总体要符合本教程的中级目标。不是哪里麻烦了就简化一下。

首先，得有一个地方存储收藏的数据————数据存储到 Redux 中，接下来再去把 Redux 配置过程快速的熟悉一遍。

- 创建 Reducer。创建`./app/reducers/store.js`，并修改`./app/reducers/index.js`。代码中用到的常量
- 创建 Action。创建`./app/actions/store.js`
- 以上两个代码用到的常量，都在`./app/constants/store.js`中

经过上一步的准备工作之后，我们将`Buy.jsx`子页面和 Redux 连接的代码进行补充，把收藏用到的 state 和 action 也都加上。

```
function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)
```

接下来就可以愉快的开发收藏功能了。

首先，在组件渲染结束时，查看该商户是否已经被收藏，并且将结果更新到`this.state.isStore`（一开始便创建了）中。

```
    componentDidMount() {
        // 验证当前商户是否收藏
        this.checkStoreState()
    }
    // 检验当前商户是否被收藏
    checkStoreState() {
        const id = this.props.id
        const store = this.props.store

        store.some(item => {
            if (item.id === id) {
                // 已经被收藏
                this.setState({
                    isStore: true
                })
                // 跳出循环
                return true
            }
        })
    }
```

然后，再开发收藏按钮点击的功能

```
    // 收藏事件
    storeHandle() {
        // 验证登录，未登录则return
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }

        const id = this.props.id
        const storeActions = this.props.storeActions
        if (this.state.isStore) {
            // 已经被收藏了，则取消收藏
            storeActions.rm({id: id})
        } else {
            // 未收藏，则添加到收藏中
            storeActions.add({id: id})
        }
        // 修改状态
        this.setState({
            isStore: !this.state.isStore
        })
    }
```


## 组件样式

最后就是组件中按钮的样式美化，就两个按钮。还是老样子，撤销之前的代码，简单讲一下html和css

## 总结

本节课虽然只有两个简单的按钮，但是因为涉及到了 Redux 的操作，内容非常多。本节课的重点就是 Redux 的使用。
