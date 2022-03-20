import { watch } from 'vue';
import { useStore } from 'vuex'

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