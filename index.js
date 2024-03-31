const fs = require('fs');
const { FILE_NAME, MOCK_PATH } = require('./config');
const { version } = require('./package.json');

module.exports = (api) => {
  api.configureWebpack((config) => {
    const env = process.env.NODE_ENV;
    const proxyPath = api.resolve(FILE_NAME);
    const content = require(proxyPath);

    if (env === 'production' && !content.prod) return;

    console.log(`【proxy版本】:v${version}`);

    if (!fs.existsSync(proxyPath)) {
      console.log(
        `【proxy】:未找到${FILE_NAME}文件，请执行"vue invoke @ziroom/vue-cli-plugin-proxy"创建配置文件！`
      );
      return;
    }

    console.log('【proxy】:当前代理环境-', env);

    console.log(
      '【proxy】:文档地址-https://gitlab.ziroom.com/design-fe/vue-cli-plugin-proxy/blob/master/README.md'
    );

    // 是否可以执行代理
    if (
      (!content.proxyMain.target[env] &&
        !isHasMock(content.proxyMock) &&
        !isHasOtherProxy(content.proxyOther, env)) ||
      !content.open
    ) {
      console.log('【proxy】:无代理可用');
      return;
    }

    if (content.mock) {
      console.log('【proxy】:mock已启用');
    }

    // 生成mock代理
    const mockProxy = {};
    if (content.mock) {
      content.proxyMock.forEach((item) => {
        if (item.projectId && item.paths.length > 0) {
          item.paths.forEach((path) => {
            mockProxy[path] = {
              target: MOCK_PATH + item.projectId + item.projectBaseUrl,
              changeOrigin: true,
            };
          });
        }
      });
    }

    // 生成其它代理
    const otherProxy = {};
    for (key in content.proxyOther) {
      if (content.proxyOther[key].target[env]) {
        otherProxy[key] = {
          target: content.proxyOther[key].target[env],
          ...getCommonConfig(content, content.proxyOther[key]),
        };
      }
    }

    // 生成主代理
    const mainProxy = {};
    if (content.proxyMain.target[env]) {
      mainProxy['/'] = {
        target: content.proxyMain.target[env],
        ...getCommonConfig(content, content.proxyMain),
      };
    }

    // 配置devServer
    config.devServer = {
      proxy: {
        ...mockProxy,
        ...otherProxy,
        ...mainProxy,
      },
    };
    console.log('【proxy】:启动成功');
  });
};

// 是否有其它代理可合并
function isHasOtherProxy(proxy, env) {
  if (!proxy) return false;
  for (key in proxy) {
    if (proxy[key].target[env]) {
      return true;
    }
  }
  return false;
}

// 生成公共config
function getCommonConfig(content, proxy) {
  let headers = content.headers;
  if (proxy && proxy.headers && Object.keys(proxy.headers).length > 0) {
    headers = proxy.headers;
  }
  return {
    changeOrigin: true,
    onProxyReq: (req) => {
      if (headers && Object.keys(headers).length > 0) {
        for (let key in headers) {
          req.setHeader(key, headers[key]);
        }
      }
    },
  };
}

// 是否有moock数据
function isHasMock(proxyMock) {
  if (!proxyMock) return;
  return proxyMock.some((item) => item.projectId && item.paths.length > 0);
}
