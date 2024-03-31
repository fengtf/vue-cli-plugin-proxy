module.exports = {
  // 是否开启代理
  open: true,
  // 设置header（共用同一个header）
  headers: {},
  mock: true,
  prod: false, //是否要代理线上
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
