import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Modal} from 'antd';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {
	Tabs,
	message,
	Form,
	Input,
	Button,
	Checkbox,
	Card,
	notification,
	Upload
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import {Router, Route, Link, browserHistory} from 'react-router'
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
export default class PCUserCenter extends React.Component {
	render() {
		return (
			<div>
				<PCHeader/>
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
						<Tabs>
							<TabPane tab="我的收藏列表" key="1"></TabPane>
							<TabPane tab="我的评论列表" key="2"></TabPane>
							<TabPane tab="头像设置" key="3"></TabPane>
						</Tabs>
					</Col>
					<Col span={2}></Col>
				</Row>
				<PCFooter/>
			</div>
		);
	};
}
