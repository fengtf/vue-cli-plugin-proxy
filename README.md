# vue-cli-plugin-proxy

## 说明

- 该插件方便管理代理域名，并且会根据环境自动切换要代理的环境域名，减少手动配置
- 降低 git 冲突频率
- 可以共用同一个 header，也可以单独使用 header
- 一键开启/关闭 mock
- 可以对接 mock 平台，并对本地代码无侵入性

## 支持

- 任何 vue 项目&以 vue-cli 启动的项目
- uniapp 小程序以 h5 方式启动
- vue pc 项目

## 安装

`yarn add @fengtf/vue-cli-plugin-proxy -D`

## 使用

**生成配置文件**

`vue invoke @fengtf/vue-cli-plugin-proxy`

此操作会在根目录下生成 proxy.config.js 文件

```js
module.exports = {
  // 是否开启代理
  open: true,
  // 设置header（共用同一个header）
  headers: {},
  mock: true,
  // 设置根路径("/")代理
  proxyMain: {
    target: {
      development: '',
      stable: '',
      zprod: '',
      production: '',
    },
    headers: {},
  },
  // 设置其它路径代理
  proxyOther: {
    '/example': {
      target: {
        development: '',
        stable: '',
        zprod: '',
        production: '',
      },
      headers: {},
    },
  },
  // mock代理
  proxyMock: [
    {
      projectId: '', // 项目id
      projectBaseUrl: '', //项目基本路径
      paths: [], //需要代理的接口前缀
    },
  ],
};
```

> 提示：内层 `headers` 优先级大于外层 `headers`

**启动**

> 正常启动项目（yarn start）的同时，代理也会启动，如需关闭代理，请将 open 设置为 false

## 接入 mock 说明

**proxy.config.js**

```js
mock: true, //默认true，（ture: 启动mock; false:关闭mock）
proxyMock: [
  {
    projectId: '', // 项目id
    projecBaseUrl: '', //项目基本路径
    paths: [], //需要代理的接口前缀
  },
],
```

![imgage](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a00d858475884161ba24906685daa931~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2162&h=1578&s=321942&e=jpg&b=fefefe)

- projectId: 为项目 ID 上面的`Project ID`
- projecBaseUrl: mock 项目基础 url，为上面的 example
- paths: 为`string[]`字符串数组，存放接口路径

### 举例

```js
proxyMock: [
    {
      projectId: '62fb068766ad8a002bd76c43',
      projectBaseUrl: '/example',
      paths: ['/mock'],
    },
  ],

```

生成的 devserve 为

```js
devServer: {
    proxy: {
      '/mock': {
        target: 'http://xxxx.com/mock/62fb068766ad8a002bd76c43/example',
        changeOrigin: true
      }
    }
  },
```
