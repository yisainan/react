源码地址：https://github.com/wangfupeng1988/react-simple-o2o-demo/tree/stage1-home-page



# 首页开发

这一大节，详细介绍一下我们如何从一个空代码框架，做出一个首页的效果。

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170104211944269-446009817.png)

**特别提醒：再分析之前，我们首先要回忆下之前讲过的`page - subpage - components`以及“智能组件”、“木偶组件”的相关知识。如果对此还一知半解，建议暂停视频，再回顾之前讲述的这块内容。**

## 各个开发阶段

现在，我们面临着的就是一个空空的代码框架，这个框架中代码都是之前介绍基础知识的时候讲过的。

接下来，先在页面中打印出 hello world

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170104212354441-470860319.png)

然后，我们快速的做出一个 head 组件，并集成到页面中。在做 head 组件的时候，会补充一点 css3 字体图标的知识，之前没有单独讲过。

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170104213522503-1001536058.png)

再对 head 组件进行一下样式的美化。接下来的其他组件也会有样式的美化过程，但这是基础的 css 支持，我们不会一一来介绍。

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170104213529112-45163901.png)

接下来是轮播图。且先不管轮播图，先把数据显示到页面中，其实就是三个 list 而已。head 是组件，这里的 catogery（类型）也是组件。

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170104213547675-1774850408.png)

然后，使用`react-swipe`插件来将上面的三个 list 做成轮播图

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170104213538862-449163421.png)

然后，显示广告。广告就是显示几个带连接的图片而已，虽然简单，却接触了一个新的概念（之前也介绍过了）————subpage，先创建 subpage 然后再在 subpage 获取数据，并将数据传递到组件中，最终将广告显示出来。

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170104213555097-667714821.png)

接下来是列表，实现稍微复杂。列表和广告的实现方式一样，先创建一个 subpage 获取数据，然后将数据传递给 List 组件，组件再显示出数据。

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170104213603034-1537493574.png)

组件中还可以再引用其他组件，来完善列表。

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170104213616206-334764318.png)

最后，稍微有点烧脑的“加载更多”，不过到时候细细解说，理解应该没问题。

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170104213625487-856122838.png)

## 介绍路由配置

打开`./app/router/routeMap.jsx`可以看到整个webapp的路由配置，目前在配置中，咱们只需要关心下面这几行代码。

```
import App from '../containers'
import Home from '../containers/Home'

<Router history={this.props.history}>
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        ……
    </Route>
</Router>
```

以上关键代码表达的意思有两点

- 进入系统的默认路由（即浏览器一访问`http://localhost:8080/`），默认渲染`Home`组件
- `Home`组件上层还有一个`App`组件作为其父组件

下面我们先从最完成的组件即`App`组件说起

## 最外层组件

打开`./app/containers/index.jsx`文件，将`render`按照如下代码编写，这里`{this.props.children}`直接渲染子组件。如果我们访问的是`http://localhost:8080/`，按照路由配置的规则，现在它的子组件就是`Home`，那么这里的`{this.props.children}`代表的就是`Home`。

如果此时`Home`中有一句`hello world`，就可以展示在页面中了

```
render() {
    return (
        <div>
            {this.props.children}
        </div>
    )
}
```

疑问来了：如果以上这种写法，干嘛还要这个外层的父组件，多此一举毫无用处————那自然不是这样的。举一个最简单的例子，如果每个页面都需要一些公共的顶部和尾部，就可以这样写：

```
render() {
    return (
        <div>
            <Head/>
            {this.props.children}
            <Footer/>
        </div>
    )
}
```

还有我们项目中要用到的，加载数据时过程中显示 loading... 加载完再显示子组件内容，即可这样写：

```
render() {
    return (
        <div>
            {
                this.state.initDone
                ? this.props.children
                : <div>正在加载...</div>
            }
        </div>
    )
}
```

接下来，我们按照项目的思路，把这个文件写完。其中会用到 Redux 的一些知识，还不熟悉的同学，去看一下之前的教程。

## Head 组件

想一下 Head 组件的功能，左侧显示一个城市（后面还有链接功能），中间一个输入框，可以跳转到搜索框，右侧一个图标，点击链接到个人主页

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170104213529112-45163901.png)

接下来请思考一个问题：这个 Head 本身有没有涉及到和后端数据的交互？———— 答案是没有。干嘛问这个问题？———— 请思考之前讲过的**智能组件**和**木偶组件**。涉及不到后端数据交互的，统统都是木偶组件，因此这个 Head 也是木偶组件。它应该放在`./app/components`里面。

创建`./app/components/HomeHeader`组件，然后引用到`Home`页面中，先简单显示一个**`Head`**，证明组件已经被引用且起作用

然后，根据需求，加上各个功能并显示数据。即左侧的城市、中间的输入框、右侧的图标。此处省略 N 行代码，大家看着我写就行

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170104213522503-1001536058.png)
这里，需要补充一个 css3 的字体图标的知识。

------------------- 分割线-开始 -------------------

