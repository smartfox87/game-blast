const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		app: './src/index.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: 'assets/[name][ext][query]',
		clean: true,
	},
	// devtool: 'inline-source-map',
	devServer: {
		static: './dist',
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
						plugins: [
							'@babel/plugin-proposal-private-methods',
							'@babel/plugin-proposal-class-properties'
						]
					}
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(eot|woff|woff2|svg|ttf|otf)([\?]?.*)$/,
				type: 'asset/resource'
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: 'css/style.css',
		}),
		new CopyPlugin({
			patterns: [
				{from: './src/assets/images/items', to: 'assets/items'},
			]
		}),
	],
};