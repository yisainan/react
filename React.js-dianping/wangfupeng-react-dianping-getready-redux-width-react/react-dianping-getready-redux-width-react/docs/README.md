
# 介绍 Redux

Redux是一个数据状态管理插件，搭配 React 特别合适，详细的用法可见[Redux官网](http://redux.js.org/)

## 使用场景

无论是移动端还是 pc 端，当你使用 React 或者 vue 开发组件化的 SPA 程序时，组件之间共享信息是一个非常大的问题。例如，用户登录之后客户端会存储用户信息（如`userid`、头像等），而系统的很多个组件都会用到这些信息，例如收藏、点赞、评论等。这些组件在用到用户信息时，难道每次使用都重新获取一遍？———— 自然不是这样。因此每个系统都需要一个管理多组件使用的公共信息的功能，这就是 Redux 的作用。同理，vue 也有相应的工具，即 vuex ，可以自己去 github 上搜索相关资料。

初学者可能通过这几句话无法真实理解它的用意，此时你只需要记住：**只要使用 React 开发系统，你绝大部分都需要结合 Redux 来使用**，后面的课程我们详细讲解 Redux 在实际项目中的使用，课程结束后，你就会明白其中的道理。

## 安装

如果单纯使用 Redux 仅仅安装 Redux 即可，执行`npm install redux --save`，不过在 React 中使用 Redux 肯定会用到 `react-redux` 这一工具，因此这里一起安装完，执行`npm install react-redux --save`。


## 基本使用

可以参见`./app/redux-demo.js`中的例子，如下代码

```js
    // 定义计算规则，即 reducer
    function counter(state = 0, action) {
        switch (action.type) {
            case 'INCREMENT':
                return state + 1
            case 'DECREMENT':
                return state - 1
            default:
                return state
        }
    }

    // 根据计算规则生成 store
    let store = createStore(counter)

    // 定义数据（即 state）变化之后的派发规则
    store.subscribe(() => {
        console.log('current state', store.getState())
    })

    // 触发数据变化
    store.dispatch({type: 'INCREMENT'})
    store.dispatch({type: 'INCREMENT'})
    store.dispatch({type: 'DECREMENT'})
```

简单几十行代码，就诠释了 Redux 的设计理念，这里简单分析一下：

- Redux 是一个管理数据的工具，我们创建一个`store`变量用来管理数据。而这个`store`不是凭空创建的，创建它的前提是，得设定一个管理规则。以上代码中，我们的管理规则是：数据（即`state`）默认是 0，传入`INCREMENT`就加一，传入`DECREMENT`就减一
- 创建`store`用来管理数据，具体的管理形式是什么呢？第一，要通过一个函数来触发数据的变化，即`dispatch`，触发的时候一定要符合之前定制的规则，否则无效。第二，数据一旦发生变化时，会导致怎样后果，即`subscribe`中定义的函数会执行。第三，如何取得当前的数据，即`store.getState()`。这一块，熟悉设计模式的同学不难理解，这就是普通的发布和订阅的设计模式，也是js种惯用的设计模式。
- 还有一点特别要注意，即在规则函数中，数据变化时要`return`一个新的值，而不是直接修改原来的值。这一点和之前提到的`Immutable.js`一样，都是使用了**不可变数据**这一概念。这种设计方式明确了数据的变化时段，使得数据管理更清晰，复杂度更低。


------------------ 分割线 ------------------


# Redux 和 React 集成

这块一开始介绍可能会感觉有点混乱，要做好心理准备。


## 创建 store

跟上次讲过得简单 demo 一样，首先也需要创建一个`store`，参见`./app/store/configureStore.js`的代码。之前的 demo 提到，创建`store`之前要有规则，这里的第一个参数就是这个规则，后面会详细讲到。

```js
    const store = createStore(rootReducer, initialState,
        // 触发 redux-devtools
        window.devToolsExtension ? window.devToolsExtension() : undefined
    )
```

第二个参数即初始化的数据，第三个参数可调起 chrome 扩展程序，具体可参见 [redux-devtools](https://github.com/gaearon/redux-devtools)


## 创建规则（Reducer）

使用 Redux 时，刚才提到的“规则”被称作`reducer`（就是一个统一的称呼，不比去纠结），因此这里的数据规则代码都在`./app/reducers`目录下。

先看`userinfo.js`的代码，跟上次 demo 中的几乎一样，唯一的区别就是将 const 都写到了`./app/constants/userinfo.js`中。之所以这样做，是因为这些 const 会在多个文件中使用，因此要抽象出来。

再看`index.js`的代码，它用`combineReducers`这个函数对`userinfo.js`的数据进行了封装，这样做是为了更好的扩展性。试想，一个系统中存储在 Redux 中的数据可能会有很多，我们这里已经有一个`userinfo.js`处理用户数据，和可能哪天就再加`nav.js`处理导航数据、加`ad.js`处理广告数据……

上次的demo中，`state`就是一个数据，可以进行`state + 1`或`state - 1`，数据结构非常简单。而现在，数据结构复杂太多，必须分组管理。因此我们需要用`state.userinfo`来表示用户数据，`state.nav`表示导航数据，`state.ad`表示广告数据…… ———— 这就是用`combineReducers`分装各个 reducer 的作用。


## 创建 action

上次的 demo 中，最后执行数据变化时`store.dispatch({type: 'INCREMENT'})`，这里的`{type: 'INCREMENT'}`是我们手动写上的，而在实际的应用中，我们需要用一些函数将它分装起来，即`./app/actions`中的文件，虽然此处只有`userinfo.js`这一个文件。

在`userinfo.js`中，我们把每个业务操作都分装为一个函数，该函数接收`data`，然后再根据 reducer 的规则对 data 进行分装，最后返回。当然，最后返回的结果肯定还是会交给`dispatch`来处理，这是后面要说的。


## 结合到 React

先看`./app/index.js`，重点注意下面这些代码。这里，创建了`store`并传递给`<Provider>`组件，然后让`<Provider>`组件作为所有组件的根节点。

```jsx
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()

render(
    <Provider store={store}>
        <Hello/>
    </Provider>,
    document.getElementById('root')
)
```


然后看`./containers/Hello.jsx`，注意下面这些代码。通过下面的封装，就把`userinfo`和`userinfoActions`当做`props`传入到`Hello`中了，即在`Hello`组件中通过`this.props.userinfo`和`this.props.userinfoActions`即可获取数据和 actions

```jsx
function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userinfoActions: bindActionCreators(userinfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hello)
```


获取了数据和 actions 该怎么用呢？我们将它们传递给子组件，`A`和`B`组件负责展示数据，`C`组件负责触发actions。具体可参见各个组件的源代码。

```jsx
    render() {
        return (
            <div>
                <p>hello world</p>
                <hr/>
                <A userinfo={this.props.userinfo}/>
                <hr/>
                <B userinfo={this.props.userinfo}/>
                <hr/>
                <C actions={this.props.userinfoActions}/>
            </div>
        )
    }
```

运行代码之后，就会看到数据变化的效果了。


------

**总结：接下来的实际项目中，也会像上面这样使用 Redux，如果这里还有点不明，接下来的课程也会再详细讲解————当然，还是要尽早搞明白好**
