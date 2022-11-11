module.exports = {
    entry: 'src/index.ts',
    doc: {
        themeConfig: {
            mode: 'dark'
        },
        base: '/tools'
    },
    // 制定输出文件
    file: 'dist',
    cjs: {
        type: 'babel',
        file: 'index',
        minify: false,
    },
    // esm: {
    //     type: 'babel',
    //     file: 'index',
    //     minify: false,
    // },
    autoprefixer: {
        browsers: [
            'ie>8',
            'Safari >= 6',
        ],
    },
}