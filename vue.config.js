module.exports = {
    publicPath: './',
    pages: {
        index: {
          // page 的入口
          entry: 'example/main.js',
          // 模板来源
          template: 'public/index.html',
          // 输出文件名
          filename: 'index.html'
        }
    },
    css: {
        extract: false, // 是否使用css分离插件 ExtractTextPlugin 该参数不需要配置  测试环境默认为false 生成环境默认true
    },
    // 扩展 webpack 配置，使 packages 加入编译
    chainWebpack: config => {
        config.optimization.delete('splitChunks')
    },
    productionSourceMap: false
};
