# 商户详情页面的开发

源码地址：https://github.com/wangfupeng1988/react-simple-o2o-demo/tree/stage4-detail-page

## 页面效果

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170122192140738-1089927699.png)

## 路由配置

进入路由配置文件`./app/router/routeMap.jsx`找到详情页的配置代码，可以看到引用的是`./app/containers/Detail`页面

```
<Router history={this.props.history}>
    <Route path='/' component={App}>
        ......
        <Route path='/detail/:id' component={Detail}/>
        ......
    </Route>
</Router>
```

这里简单注意两点

- `App`父组件
- 路由配置中`id`参数

## 页面入口

所有的商户详情页，都是在列表页进入的。而所有的列表页，都是通过`./app/components/List`这个组件来显示的，而`List`中每一项，又都是`Item`组件来实现的。

因此在`Item`组件中，增加一个`<Link>`作为链接将原来的内容包括起来。

```
<Link to={'/detail/' + data.id}>
    ...原来的内容...
</Link>
```

## Header

从页面最终效果看来，该页面的头部和选择城市页面的头部完全一样，因此直接可以引用之前的`Header`组件 **（体会一下组件化的好处，抽离出组件即可通用）**

```
<Header title="商户详情"/>
```

## 获取后端数据

进入页面之后，首先可以拿到商户的`id`，然后就可以获取商户的信息了。开发`./app/fetch/detail/detai.js`，即可看到获取后端数据的接口

```
// 获取商户信息
export function getInfoData(id) {
   const result = get('/api/detail/info/' + id)
   return result
}

// 获取评论数据
export function getCommentData(page, id) {
    const result = get('/api/detail/comment/' + page + '/' + id)
    return result
}
```

## 商户信息模块

看最终效果图，这部分需要获取数据之后再展示数据，完全符合创建`subpage`的条件。因此在`subpage`中创建`Info.jsx`子页面。然后将子页面引用到`Detail`页面中，并将`id`传入进去。

```
<Info id={id}/>
```

在`Info`子页面中，要根据传入的`id`获取后端数据，然后传递给一个组件来展示。创建`DetailInfo`组件，并引用到`Info`页面中，将获取的数据传递过去。

```
<DetailInfo data={this.state.info}/>
```

具体到`DetailInfo`页面就比较简单了，即把需要展示的信息展示出来即可。最后就是样式。

## 点评列表

和`Info`子页面一样，点评列表也需要创建一个子页面。在`subpage`中创建`Comment.jsx`，并引用到`Detail`页面中，把商户的`id`传入。**注意，这里还引用了同目录下的一个`style.less`，不要忘记**

```
<Comment id={id}/>
```

到这里之后，代码讲解暂停，将`Comment`子页面相关的代码都直接还原出来，直接看最终的运行效果————**上拉加载更多**

至此为止，上拉加载更多的页面已经遇到三个：

- 首页的“猜你喜欢”
- 搜索结果页的列表
- 此处的“用户评论”

这里的用户评论跟之前两个的实现方式也是完全一样的，不同的地方在于引用的`ListComponent`组件不一样。因为列表的样式不一样，这个无可厚非。但是实现逻辑是一样的。但是`LoadMore`组件是公用的。

- `var ListComponent = require('../../../components/List')`
- `var ListComponent = require('../../../components/CommentList')`

这里我们当然不会再去赘述开发过程，即便是这里的`ListComponent`引用的组件不一样，我们也不去挨行写代码来讲了。

这里我们跳出具体的代码实现，考虑一个层次更高的问题 ———— **如何保证这种类似功能或者页面的实现一致性？** ———— 即，一个地方实现了，其他类似的地方可以直接引用或者照搬，不必再做不一样的实现。我总结的主要有两点：

- 后端返回数据的高度统一性，例如都是`{data: [...], hasMore: true}`这种形式
- 前端组件的高度拆分和抽象，以便做到最大极限的灵活拼接

最后引出的这个问题，非常重要，可能在不同的项目中就会有不同的解决方案。我根据本次教程的代码总结这两点，对于大家来说也只能是抛砖引玉。最重要的是，大家要学会这种思考方式。
