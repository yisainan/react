const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const publicPath = '/';

module.exports = {
	entry: [
		'react-hot-loader/patch',
		path.resolve(__dirname, './src/index.js')
	],
	output: {
		path: path.resolve(__dirname, 'build'), //打包文件的输出路径
		filename: 'bundle.js', //打包文件名
		publicPath: publicPath,
	},
	devServer: {
		publicPath: publicPath,
		contentBase: path.resolve(__dirname, 'build'),
		inline: true,
		hot: true,	
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['env', 'react'],
					plugins: ["react-hot-loader/babel"]
				}
			},
			{
				test: /\.css/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html'
		}),
	],
	
}

