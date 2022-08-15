# vue-cli-plugin-proxy

## 说明

- 该插件方便管理代理域名，并且会根据环境自动切换要代理的环境域名，减少手动配置
- 降低 git 冲突频率
- 可以共用同一个 header，也可以单独使用 header
- 随时可关闭

## 安装

`yarn add @ziroom/vue-cli-plugin-proxy -D`

## 使用

**生成配置文件**

`vue invoke @ziroom/vue-cli-plugin-proxy`

此操作会在根目录下生成 proxy.config.js 文件

```js
module.exports = {
  // 是否开启代理
  open: true,
  // 设置header（共用同一个header）
  headers: {},
  // 设置根路径("/")代理
  proxyMain: {
    target: {
      development: '',
      stable: '',
      zprod: '',
      production: '',
    },
    // 优先级高于外层headers
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
      // 优先级高于外层headers
      headers: {},
    },
  },
};
```

> 提示：内层 `headers` 优先级大于外层 `headers`

**启动**

> 正常启动项目（yarn start）的同时，代理也会启动，如需关闭代理，请将 open 设置为 false
