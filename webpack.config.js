//导入path模块
var path = require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin.js');

module.exports = {
    mode: 'development',

    entry: './src/main.js', //项目入口文件

    output: { //打包后的出口文件
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            },
            {
                test: /\.(jpg|jpeg|png|git|bmp)$/,
                use: [{
                    loader: 'url-loader',
                    // options: {
                    //     limit: 10000,
                    //     name: "[hash:8]-[name].[ext]"
                    // }
                }]
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: [{
                    loader: 'url-loader'
                }]
            },

            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test:/\.sass/,
                use: ['style-loader','css-loader','sass-loader']
            }
        ]
    },
    resolve: {
        alias: {
            "vue$": 'vue/dist/vue.js',
        }
    },
    plugins: [
        new VueLoaderPlugin() //实例化VueLoaderPlugin插件
    ],



}