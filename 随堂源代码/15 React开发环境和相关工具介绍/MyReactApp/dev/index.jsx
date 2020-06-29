import React from "react";
import ReactDOM from "react-dom";

var HelloWorld = React.createClass({
	render: function() {
		return (
			<p>Hello, {this.props.showContent}</p>
			);
	}
});

ReactDOM.render(
	<div>
	    <HelloWorld showContent="IronMan"/>
	    <HelloWorld showContent="SuperMan"/>
	    <HelloWorld showContent="BatMan"/>
	</div>,
	document.querySelector("#container")
	);