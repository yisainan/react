import React from 'react'
import { render } from 'react-dom'

import './static/css/common.less'

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
