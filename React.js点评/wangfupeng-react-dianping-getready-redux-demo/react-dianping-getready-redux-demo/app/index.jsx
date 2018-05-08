import React from 'react'
import { render } from 'react-dom'

import './static/css/common.less'

// 引用并执行 redux-demo
// import fn from './redux-demo.js'
// fn()

class Hello extends React.Component {
    render() {
        return (
            <p>hello world</p>
        )
    }
}

render(
    <Hello/>,
    document.getElementById('root')
)
