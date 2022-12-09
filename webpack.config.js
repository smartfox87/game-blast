const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
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
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
			// {
			// 	test: /\.(png|jpg|gif)$/i,
			// 	use: [
			// 		{
			// 			loader: 'url-loader',
			// 			options: {
			// 				limit: false,
			// 			},
			// 		},
			// 	],
			// },
			// {
			// 	test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
			// 	use: {
			// 		loader: 'file-loader',
			// 		options: {
			// 			name: '[name].[ext]',
			// 			outputPath: 'fonts',
			// 			publicPath: '../fonts',
			// 		}
			// 	}
			// },
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Hot Module Replacement',
			template: 'src/index.html'
		}),
		new CopyPlugin({
			patterns: [
				{from: './src/assets/images', to: 'images'},
			]
		}),
	],
};