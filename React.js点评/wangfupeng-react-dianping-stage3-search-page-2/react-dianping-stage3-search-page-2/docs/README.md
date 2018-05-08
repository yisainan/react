# 搜索结果页的开发 - part2

源码地址 https://github.com/wangfupeng1988/react-simple-o2o-demo/tree/stage3-search-page-2

## 页面效果

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170121200213171-290770945.png)

## 抽离 SearchInput 组件

根据最终实现的效果可以看到，搜索结果页的头部有一个输入框，而首页的头部也有一个输入框，两者的作用都是一样的。因此要把这个输入框抽离成一个组件，两个地方公用。

由于搜索结果页还没有开始创建，因此处理的这个组件先给首页的头部用，即用于`HomeHeader`组件中。

创建`./app/components/SearchInput`组件，并引用到`HomeHeader`中。

```
<SearchInput value="" enterHandle={this.enterHandle.bind(this)}/>
```

引用时需要传递两个参数，`value`即引用时要显示的默认值，`enterHandle`即在其中输入内容并回车时，要触发的事件。具体的实现，看实际代码即可。

在`SearchInput`组件中，首先要满足约束性组件的条件，第二要用上传入的`enterHandle`的方法。

## SearchHeader 组件

搜索结果页的头部，也是一个红色背景的Header，但是这个Header的样子，和之前做的其他页面的都不一样，因此又要重新做一个Header组件。

创建`./app/components/SearchHeader`组件，并引用到`Search`页面中。

```
<SearchHeader keyword={params.keyword}/>
```

注意，这里要传入一个`keyword`属性，即把搜索结果页拿到的`keyword`参数传递进去 —— 因为要在头部的 input 中显示搜索的关键字。（这个`params.keyword`在 part1 的时候已经解说过了）

在`SearchHeader`组件的代码实现中，左侧有一个返回按钮，然后就是输入框。这里的输入框当然要引用刚刚抽离出来的`SearchInput`组件。

```
<SearchInput value={this.props.keyword || ''} enterHandle={this.enterHandle.bind(this)}/>
```

两个必要的参数是必须传的。其中传递给`value`参数的，正好是接收到的`keyword`属性值

## 结果列表

这里的结果列表和首页中的“猜你喜欢”基本差不多，也是需要在`subpage`目录下创建一个子页面，然后在子页面中获取数据，并传递给`./app/components/List`，加载更多的实现方式，也是一个样子的。

唯一不同的是，如果在搜索结果页头部的输入框中再次输入内容重新进行搜索时，就需要多一步处理。

```
    // 处理重新搜索
    componentDidUpdate(prevProps, prevState) {
        const keyword = this.props.keyword
        const category = this.props.category

        // 搜索条件完全相等时，忽略。重要！！！
        if (keyword === prevProps.keyword && category === prevProps.category) {
            return
        }

        // 重置 state
        this.setState(initialState)

        // 重新加载数据
        this.loadFirstPageData()
    }
```

这里需要理解`componentDidMount`和`componentDidUpdate`两个生命周期的不同。

- 页面初次渲染，会走`componentDidMount`
- 页面再次渲染，就不会走`componentDidMount`，而只走`componentDidUpdate`

