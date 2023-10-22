const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './wwwroot/oeComponents/oe-components.js', 
    output: {
        filename: 'oe-components.js', 
        path: path.resolve(__dirname, 'wwwroot/dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['css-loader'],
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
            }
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'wwwroot/oeComponents/oe-components.css',
                    to: 'oe-components.css' 
                }
            ]
        })
    ],
};