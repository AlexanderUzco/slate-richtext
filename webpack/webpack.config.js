const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry : './src/index.js',
	output : {
		path: path.resolve(__dirname,'../public'),
		filename: 'js/bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			},
			{ 
                test: /\.(js|jsx)$/, 
                exclude: /(node_modules|bower_components)/, 
                use: { 
                    loader: 'babel-loader', 
                    options: { 
                        presets: ["@babel/env", "@babel/preset-react"] 
                    } 
                } 
            },
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(jpg|png|gif|jpeg|jpg|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'img/',
							useRelativePath: true
						}
					}
				]
			},
		]
	},
	plugins: [		
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				collapseBooleanAttributes: true,
				removeComments:true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			}
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		})
	]
};