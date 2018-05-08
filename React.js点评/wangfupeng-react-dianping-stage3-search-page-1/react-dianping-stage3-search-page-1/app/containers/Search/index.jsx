import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <h1>Search</h1>
            </div>
        )
    }
    componentDidMount() {
        const params = this.props.params
        console.log('category param: ' + params.category)
        console.log('key param:' + params.keyword)
    }
}

export default Search