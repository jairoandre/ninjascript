var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

console.log("WEBPACK GO!");

var TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? 'production' : 'development';

var defaultConfig = {
	module: {
			resolve: {
	      modulesDirectories: ['src', 'node_modules'],
				root: [
					path.resolve(__dirname, 'node_modules'),
					path.resolve(__dirname, 'src')
				],
	      extensions: ['', '.js', '.scss']
	    },
      loaders: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          loader: 'babel'
        },
        {
          test: /\.less?$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader")
        }
      ]
    }
};


if (TARGET_ENV === 'development') {
  console.log('Serving locally...');

  var developmentConfig = {

    entry: [
        'webpack-dev-server/client?http://localhost:8080/',
        path.join(__dirname, 'src/index.js')
    ],

    output: {
      path: path.resolve(__dirname, 'dev/'),
      filename: 'development.js'
    },

    devServer: {
      inline: true,
      progress: true
    },

    plugins: [
			new CleanWebpackPlugin(['public']),
      new HtmlWebpackPlugin({
        title: 'NinjaScript - Development',
        template: './src/index.ejs',
        filename: './index.html'
      }),
      new ExtractTextPlugin("bundle.css")
    ]

  };

  module.exports = Object.assign({}, defaultConfig, developmentConfig);

}



if (TARGET_ENV === 'production') {
  console.log('Building for production...');

  var productionConfig = {

    entry: './src/index.js',

    output : {
      path: './public',
      filename: 'bundle.[hash].js'
    },

    plugins:
        [
					new HtmlWebpackPlugin({
            title: 'NinjaScript - Production',
            template: './src/index.ejs',
            filename: '../index.html'}),
          new ExtractTextPlugin("bundle.[hash].css")
        ]

  };

  module.exports = Object.assign({}, defaultConfig, productionConfig);

}
