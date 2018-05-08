
# React 性能优化

## 简单的 todo-list-demo

讲 React 性能优化不能光靠嘴说，得有一个 demo 作为依托，做一个简单的 todolist demo，根据源代码来讲解。顺便体验一下 React 最简单的用法。




## 性能检测

安装 react 性能检测工具 `npm i react-addons-perf --save`，然后在`./app/index.jsx`中

```js
// 性能测试
import Perf from 'react-addons-perf'
if (__DEV__) {
    window.Perf = Perf
}
```

运行程序。在操作之前先运行`Perf.start()`开始检测，然后进行若干操作，运行`Perf.stop`停止检测，然后再运行`Perf.printWasted()`即可打印出浪费性能的组件列表。在项目开发过程中，要经常使用检测工具来看看性能是否正常。

如果性能的影响不是很大，例如每次操作多浪费几毫秒、十几毫秒，个人以为没必要深究，但是如果浪费过多影响了用户体验，就必须去搞定它。





## PureRenderMixin 优化

React 最基本的优化方式是使用[PureRenderMixin](http://reactjs.cn/react/docs/pure-render-mixin.html)，安装工具 `npm i react-addons-pure-render-mixin --save`，然后在组件中引用并使用

```jsx
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    //...省略其他内容...
}
```

React 有一个生命周期 hook 叫做`shouldComponentUpdate`，组件每次更新之前，都要过一遍这个函数，如果这个函数返回`true`则更新，如果返回`false`则不更新。而默认情况下，这个函数会一直返回`true`，就是说，如果有一些无效的改动触发了这个函数，也会导致无效的更新

那么什么是无效的改动？之前说过，组件中的`props`和`state`一旦变化会导致组件重新更新并渲染，但是如果`props`和`state`没有变化也莫名其妙的触发更新了呢（这种情况确实存在）———— 这不就导致了无效渲染吗？

这里使用`this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);`的意思是重写组件的`shouldComponentUpdate`函数，在每次更新之前判断`props`和`state`，如果有变化则返回`true`，无变化则返回`false`。

因此，我们在开发过程中，在每个 React 组件中都尽量使用`PureRenderMixin`




## Immutable.js 优化

React 的终极优化是使用 [Immutable.js](https://facebook.github.io/immutable-js/) 来处理数据，Immutable 实现了 js 中不可变数据的概念（不了的同学可以去查一下何为“不可变数据”）。

但是也不是所有的场景都适合用它，当我们组件的`props`和`state`中的数据结构层次不深（例如普通的数组、对象等）的时候，就没必要用它。但是当数据结构层次很深（例如`obj.x.y.a.b = 10`这种），你就得考虑使用了。

之所以不轻易使用是，Immutable 定义了一种新的操作数据的语法，如下。和我们平时操作 js 数据完全不一样，而且每个地方都得这么用，学习成本高、易遗漏，风险很高。

```js
    var map1 = Immutable.Map({a:1, b:2, c:3});
    var map2 = map1.set('b', 50);
    map1.get('b'); // 2
    map2.get('b'); // 50
```

因此，这里建议优化还是要从设计着手，尽量把数据结构设计的扁平一些，这样既有助于优化系统性能，又减少了开发复杂度和开发成本。

本教程中不会使用 Immutable.js


