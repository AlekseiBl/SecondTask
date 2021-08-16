const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: './src/index.pug',
            filename: 'index.html',
            minify: false
          }),
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: './src/color&type.pug',
            filename: 'color&type.html',
            minify: false
          }),
          new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: './src/form-elements.pug',
            filename: 'form-elements.html',
            minify: false
          }),  
        //   new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: 'style.css',
        //     chunkFilename: '[id].css'
        //   }),
        new CleanWebpackPlugin(),
        // применять изменения только при горячей перезагрузке
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPugPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options:{
                    pretty:true,
                }
              },
            // изображения
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            // шрифты и SVG
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.scss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  //MiniCssExtractPlugin.loader,
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                //   {
                //     loader: 'sass-resources-loader',
                //     options: {
                //       // Provide path to the file with resources
                //       resources: './index.scss',
          
                //       // Or array of paths
                //     //   resources: [
                //     //     './path/to/vars.scss',
                //     //     './path/to/mixins.scss',
                //     //     './path/to/functions.scss'
                //     //   ]
                //     },
                //   },
                ],
              },
        ],
    },
}