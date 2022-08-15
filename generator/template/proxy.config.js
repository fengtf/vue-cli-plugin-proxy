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
};
