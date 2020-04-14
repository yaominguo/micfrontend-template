let BASE_URL = ''

switch (process.env.NODE_ENV) {
case 'production': // 生产环境请求地址
  BASE_URL = ''
  break
default: // 默认（开发环境）请求地址
  BASE_URL = ''
}

export default {
  BASE_URL,
}
