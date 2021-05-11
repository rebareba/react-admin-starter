## 介绍

react + antd + mobx + js (typescript) 的参考开发模板

Git: http://gitlab.dtwave-inc.com/js/template/react-starter

### 分支介绍

- master  -------- 基础的js版本 dev为其开发版本
- ts      -------- 基础的ts版本
- admin   -------- 管理后台的基本模板 对接koa-user-center

## 目录结构

```
.
├── .eslintignore                     --- eslint忽略配置
├── .eslintrc.js                      --- eslint相关配置	
├── .gitignore                        --- git 忽略配置
├── .huskyrc                          --- git commit 的husky的配置
├── .prettierignore                   --- Prettier 忽略路径文件
├── .prettierrc.js                    --- Prettier 的配置
├── .vscode                           --- 编辑器配置
│   └── settings.json
├── README.md                         --- 使用手册
├── commitlint.config.js              --- git commit 的要求配置
├── config                            --- webpack 和 前端 配置文件目录
│   ├── conf.json                     --- 前端配置 动态生成  git不跟踪
│   ├── config.js                     --- 开发自定义配置替换default, git不跟踪
│   ├── config_default.js             --- 默认的开发配置
│   └── index.js
├── dist                              --- 打包出来的文件夹目录
│   ├── public
│   │   ├── antd
│   │   └── react
│   ├── react-starter
│   │   ├── 1.0.0
│   │   └── index.html
│   └── react-starter_1.0.0_public.tgz
├── package-lock.json
├── package.json                     --- npm包依赖项目配置 及 脚本命令
├── public                           --- 公共资源目录
│   ├── antd
│   │   └── 3.23.6
│   └── react
│       └── 16.10.2
├── scripts                          --- 常用脚本
│   ├── echo_view.js                 --- 输出ejs模板的json
│   ├── render-server.ejs            --- ejs模板
│   └── tar.js                       --- 创建压缩包脚本
├── src                              --- 项目代码
│   ├── assets                       --- 静态资源
│   │   ├── sprite-icon
│   │   └── svg
│   ├── common                       --- 通用工具的文件夹
│   │   ├── common.styl              --- 默认的样式
│   │   ├── constant.js              --- 常量配置， error_code和菜单页面路由组件配置
│   │   ├── flexbox.css              --- 默认的flex布局样式
│   │   ├── history.js               --- 路由
│   │   ├── request.js               --- ajax请求封装 基于axios
│   │   └── utils.jsx
│   ├── components                   --- 通用的组件目录
│   │   └── .gitkeep
│   ├── frame                        --- 框架组件页
│   │   ├── frame.jsx
│   │   ├── frame.styl
│   │   └── index.jsx
│   ├── index.jsx                    --- 前端入口
│   ├── io
│   │   ├── auth-apis.js             --- 会话相关接口配置
│   │   ├── auth-mock.json           --- mock配置 -mock.json结尾的
│   │   ├── global-store.js          --- 全局store, 会话和面包屑相关
│   │   ├── index.js                 --- io的封装 createIo方法
│   │   └── mock.json                --- mock文件 动态生成 git不跟踪
│   └── pages                        --- 页面集合目录
│       ├── about                    --- 具体页面
│       ├── home                     --- 登陆主页
│       ├── index.html               --- 对应入口文件index.jsx的html模板
│       └── login                    --- 登陆页
└── webpack.config.js                --- webpack配置
```
## 常用命令

-  **开发**

```
$ npm start
```


- **生产打包**

```ssh
$ npm run build
$ ls dist 
public       react-starter                  react-starter_0.1.0_public.tgz
```

打包会输出到 `dist/[package.name]/[package.version]` 下 
拷贝`public`和 ` react-starter`文件夹到Render-Server下部署 到到目录`/data/render-server/static`下


- **cdn部署打包**

配置config/config.js下对应的cdnPrefix的值

```ssh
npm run build-cdn
```


- **eslint验证**

```ssh
# 修复fix
$npm run fix
```

- **生产mock文件数据**

```
 所有： npm run build-mock mockAll 
  单个mock文件： npm run build-mock global
 单个mock接口：npm run build-mock global.login
```

## 新项目启动和服务器部署项目

### 新项目使用

