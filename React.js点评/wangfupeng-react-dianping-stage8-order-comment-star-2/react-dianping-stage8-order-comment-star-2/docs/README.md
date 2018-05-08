# 订单评价的开发

源码 https://github.com/wangfupeng1988/react-simple-o2o-demo/tree/stage8-order-comment

## 最终效果

![](http://images2015.cnblogs.com/blog/138012/201701/138012-20170126173741831-976304841.png)

## 三个状态

一个简单的“评价”功能，就需要三个状态来管理

- 未评价：用户还没有评价，此时应该显示“评价”按钮，点击之后可以评价
- 评价中：用户点击了“评价”按钮，还未写完评价内容。此时“评价”按钮应该暂时隐藏掉
- 已评价：用户已经评价完成并提交了，此时应该显示“已评价”，并且不可点击

我们通过一个`state`来保存这三个状态

```
           {
                this.state.commentState === 0
                // 未评价
                ? <button className="btn" onClick={this.showComment.bind(this)}>评价</button>
                :
                    this.state.commentState === 1
                    // 评价中
                    ? ''
                    // 已经评价
                    : <button className="btn unseleted-btn">已评价</button>
            }
```

## 评价状态的来源

一个订单，最初显示的时候到底处于这三个状态中的哪一个？得有一个数据来源。这个来源就是后端接口返回的数据。在`Item`组件中，我们通过获取传递过来的状态信息，更新到`state`中，这就是来源。

```
    componentDidMount() {
        // 将状态维护到 state 中
        this.setState({
            commentState: this.props.data.commentState
        })
    }
```

## 显示和隐藏评价输入框

要评价就得让用户输入内容，输入内容就得有一个`<textarea>`。这个`<textarea>`的显示和隐藏，也需要评价状态的控制。

- 未评价：隐藏
- 评价中：显示
- 已评价：隐藏

```
{
    // “评价中”才会显示输入框
    this.state.commentState === 1
    ? <div className="comment-text-container">
        <textarea></textarea>
        <button onClick={this.submitComment.bind(this)}>提交</button>
        &nbsp;
        <button onClick={this.hideComment.bind(this)}>取消</button>
    </div>
    : ''
}
```

定义好规则之后，我们把评价按钮`<button onClick={this.showComment.bind(this)}>评价</button>`的点击事件写出来

```
    showComment() {
        // 显示输入框
        this.setState({
            commentState: 1
        })
    }
```

从功能角度看来，我们点击了“评价”按钮之后输入框就显示了。如果用 jquery 的开发方式，就需要在点击事件中操作 DOM 的显示和隐藏。而用 React 时，只需要将`state`修改即可，因为`state`能控制输入框的显示和隐藏。

此处再次理解 React 中这种**以数据驱动视图**的开发方式。

接下来，趁热打铁，再把取消按钮`<button onClick={this.hideComment.bind(this)}>取消</button>`的点击事件写出来

```
    hideComment() {
        // 隐藏输入框
        this.setState({
            commentState: 0
        })
    }
```

## 提交评价数据

从以上代码中跳出来，定位到`./app/fetch/user/orderlist.js`中，先定义提交数据的最底层接口

```
export function postComment(id, comment) {
    const result = post('/api/submitComment', {
        id: id,
        comment: comment
    })
    return result
}
```

这里我们终于用到了`POST`，此处详细看一下如何提交数据。

然后，将代码定位到子页面`./app/containers/User/subpage/OrderList.jsx`中，将刚才定义的接口引入进来，然后在子页面层创建提交数据的方法，并将提交数据的方法传递到组件中


```
<OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)}/>

submitComment(id, value, callback) {
    .....
}
```

这里为何将提交数据的方法定位到外面，再传递到组件中呢？————再去回顾**智能组件**和**木偶组件**的区别。

再然后，在组件中实现`<button onClick={this.showComment.bind(this)}>评价</button>`的点击事件

```
    submitComment() {
        // 获取操作函数
        const submitComment = this.props.submitComment
        // 获取id
        const id = this.props.data.id
        // 获取评价内容
        const commentText = this.refs.commentText
        const value = commentText.value.trim()
        if (!value) {
            return
        }

        // 执行数据提交
        submitComment(id, value, this.commentOk.bind(this))
    }
    commentOk() {
        // 已经评价，修改状态
        this.setState({
            commentState: 2
        })
    }
```

注意，要讲`this.commentOk.bind(this)`作为一个 callback 传递到 `submitComment`中，提交数据成功之后再回调。因此提交数据是一个异步的过程。

