
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

运行程序。在操作之前先运行`Perf.start()`开始检测，然后进行若干操作，运行`Perf.stop`停止检测，然后再运行`Perf.printWasted()`即可打印出浪费性能的组件列表。

如此小的demo中就有性能问题，那可想而知任期发展，到了大系统中会有怎样的后果！



