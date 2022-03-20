import router from './index'
import config from '../config/index'
import { awaitTo } from '../utils/index'
import { userinfoApi } from '../api/index'
import store from '../store/'
router.beforeEach(async (to, from, next) => {
  let islogin = localStorage.getItem(config.tokenName)
  if(islogin){
    const [error, userCallback] = await awaitTo(userinfoApi())
    store.commit('setUser', userCallback.data)
    next();
  }else{
    next();
  }
  return false
})