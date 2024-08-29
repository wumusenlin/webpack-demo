const path = require('path');//node的路径模块
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 自定义文件资源的输出路径和命名
    // assetModuleFilename: 'images/[hash][ext][query]',
    clean: true, //清空输出目录（dist） 
  },
  // mode: 'production', // production development
  mode: 'development', // production development
  module: {
    rules: [
      // 处理css文件
      {
        test: /\.css$/i,
        use: [
          'style-loader', // 将js从css通过创建style样式放入到html文件中
          'css-loader', // 将css资源编译成commonjs的模块到js种
        ],
      },
      // 处理图片资源
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // 仅有'asset'才能选择是转换为dataURI还是静态资源?
        type: 'asset',// 'asset/resource' 'asset/inline'  'asset/source' 'asset'
        parser: {
          // 小于10kb转化为base64,
          // 优点：减少请求数量，缺点：增大bundle
          dataUrlCondition: {
            maxSize: 10 * 1024,
          }
        },
        generator: {
          // 输出名称
          // [hash:10]:取hash值前10位
          filename: "static/images/[hash:10][ext][query]"
        }
      },
      // 处理iconfont处理
      {
        test: /\.(ttf|woff2?)$/i,
        type: 'asset/resource',// 原file-loader
        generator: {
          // 输出名称
          // [hash:10]:取hash值前10位
          filename: "static/iconfont/[hash:10][ext][query]"
        }
      },
      // 处理js文件
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
    ],
  },
  //插件
  plugins: [
    // 生成html文件
    new HtmlWebpackPlugin({
      title: 'senlin-webpack-demo'
    }),
    new ESLintPlugin({
      // 需要通过eslint检查哪些文件
      context: path.resolve(__dirname, "src")
    }),
  ],
}