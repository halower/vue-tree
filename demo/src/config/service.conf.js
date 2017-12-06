/**
 *  服务配置项
 * @param baseURL 服务请求的根路径
 */
const projconf = {}

switch (process.env.NODE_ENV) {
  case 'development':
    projconf.init = { baseURL: '' } // 可追加其它初始化参数
    break
  case 'production': {
    projconf.init = { baseURL: '' } // 可追加其它初始化参数
    break
  }
  case 'test': {
    projconf.init = { baseURL: '' } // 可追加其它初始化参数
    break
  }
  default:
    break
}

export default projconf
