const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    entry:path.resolve(__dirname,'src/index.ts'),
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: "script/bundle.js"
    },
    module:{
        rules: [
            {
                test:/\.ts$/,
                use:{
                    loader:'ts-loader',
                    options:{
                        transpileOnly:true
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
}