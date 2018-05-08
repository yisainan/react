
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








