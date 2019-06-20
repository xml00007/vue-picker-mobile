const env = process.env.NODE_ENV;
module.exports = {
    css: {
        extract: false, // 是否使用css分离插件 ExtractTextPlugin 该参数不需要配置  测试环境默认为false 生成环境默认true
    },
};
