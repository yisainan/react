import React from 'react'

class Header extends React.Component {
    render() {
        return (
             <p>{this.props.title}</p>
        )
    }
}

export default Header