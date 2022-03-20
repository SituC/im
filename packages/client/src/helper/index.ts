import { watch } from 'vue';
import { useStore } from 'vuex'

/**
 * @method 实时监控登录态帮助函数
 * @param loginCallback 登录后的回调
 * @param noLogincallback  未登录的回调
 */
export const keepAliveHelper = (loginCallback: Function, noLogincallback: Function) => {
  const store = useStore()

  watch(() => store.state.user, (user) => {
    if (user.id) {
      loginCallback()
    } else {
      noLogincallback()
    }
  })
}