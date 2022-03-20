export default {
  port: 8080,
  wsPort: 3002, // websocket端口
  tokenMaxAge: 60 * 60 * 24 * 7, // 单位s
  env: process.env.NODE_ENV || 'development',
  webUrl: process.env.APP_HOST || 'http://localhost:8080', // 本服务域名
  issuer: 'http://localhost/',
  whiteUrl: [ // 前端请求白名单
    'http://localhost:3000',
    'http://0.0.0.0:3000'
  ]
}

