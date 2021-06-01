const pkg = require("../package.json");

module.exports = {
  // 名称
  projectName: pkg.name,
  version: pkg.version,
  // npm run build-cdn 打包的 publicPath 路径
  cdnPrefix: `//cdn.dtwave.com/${pkg.name}/${pkg.version}/`,
  // npm run build 打包的 publicPath 路径
  versionPrefix: `/${pkg.name}/${pkg.version}/`,
  port: 8880,
  // 接口匹配转发 devServer.proxy
  proxy: {
    "/api/*": {
      target: `http://192.168.90.160:8888`,
      changeOrigin: true, // 支持跨域请求
      secure: true,
    },
  },
  // webpack 打包忽略配置 要在index.html引入public资源
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  // 多入口情况的重定向
  rewrites: [
    // {
    //   from: /^\/admin/, to: '/admin.html'
    // },
  ],
  // 前端代码配置 动态生成config/conf.json中的数据， 也是index.html模板的数据
  conf: {
    dev: {
      title: "管理后台模板 React Admin Starter",
      name: "管理后台",
      pathPrefix: "/admin",
      apiPrefix: "/api",
      debug: true,
      mock: {
        "global.login": "success", // failed success
        "global.loginInfo": "success", // success failed
        "login.login": "success",
        "global.logout": "success",
      },
      // 指定public资源的域名 是否是cdn的资源
      publicHost:''
    },
    build: {
      title: "管理后台模板 React Admin Starter",
      name: "管理后台",
      pathPrefix: "/admin",
      apiPrefix: "/api",
      debug: false,
      // mock数据模拟延迟
      delay: 100,
      mock: {
        "global.login": "success",
        "global.loginInfo": "success",
        "global.logout": "success",
      },
      // 指定public资源的域名 是否是cdn的资源
      publicHost:''
    }
  }
};
