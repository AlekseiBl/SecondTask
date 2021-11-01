const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const devMode = process.env.NODE_ENV.trim() !== "production";
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    
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
            //minify: false
        }),
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: './src/pages/color&type/color&type.pug',
            filename: 'color&type.html',
            //minify: false
        }),
        new HtmlWebpackPlugin({
          title: 'webpack Boilerplate',
          template: './src/pages/form-elements/form-elements.pug',
          filename: 'form-elements.html',
          //minify: false
        }),
        new HtmlWebpackPlugin({
          title: 'webpack Boilerplate',
          template: './src/pages/cards/cards.pug',
          filename: 'cards.html',
         // minify: false
        }),  
        new HtmlWebpackPlugin({
          title: 'webpack Boilerplate',
          template: './src/pages/headers&footers/headers&footers.pug',
          filename: 'headers&footers.html',
         // minify: false
        }),
        new HtmlWebpackPlugin({
          title: 'webpack Boilerplate',
          template: './src/pages/landing/landing.pug',
          filename: 'landing.html',
          //minify: false
        }),
        new HtmlWebpackPlugin({
          title: 'webpack Boilerplate',
          template: './src/pages/search-room/search-room.pug',
          filename: 'search-room.html',
         //minify: false
        }),
        new HtmlWebpackPlugin({
          title: 'webpack Boilerplate',
          template: './src/pages/room-details/room-details.pug',
          filename: 'room-details.html',
          //minify: false
        }),
        new HtmlWebpackPlugin({
          title: 'webpack Boilerplate',
          template: './src/pages/registration/registration.pug',
          filename: 'registration.html',
          //minify: false
        }),
        new HtmlWebpackPlugin({
          title: 'webpack Boilerplate',
          template: './src/pages/sign-in/sign-in.pug',
          filename: 'sign-in.html',
          //minify: false
        }),          
        new FaviconsWebpackPlugin({
          logo: './src/favicon2/favicon.png',          
        }),  
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPugPlugin(),
        new MiniCssExtractPlugin(),
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
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.(scss|css)$/i,
                use: [
                  devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                  "css-loader",
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
    optimization: {
      minimize: true,
      concatenateModules: true,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
      ],
    },
    
}