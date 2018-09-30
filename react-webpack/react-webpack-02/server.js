const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');


let config = require("./webpack.config.js");
let compiler = webpack(config);

config.entry.unshift(
	"webpack-dev-server/client?http://localhost:8080/", 
	'webpack/hot/dev-server',
	'react-hot-loader/patch');

let server = new WebpackDevServer(compiler, {
	contentBase: config.output.path,
	publicPath: config.output.publicPath,
    hot: true
});

server.listen(8080, 'localhost', () => {
	console.log('Starting server on http://localhost:8080');
});