/**
 * Created by tatsiana.dubrova on 17.08.2016.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
require('core-js');

module.exports = {
    context: path.join(__dirname,'imdb'),
    resolve: {
        modulesDirectories: ["node_modules", "scripts", "stylesheets"],
        extensions: ["", ".js", ".scss"]
    },
    entry: ["./scripts/app.js", "./stylesheets/app.scss"],
    output: {
        path: path.join(__dirname,'dist'),
        publicPath: '/dist/',
        filename: "bundle.js",
        sourceMapFilename: "[file].map"
    },
    devServer: {
        contentBase: ".",
        inline: true,
        watch: true,
    },
    devtool: "#inline-source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                presets: ["es2015"],
                query: {
                    optional: 'runtime',
                    nonStandard: 'false',
                },
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap=true&sourceMapContents=true')
            }
        ]
    },
    plugins: [new ExtractTextPlugin('styles.css')]
};