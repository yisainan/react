# React + React-router + Redux 的前端代码框架

此前的教程中，分别在介绍 React-router 和 Redux 的时候，都介绍了各自的代码文件结构特点。现在将两者结合起来，就是我们即将进行实际项目开发的代码框架了。

这两的代码结合其实没有太多冲突，只有`./app/index.jsx`一个文件中有看似重叠的部分，其实原理还是 React 组件。

```jsx
render(
    <Provider store={store}>
        <RouteMap history={hashHistory}/>
    </Provider>,
    document.getElementById('root')
)
```

在此，我们再将`./app`目录下的各个文件夹的用处重新总结一遍，权当复习此前学过的知识。

**`./app/actions`**

Redux 中使用的 actions，前面刚刚讲过。

**`./app/components`**

组件（木偶组件）目录。注意，此前强调过，一个组件一般用一个文件夹表示，里面一般有`index.jsx`、`style.less`、`img/`目录

**`./app/constants`**

Redux 的 actions 和 reducers 都会用到的常量，统一放在这里，前面刚刚讲过。

**`./app/containers`**

页面（智能组件）目录。注意，一个页面一般用一个文件夹表示，里面有`index.jsx`，如果页面复杂，可能需要`subpage/`目录来拆分页面。

**`./app/reducers`**

Redux 用到的 reducers，前面刚讲过。

**`./app/router`**

React-router 配置文件

## `./app/static`

系统全局使用的静态资源

## `./app/store`

Redux 创建 store

## `./app/util`

系统工具函数，处理时间格式，处理字符串格式等

