module.exports = {
    pages: {
        //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
        index: {
            //除了 entry 之外都是可选的
            entry: 'src/components/Picker.vue', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
            // template: 'public/index.html', // 模板来源
            // filename: 'index.html', // 在 dist/index.html 的输出
            // title: 'Index Page', // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
            // chunks: ['chunk-vendors', 'chunk-common', 'index'], // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
        },
    },
    css: {
        extract: false, // 是否使用css分离插件 ExtractTextPlugin 该参数不需要配置  测试环境默认为false 生成环境默认true
    },
};
