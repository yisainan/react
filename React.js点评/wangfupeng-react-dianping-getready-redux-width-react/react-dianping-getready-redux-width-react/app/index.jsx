import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import './static/css/common.less'

// 引用并执行 redux-demo
// import fn from './redux-demo.js'
// fn()

import Hello from './containers/Hello'

const store = configureStore()

render(
    <Provider store={store}>
        <Hello/>
    </Provider>,
    document.getElementById('root')
)
