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
        main: path.resolve(__dirname, './src/pages/index/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        assetModuleFilename: './assets/images/[name][ext]',
    },
    plugins: [
        
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: './src/pages/index/index.pug',
            filename: 'index.html',
            minify: false
          }),
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: './src/pages/color&type/color&type.pug',
            filename: 'color&type.html',
            minify: false
          }),
          new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: './src/pages/form-elements/form-elements.pug',
            filename: 'form-elements.html',
            minify: false
          }),
          new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: './src/pages/cards/cards.pug',
            filename: 'cards.html',
            minify: false
          }),  
          new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: './src/pages/headers&footers/headers&footers.pug',
            filename: 'headers&footers.html',
            minify: false
          }),
          new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: './src/pages/landing/landing.pug',
            filename: 'landing.html',
            minify: false
          }),
          new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: './src/pages/search-room/search-room.pug',
            filename: 'search-room.html',
            minify: false
          }),
          new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: './src/pages/room-details/room-details.pug',
            filename: 'room-details.html',
            minify: false
          }),
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
                test: /\.(scss|css)$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  //MiniCssExtractPlugin.loader,
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: './src/style/main.scss'
                        }
                    }               
                ],
              },
        ],
    },
}