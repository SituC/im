# im nestjs服务

## 已完成接口
- 登录jwt鉴权
- 用户创建
- 用户登录
- 退出登录
- 获取用户信息
- 创建群聊列表项
- 我的群聊列表

## 模块说明
> 基于src目录下的文件
- [bearer jwt验证文件](./src/bearer/defaultJwt.strategy.ts)
- [config 全局配置文件](./src/config/config.ts)
- [entity 全局数据库实体基类](./src/entity/base.entity.ts)
- [enums 全局http请求自定义状态](./src/enums/api-error-code.enum.ts)
- [env 环境变量配置模块](./src/env/env.ts)
- [exception http异常处理配置](./src/exception/api.exception.ts)
- [filters http请求返回处理](./src/filters/http-exception.filter.ts)
- [guards websocket jwt配置](./src/guards/WsJwtGuard.ts)
- [interceptors 接口请求成功拦截器](./src/interceptors/api.interceptor.ts)
- [logs 日志模块](./src/logs/index.ts)
- [modules api模块](./src/modules/index.module.ts)
- [utils 工具函数](./src/utils/index.ts)
- [ws websocket适配器](./src/ws/ws.adapter.ts)
- [app.modules.ts 全局依赖注入模块](./src/app.module.ts)
- [main.ts 全局入口模块](./src/main.ts)
## start
```bash
pnpm install --filter server

pnpm dev:server
```
