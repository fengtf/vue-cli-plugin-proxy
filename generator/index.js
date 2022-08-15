const fs = require('fs');
const { FILE_NAME } = require('../config.js');

module.exports = (api) => {
  const path = api.resolve(FILE_NAME);
  if (fs.existsSync(path)) {
    api.exitLog(`文件（${FILE_NAME}）已存在，请勿重复创建！`);
  } else {
    api.render('./template');
    api.exitLog(`配置文件（${FILE_NAME}）已生成`);
  }
};
