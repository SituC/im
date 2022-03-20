# im
nestjs + vue3实现im

>使用pnpm包管理工具，如果没有安装请使用以下命令安装
[pnpm 官方文档](https://pnpm.io/zh/motivation)
```bash
npm install pnpm -g
```

### client 项目使用vue3

[vue3 官方文档](https://v3.cn.vuejs.org/guide/installation.html)

[client 现有功能说明](./packages/client/README.md)

### server 项目使用nestjs，一个node框架

[nestjs 官方文档](https://docs.nestjs.cn/)

[nestjs websocket文档](https://docs.nestjs.cn/8/websockets)

[server 现有功能说明](./packages/server/README.md)

# 项目启动
```bash
# 安装所有依赖
pnpm install

# 启动client、server项目
pnpm run dev

# 也可以单独启动
pnpm run dev:client
pnpm run dev:server
```