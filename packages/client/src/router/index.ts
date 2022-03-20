import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // 指定路由模式
  history: createWebHashHistory(),
  // 路由地址
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: "/index",
      name: "index",
      component: () => import("../pages/index.vue"),
    },
  ]
})

export default router