参考 [交付项目应用层初始化流程](https://dtwave.yuque.com/dgdc/backend/start-up#m4ZHH)

大致这几个步骤：

- Git 上新建项目 （比如路径为 react-front）
- 推送模板代码到新建的项目

在react-start 项目目录下 `git push <远程主机名> <本地分支名>:<远程分支名>`

```ssh
➜ react-starter git:(master)$ git push ssh://git@gitlab.dtwave-inc.com:30001/js/template/react-front.git admin:master
...
remote: Resolving deltas: 100% (297/297), done.
To ssh://gitlab.dtwave-inc.com:30001/js/template/react-front.git
 * [new branch]      admin -> master

```

- 拉取项目

``` ssh
➜  React$ git clone ssh://git@gitlab.dtwave-inc.com:30001/js/template/react-front.git
Cloning into 'react-front'...
...
Resolving deltas: 100% (307/307), done.
➜  React$ cd react-front 
➜  react-front git:(master)$ ls
Makefile  README.md  commitlint.config.js config ...
```

- 修改项目的package.json的name和 对应的配置文件`config/config_default.js` 中的内容
- 打包部署到测试环境

TODO 后续开发出cli工具初始化项目

## 项目部署



```
$ npm run build
$ ls dist 
public                                 react-starter                  react-starter_0.1.0_public.tgz
$ ls dist/react-starter                                                        
1.0.0      index.html
```

这里build会自动拷贝出打包出来的html文件到`dist/react-starter` 作为模板文件， 在配置模板路径`viewPath: "react-starter/index.html"`

### 通过render-server部署

参考 [前端渲染服务](https://dtwave.yuque.com/dgdc/backend/render-server#4a532e14)

上传资源到render-server服务器的静态目录

```
$scp -r dist/react-starter deploy@192.168.90.68:/data/render-server/static

# 这个后续没有修改只需上传一次
$scp -r dist/public deploy@192.168.90.68:/data/render-server/static
```

或者上传压缩包react-starter_1.0.0_public.tgz 到服务器/data/render-server/static 下解压

Render-Server页面配置

测试环境 http://192.168.90.68:8888/render-server

admin = 123456

新建配置项

Render-Server 的页面渲染配置：

```
{
    "key": "react-starter",
    "name": "管理后台模板",
    "description": "对应koa-user-center的接口",
    "viewRender": [
        {
            "paths": [
                "/react-starter/(.*)",
                "/react-starter"
            ],
            "hosts": [],
            "plugins": [],
            "defaultData": {},
            "viewType": "path",
            "viewPath": "react-starter/index.html",
            "viewData": ""
        }
    ],
    "apiProxy": [
        {
            "methods": [],
            "paths": [
                "/react-starter/api/(.*)"
            ],
            "referers": [],
            "pathPrefix": "/react-starter/api",
            "prefixPath": "",
            "plugins": [],
            "backHost": "http://192.168.90.68:8881"
        }
    ]
}
```
页面渲染模板可以使用[EJS](https://github.com/tj/ejs)的模板字符串数据 设置 `viewType`为`data` 和 `viewData`为对应的模板字符串

模板文件在 `scripts/render-server.ejs` 可以根据这个参考打包出来的html进行修改 执行脚本`node scripts/echo_view.js` 可以转为字符串

``` ssh
$ node scripts/render-server.ejs
"<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n 。。。。</script>\n</body>\n</html>"
```

或把index.html

```
$ node scripts/render-server.ejs index
```

输出内容配置到render-server 的配置项

```
    "viewRender": [
        {
            "paths": [
                "/react-starter/(.*)",
                "/react-starter"
            ],
            "hosts": [],
            "plugins": [],
            "defaultData": {
              "title": "ejs的模板数据",
              "version": "1.0.0",
              "conf": {
                "debug": false
              }
            },
            "viewType": "data",
            "viewData": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n对应的字符串</script>\n</body>\n</html>"
        }
    ],
```

[EJS](https://github.com/tj/ejs)的基本使用

- 代码块 <% code %>
- 转义字符串输出 <%= code %>
- 不转义输出 <%- code %>

示例： 

```
<% if (user) { %>
    <h2><%= user.name %></h2>
<% } %>
```

### 通过Nginx部署

假设Nginx web目录在`/usr/share/nginx/web/`上传打包的静态文件到该目录下

```
$scp -r dist/react-starter deploy@192.168.90.68:/usr/share/nginx/web/

# 这个后续没有修改只需上传一次
$scp -r dist/public deploy@192.168.90.68:/usr/share/nginx/web/
```

nginx配置

```
server {
        listen       80;
        server_name  test.com;
        access_log  /opt/third/nginx/logs/vhosts/test.access.log main;

        location ^~ /api/ {
          proxy_redirect off;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          client_max_body_size 100M;
          proxy_buffering on;
          proxy_buffer_size          128k;
          proxy_buffers              4 256k;
          proxy_busy_buffers_size    256k;
          proxy_pass http://127.0.0.1:8881/api;
        }
        
        location / {
        	root /usr/share/nginx/web/
        	index index.html
        	try_files $uri $uri /react-starter/index.html =500;
        	
        }
}
```

## 开发配置说明

新建config/config.js内容使用config_default.js 修改会覆盖config_default.js的配置 具体配置@长风

```js
module.exports = {
  // 名称
  projectName: pkg.name,
  // npm run build-cdn 打包的 publicPath 路径
  cdnPrefix: `//cdn.dtwave.com/${pkg.name}/${pkg.version}/`,
  // npm run build 打包的 publicPath 路径
  versionPrefix: `/${pkg.name}/${pkg.version}/`,
  // devServer.port 开发端口
  port: 8880,
  // 接口匹配转发 devServer.proxy 这里后端服务target 一般配置render-server服务地址即可
  proxy: {
    "/react-starter/api/*": {
      target: `http://192.168.90.68:8888`,
      changeOrigin: true, // 支持跨域请求
      secure: true // 支持 https
    }
  },
  // 这个配置根据dev还是build动态生成config/conf.json中的数据，会被window.conf替换对应配置, 配置在utils.config输出
  conf: {
    dev: {
      // 路径统一前缀
      pathPrefix: "/react-starter",
      // 统一接口路径前缀 `${pathPrefix}${apiPrefix}`
      apiPrefix: "/api",
      // 是否打印utils.log的日志
      debug: true,
      // mock数据模拟请求延迟
      delay: 500,
      // 配置接口会使用mock的配置 auth = createIo(authApis, 'auth')第二个参数
      mock: {
        "auth.login": "success", // 对应io.auth的login方法
        "auth.loginInfo": "success",
        "auth.logout": "success",
        "data.list": "success"
      }
    },
    build: { // 打包部署最好不好mock数据 
      pathPrefix: "/react-starter",
      apiPrefix: "/api",
      debug: false, // utils.log 方法console日志不打印
    }
  }
};

```

## 常用功能

### 接口请求

#### 全局接口配置

接口在src/io 目录下统一配置: 示例`src/io/auth.js`,  并在 `src/io/index.js` 对应配置上

```js
// src/io/auth.js
// 用户登录相关接口配置
export default {
  loginInfo: {
    method: 'GET',
    url: '/login_info/:userId',
  },
}

// src/io/index.js

import authApis from './auth'


export const auth = createIo(authApis, 'auth') // 第二个参数对应mock的文件名auth.ts

// 使用 src/store/global-store.js

import {auth} from '../io';


async login() => {
  this.setState({
    loading: true,
  })
  // 不会抛出异常 所以不需要try catch
  const {success, content} = await auth.loginInfo({id: 1, ':userId': 2}); // GET 路由 /react-starter/api/login_info/2?id=1
  this.setState({
    loading: false,
  })
  if (!success) return
  this.setState({
    userInfo: content
  })
  // 默认处理success=false, 使用message.error(e.message)
}

```

 #### 页面下配置使用

```js
// src/pages/user/io.js
import {createIo} from '../../io'

const apis = {
  updateUser: {
    url: '/user/:userId',
    method: 'PUT',
    apiPrefix:'/api/v2'
  },
}
//mock文件名： xxx-mock.json
export default createIo(apis, 'xxx')

// src/pages/user/user.tsx
import io from './io'

async updateUser() => {
  const {success, content, message: msg} = await auth.updateUser({ // PUT 路由 /react-starter/api/v2/user/1?type=update
    rejectToData: true, // 为true 表示启用复杂配置方式， 可能简单调用刚好是业务参数会有问题 需要注意
    showError: false, // 是否直接弹出message 默认true，false需要自己处理
    // 指定 回调操作 下面是默认操作，传了这个参数会覆盖默认操作 ，默认处理未登录错误码
    action:(resData) => {
      if (resData.success === false && resData.code === 'ERROR_NEED_LOGIN') {
        // TODO 这里可能统一跳转到 也可以是弹窗点击跳转
        Modal.confirm({
          title: '重新登录',
          content: '',
          onOk: () => {
            // location.reload()
            history.push(`${config.pathPrefix}/login?redirect=${window.location.pathname}${window.location.search}`)
          },
        })
      }
    }
    headers: {}
    // 指定路由参数
    params: {
      ':userId': 1
    }
    query: {
      type: 'update'
    }
    // 指定body 可以是json字符串
    body: {
      name: 'new name',
      age: 20
    }
  }); 
  if (!success) { // 自定义错误处理
    message.error(msg)
    return
  }
  this.setState({
    userInfo: content
  })

}

```



请求封装改造 查看`src/io/index.js`和 `src/common/request.js` 中的方法， 比如修改默认的处理

### mock数据

`npm run dev/build` 会自动在`/src/io 目录下生成`mock.json`, 是根据src目录下所有以`-mock.json`结尾的文件合成

如存在 `auth-mock.json`

```
// src/pages/login/auth-mock.json
{
  "logout": {
    "success": {
      "success": true,
      "message": "",
      "code": 0,
      "content": {}
    },
    "failed": {
			"success": false,
			"message": "登出失败了",
			"code": 0,
			"content": {}
		}
  }
}
```

则生成的`/src/io/mock.json`内容为

```
{
	"auth": {
		"logout": {
			"success": {
				"success": true,
				"message": "",
				"code": 0,
				"content": {}
			},
			"failed": {
				"success": false,
				"message": "登出失败了",
				"code": 0,
				"content": {}
			}
		}
	}
}
```

```
// src/pages/login/io.js
import {createIo} from '../../io'

const apis = {
  logout: {
    method: 'POST',
    url: '/auth/logout',
  },
}
//mock文件名： auth-mock.json
export default createIo(apis, 'auth')
```



文件名称`auth-mock.json` 去除后缀`-mock.json` 和` io = createIo(apis, 'auth') ` 第二个参数auth对应, 创建的io调用的logout方法和要在配置文件mock项配置`auth.logout`开启对应。

这里有两种mock情况 `success` 和 `failed` 具体使用哪种和配置文件的配置对应 如

```js
// config.js
module.exports = {
  // 开发配置
  conf: {
    dev: {
      title: "管理后台模板",
      pathPrefix: "/admin",
      apiPrefix: "/api",
      debug: true,
      // 只有配置了mock的才会使用
      mock: {
        "auth.logout": "success" // 这里对应auth-mock.json的logout.success项, 也可以改为failed模拟请求失败
      }
    },
    // 打包配置
    build: {
      title: "管理后台模板",
      pathPrefix: "/admin",
      apiPrefix: "/api",
      debug: true,
      // 生产打包可以不配置任何mock
      mock: {}
    }
  }
};
```

修改config.js 一般需要重新启动服务才能生效， 也可以修改`config/conf.json`的配置，无需重启

```
{
	"title": "管理后台模板",
	"pathPrefix": "/admin",
	"apiPrefix": "/api",
	"debug": true,
	"delay": 500,
	"mock": {
		"auth.login": "failed"
	}
}
```

> 注意： 修改或配置mock数据文件-mock.json 不会实时同步到src/io/mock.json中 需要重启服务才能生效

### commit 规范

```js
<type>: <description>
```

格式说明：
`<type>`(必须)：代表某次提交的类型，所有的type类型如下

- `build`：修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
- `ci`：修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
- `docs`：文档更新，如README, CHANGELOG等
- `feat`：新增功能
- `fix`：修复bug
- `perf`：优化相关，如提升性能、体验等
- `refactor`：重构代码，既没有新增功能，也没有修复 bug
- `style`：不影响程序逻辑的代码修改(修改空白字符，格式缩进、补全缺失的分号等)
- `test`：新增测试用例或是更新现有测试
- `revert`：回滚某个更早之前的提交
- `chore`：其他类型，如改变构建流程、或者增加依赖库、工具等

`<description>`(必须)： 描述简要描述本次改动，概述就好了

示例

```
# 增加一个的导出功能
git commit -m "feat: 增加预测用户列表导出功能"

# 修改了翻页bug
git commit -m "fix: 修改了预测用户翻页bug"

# 优化某某功能
git commit -m "perf: 优化了预测用户接口响应太慢"

# 修改了xx处缺少分号问题
git commit -m "style: 修改xx处缺少分号问题"
```


### 常用组件介绍

目录`src/components` 下
通用组件推荐使用react hooks编写，组件尽量写成纯函数

```js
import React, { useState } from "react";

export default function  Button()  {
  const  [buttonText, setButtonText] =  useState("Click me,   please");

  function handleClick()  {
    return setButtonText("Thanks, been clicked!");
  }

  return  <button  onClick={handleClick}>{buttonText}</button>;
}
```



## 常用CDN

到CDN 下载第三方product的min文件到 src/pubic/xxx/version/xx.js
https://www.bootcdn.cn


