const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production'
    return {
        entry: [
            "babel-polyfill",
            path.join(__dirname, './src/index.js')
        ],

        module: {
            rules: [
                // ES6转义
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },

                // 静态资源处理
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {}
                    }]
                },
                {
                    test: /\.css$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        // 'postcss-loader'
                    ]
                },
                // HTML复制压缩
                {
                    test: /\.html$/,
                    use: [{
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }]
                }

            ]
        },
        plugins: [
            // 打包前清理源文件目录
            new CleanWebpackPlugin(['dist']),

            new HtmlWebPackPlugin({
                template: "./src/index.html", // 模板文件名
                filename: "./index.html" // 输出文件名
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })

        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: false,
            port: 4000
        }
    }
}