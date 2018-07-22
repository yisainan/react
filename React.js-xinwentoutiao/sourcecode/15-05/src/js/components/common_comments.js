import React from 'react';
import {Row, Col} from 'antd';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router'
class CommonComments extends React.Component {
	constructor() {
		super();
		this.state = {
			comments: ''
		};
		handleSubmit() {};
		render() {
			let {getFieldProps} = this.props.form;
			return (
				<div class="comment">
					<Row>
						<Col span={24}>
							<Form onSubmit ={this.handleSubmit.bind(this)}>
								<FormItem label="您的评论">
									<Input type="textarea" placeholder="随便写" {...getFieldProps('remark',{initialValue: ''})}/>
								</FormItem>
								<Button type="primary" htmlType="submit">提交评论</Button>
							</Form>
						</Col>
					</Row>
				</div>
			);
		};
	}
}

export default CommonComments = Form.create({})(CommonComments);
