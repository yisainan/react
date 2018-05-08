# fetch 获取/提交数据，以及开发环境下的数据 Mock

在 jQuery 开发时代，jQuery 已经为我们封装了非常优雅的 ajax 函数，并且针对各个浏览器都做了很好的兼容，非常棒。但是如果你用 React vue 或者 angular 去开发 webapp 时候，你还会再为了一个 ajax 去集成 jQuery 吗？这是一个问题。

另外一个问题，JavaScript 中的 ajax 很早之前就有一个诟病————复杂业务下的 callback 嵌套的问题。如果你对此了解不深刻，建议你去查一下“JavaScript promise”相关的资料。promise 正是 js 中解决这一问题的钥匙，并且作为标准在 ES6 中发布，接下来要介绍的 fetch 就用到了最新的 promise 

**[fetch](https://github.com/github/fetch)**就是一种可代替 ajax 获取/提交数据的技术，有些高级浏览器已经可以`window.fetch`使用了。相比于使用 jQuery.ajax 它轻量（只做这一件事），而且它原生支持 promise ，更加符合现在编程习惯。

## 安装

根据文档提示，用 npm 安装的话，执行`npm install whatwg-fetch --save`即可安装。为了兼容老版本浏览器，还需要安装`npm install es6-promise --save`。安装完成之后，注意看一下`package.json`中的变化。

## 基本使用

### get 的基本使用

参见`./app/fetch/test.js`源码，首先要引入依赖的插件

```js
import 'whatwg-fetch'
import 'es6-promise'
```

然后这样就可以发起一个 get 请求。这里的`fetch`是引用了插件之后即可用的方法，使用非常简单。方法的第一个参数是 url 第二个参数是配置信息。

```js
    var result = fetch('/api/1', {
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*'
        }
    });
```

以上代码的配置中，`credentials: 'include'`表示跨域请求是可以带cookie（fetch 跨域请求时默认不会带 cookie，需要时得手动指定 credentials: 'include'。这和 XHR 的 withCredentials 一样），`headers`可以设置 http 请求的头部信息。

接着说。

fetch 方法请求数据，返回的是一个 Promise 对象，接下来我们就可以这样用了——完全使用Promise的语法结构。

```js
    result.then(res => {
        return res.text()
    }).then(text => {
        console.log(text)
    })
```

或者这样用

```js
    result.then(res => {
        return res.json()
    }).then(json => {
        console.log(json)
    })
```

注意，以上两个用法中，只有`res.text()`和`res.json()`这里不一样————这两个方法就是将返回的 Response 数据转换成字符串或者JSON格式，这也是 js 中常用的两种格式。


### post 的基本使用

参见`./app/fetch/test.js`源码，首先要引入依赖的插件

```js
import 'whatwg-fetch'
import 'es6-promise'
```

然后用 fetch 发起一个 post 请求（有`method: 'POST'`），第一个参数是 url，第二个参数是配置信息。注意下面配置信息中的`headers`和`body`的格式。

```js
    var result = fetch('/api/post', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // 注意 post 时候参数的形式
        body: "a=100&b=200"
    });
```

fetch 提交数据之后，返回的结果也是一个 Promise 对象，跟 get 方法一样，因此处理方式也一样，上面刚描述了，因此不再赘述。


## 抽象`get`和`post`

如果每次获取数据，都向上面一样写好多代码，就太冗余了，我们这里将 get 和 post 两个方法单独抽象出来。参见`./app/fetch/get.js`和`./app/fetch/post.js`的源码。

需要注意的是，`post.js`中，将参数做了处理。因为上面的代码中提到，`body: "a=100&b=200"`这种参数格式是有要求的，而我们平时在 js 中使用最多的是 JSON 格式的数据，因此需要转换一下，让它更加易用。

这两个方法抽象之后，接下来我们再用，就变得相当简单了。参见 `./app/fetch/data.js`

```js
    // '/api/1' 获取字符串
    var result = get('/api/1')

    result.then(res => {
        return res.text()
    }).then(text => {
        console.log(text)
    })
```


## 数据 Mock

在目前互联网行业 web 产品开发中，前后端大部分都是分离开发的，前端开发过程中无法实时得到后端的数据。这种情况下，一般会使用三种方式：

- **模拟静态数据**：即按照既定的数据格式，自己提供一些静态的JSON数据，用相关工具（如[fis3](http://fis.baidu.com/fis3/docs/node-mock.html)）做接口来获取这些数据。该形式使用不比较简单的、只用 get 方法的场景，该项目不适用。
- **模拟动态接口**：即自己用一个 web 框架，按照既定的接口和数据结构的要求，自己模拟后端接口的功能，让前端项目能顺利跑起来。该方式适用于新开发的项目，后端和前端同时开发，适用于该教程的项目。
- **转发线上接口**：项目开发中，所有的接口直接用代理获取线上的数据，post 的数据也都直接提交到线上。该方式适用于成熟项目中，而该项目是新开发的，没有线上接口，不适用。

最后强调一下，该教程是一个前端教程，面向的是前端工程师，后端的开发和处理交给后端工程师来做。后端的业务处理和开发过程，不在本教程的讲解范围之内。

### 安装

这里我们使用目前比较流行的 [koa](http://koa.bootcss.com/) 来做后端接口的模拟。因此要先安装 koa 极其相关的插件。执行`npm install koa koa-body koa-router --save-dev`，注意这里使用`--save-dev`，意思是我们只在开发过程中使用 koa ，项目发布之后 koa 就没用了。因为发布之后的项目，使用的就是后端工程师开发的线上的接口，而不是我们基于 koa 写的接口。

注意，该教程重点关注前端和 React，对于 koa 我们只介绍用到的常用功能。想学习可以去官网或者找相关教程。

### 模拟接口

我们将模拟接口的代码都写在`./mock`目录下，接口文件是`./mock/server.js`（目前只有这一个文件，真正开发项目时，应该会分不同模块）。

然后在`./package.json`中增加如下代码，然后执行`npm run mock`即可启动模拟的接口服务。

```
  "scripts": {
    "mock": "node --harmony ./mock/server.js",
  },
```

启动之后，随便找一个 get 的接口，访问以下，例如`http://localhost:3000/api/1`

### 使用 webpack-dev-server 的代理

到这里你可能会有一个疑问————koa 接口的端口是`3000`，而我们项目的接口是`8080`，这样不就跨域了吗？————如果默认情况下，肯定是跨域了。此时就需要 webpack-dev-server 做一个代理的转发。配置代码在`./webpack.config.js`中

```js
    devServer: {
        proxy: {
          // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
          // koa 代码在 ./mock 目录中，启动命令为 npm run mock
          '/api': {
            target: 'http://localhost:3000',
            secure: false
          }
        },
        // ...省略若干代码...
    }
```

