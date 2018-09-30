import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
export default class MobileIndex extends React.Component {
	render() {
		return (
			<div>
				<MobileHeader></MobileHeader>
				<MobileFooter></MobileFooter>
			</div>
		);
	};
}