这项知识我们之前一直没讲过，因为单独拿出来讲的话内容比较少，而且放在哪一个章节都不合适。因此就计划，什么时候用到它什么时候再讲。

其实在`webpack.config.js`中有一句相关的配置（代码如下）：

```
    module: {
        loaders: [
            { test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, loader:'url-loader?limit=5000'} // 限制大小小于5k
        ]
    },
```

**使用字体图标的好处**

建议大家在以后的项目开发过程中，但凡遇到页面中使用小图标的地方，尽量使用字体图标，而不要再用 css 背景图片的那种方式了。除非有特殊环境要求。

- 能像文字一样，用 css 的`font-size`和`color`来控制大小和颜色，而且是适量放大的。如果你用 css 背景图片，想修改颜色和大小还是劳烦设计的同事协助，好费劲
- 目前开源字体图标库中，常用的图标都能找到，直接拿来就用。不用再找设计的同事裁图、切图…… 除非有特殊定制需求
- 资源足够小，无需担心性能
- 浏览器支持已经足够全面，特别是移动端浏览器


**Font Awesome**

css3支持自定义字体图标，开源社区中比较有名气的算是[Font Awesome](http://fontawesome.io/)，如果没听过或者只知道没用过，一定要再看到这个视频的近期去恶补一下。作为一名前端工程师，没用过 font-awesome（或者类似的插件）并不是一件多光彩的事儿。

Font Awesome 会一次性全部给你提供好几百个图标，供你选择使用。但是我们做项目时，根本用不了那么多图标，只用十几个就够了，加载过多会影响性能。接着往下看……

**icomoon**

[icomoon](https://icomoon.io/app/)是一个字体图标生成器网站，在这里面你可以任意选择你需要的图标，并且打包下载。而且，如果觉得它默认提供的图标不够丰富，还可以添加其他图标库，有些免费有些收费，fontAwesome就在其中。该网站相对于直接用 Font Awesome 的特点是————你用几个就打包几个，用不到的不要管，这样就最大限度的缩小了网页需要加载的字体文件。

至于下载下来之后如何使用，和 Font Awesome 一样（都是一样的东西，来源不一样而已）这里就不在赘述了。

------------------- 分割线-结束 -------------------

最后，我们为 Head 组件写一段 less（即 css）代码来做一下样式的美化。美化之后就是这个效果

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170104213529112-45163901.png)

## 类型（轮播图）

这里轮播图，其内容其实是商户的各个类型，而且这些类型比较固定，因此我们这里不让它涉及过多的数据交互，这些类型都暂时写死到代码中。这样做也是为了更加精确的将当前教学内容定位到轮播图的讲解上，不让其他关系不大的内容分心太多。因此，就将轮播图做成一个组件。

在`./app/components`下创建`Category`文件夹，存放轮播图组件的代码。

要做轮播图，需要用到`react-swipe`这个插件，去 https://github.com/voronianski/react-swipe 查看文档，根据文档提示需要`npm install swipe-js-iso whatwg-fetch --save`。

这部分的开发分为以下步骤，大家跟着我的节奏专心看我讲解即可：

- 先不要管类型数据如何，咱们先使用`react-swipe`做一个最简单的轮播图，先让轮播图动起来，并且能控制滚动的间隔时间。
- 然后，再在轮播图下面，加上一个轮播图滚动时 index 标识，即下面的“小圆点儿”，跟着我的代码看即可
- 轮播图出来之后，我们再把正式的类型加到轮播图中，并加上样式（**为了节省大家的时间，html和css代码就不一行一行写了**）

## 超值特惠（广告）

上面做的 HomeHeader 和 Category 都是创建在`./app/components`中，即木偶组件，因为不涉及到数据交互。而这里的广告，我们特意安排它需要后台数据。之所以说“特意安排”，就是要尽量在首页开发过程中展示各个需要学习的场景，不能只讲一种场景而忽略全面学习。

在开始做前端代码之前，先看一下后端的接口。终端运行`npm run mock`之后，就会启动后端接口，然后访问`http://localhost:3000/api/homead`就能返回一个JSON格式字符串，这就是广告的数据源。

到这里请大家回忆一下之前讲解`fetch`使用的基础知识，如果说到`fetch`你一下子想不起来的话，请立刻回到之前的课程去重温。有印象的同学跟着我看`./app/fetch/home/home.js`这个文件，找到获取广告数据的函数。

```
export function getAdData() {
    const result = get('/api/homead')
    return result
}
```

打开`package.json`可以看到`npm run mock`背后真正的命令，即`node --harmony ./mock/server.js`，这里可以看出后端代码在`./mock`目录下。这里使用了`koa`做了几个非常简单的后端接口，非常简单——只有配置路由、返回一些静态的JSON数据而已。

由于本课程是 React.js 的前端课程，主要面向的前端工程师。因此这里的`koa`和后端服务，就不作为重点来讲解了。如果想要学习，可以去网上找各种资料，入门很简单。

接下来回到前端。

创建`./app/containers/Home/subpage`，然后在其中创建`Ad.jsx`文件，并初始化一个基本的 React 组件的代码。然后，在渲染结束时，获取广告的数据。至此，该子页面的任务就完成一半儿了。

获取了数据，还要展示数据。展示数据，就得放在木偶组件中来做。创建`./app/components/HomeAd`组件，引入到`Ad.jsx`中，然后将广告数据传递到`HomeAd`组件中取展示。

先跟着我一起写一个大概的代码结构，最后**为了节约时间，不在琐碎的事儿上浪费功夫**，我们将之前写好的代码还原回来。

## 猜你喜欢（列表）

和上面的广告一样，这块也要做一个子页面，在`./app/containers/Home/subpage`中创建`List.jsx`文件，并初始化一个基本的 React 组件的代码。（**注意，`List.jsx`还引用了同目录下`style.less`的一点样式，别丢下**）

开始之前，先交代一下后端数据的接口。打开`./app/fetch/home/home.js`，找到获取列表数据的函数

```
export function getListData(city, page) {
    const result = get('/api/homelist/' + encodeURIComponent(city) + '/' + page)
    return result
}
```

访问`http://localhost:3000/api/homelist/%E5%8C%97%E4%BA%AC/1`即可得到`北京`第`1`页的数据。同理，其他城市的其他页的数据，可以通过修改 url 来获得。

*注意，可能不同城市、不同页码获取的数据都一样，这是因为后端数据只有一份，是静态的。看一下后端的 log 即可知道，后端已经拿到前端传递的参数了。*

像广告子页面一样，`List.jsx`获取当前城市的第`1`页数据，然后将数据传递到一个组件中来展示。这个组件要新创建，即`./app/components/List`组件。在`List`组件中先简单展示一下列表的标题。

列表中的每一项展示的样子都是一样的，凡是一样的东西，都可以抽象出一个组件来，因此创建`./app/components/List/Item`组件，让`Item`组件来承担列表中每一下数据的展示。因此，`Item`组件需要引用到`List`组件中，然后`List`组件将每一项的数据传递给`Item`组件，并展示出来。

## 加载更多

“加载更多”这个功能有点烧脑，如果之前没做过，一开始接触的话可能会感觉比较绕。不过我会尽量慢一点，代码一行一行的演示。

首先，我们需要准备 3 个状态

```
this.state = {
    data: [], // 存储数据，上面的代码中已经使用了
    hasMore: false, // 记录当前状态下，是否还有更多数据，这个需要后端返回。true 即还有，false 即没了
    isLoadingMore: false, // 记录当前状态下，是否正在加载中。true 即正在加载中，false 即不是加载中状态
    page: 1 // 记录下一页的页码，首页的页码是 0
}
```

然后，还需要加一个`loadMoreData`的方法，即在点击“加载更多”时会触发的方法。加载首页数据和加载更多数据，这两个函数可以提取一些公共代码，具体的写法可以是

```
loadFirstPageData() {
    // 加载首页数据，result

    // 处理数据
    this.resultHandle(result)
}

loadMoreData() {
    // 加载下一页的数据，result

    // 处理
    this.resultHandle(result)
}

resultHandle() {
    // 解析数据，更改 state
}

```

以上都是在引入`LoadMore`组件（该组件后面会教大家创建，现在还没创建）之前需要做的准备工作，那么这些准备工作该怎么用到`LoadMore`组件中呢？通过以下代码来体会一下。

```
{
    this.state.hasMore
    ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
}
```

总结一下以上的准备数据在`LoadMore`组件中的应用：

- `hasMore`控制组件的显示和隐藏
- `isLoadingMore`控制组件是显示“加载中...”（此时点击失效）还是“点击加载更多”
- `loadMoreData`函数会在点击组件时触发，并加载下一页数据
- `page`记录下一页的页码，会在`loadMoreData`函数中使用并累加

接下来在`./app/components/`中创建`LoadMore`组件，并用上上面传递过来的数据。经过上面的准备，该组件将变得非常简单。通过代码一解释，就会非常明白。

```
render() {
    return (
        <div className="load-more" ref="wrapper">
            {
                this.props.isLoadingMore
                ? <span>加载中...</span>
                : <span onClick={this.loadMoreHandle.bind(this)}>点击加载更多</span>
            }
        </div>
    )
}
loadMoreHandle() {
    this.props.loadMoreFn()
}
```

上面只是实现了点击加载更多，我们还要实现上拉加载这种效果。上面代码中有`ref="wrapper"`，将会用到。

实现思路是：监控 window 的`scroll`方法，然后获取`ref="wrapper"`的DOM，利用`getBoundingClientRect()`方法获得距离底部的高度，然后看是否触发 loadMore 方法。

说到`getBoundingClientRect`方法，让我想起了自己第一次接触这个函数，还是在看 zepto.js 的源码时……

最后，我们再花一小节的时间，把刚才制作加载更多的步骤再梳理一遍。
