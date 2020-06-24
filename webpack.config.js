//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DotenvPlugin = require('webpack-dotenv-plugin');
var path = require('path');
var SRC = path.resolve(__dirname, 'src/main/js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	entry: {
		home: './src/home.js',
	},
	output: {
		path: __dirname + '/public/js/',
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ['css-loader','postcss-loader','sass-loader']
//                    use: ['style-loader', 'css-loader', 'sass-loader']
				}),
			},
            {
                test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
			},
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '../images/',
                            publicPath: '../images/'

                        }
                    }
                ]
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader',
                query: {
                    name: '../audio/[name].[ext]'
                }
            }
        ]
    },
	plugins: [
//        extractPlugin
        new ExtractTextPlugin("../css/style.css"),
        new DotenvPlugin({
            sample: './.env.default',
            path: './.env'
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3001,
            proxy: 'http://localhost:3000/',
            files: ['./views/*.hbs']
        }),
        /*
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[name].css"
        })
        */
	],
	watch: true,
	devtool: 'source-map'
};
