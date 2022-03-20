<!--
 * @file: 左侧导航栏
-->
<template>
  <div class="chat-nav">
    <div class="chat-nav_tool">
      <div class="tool-top">
        <div class="tool-avatar" @click="loginModal">
          <Avatar v-if="user.id" :user="user"></Avatar>
          <img v-else src="@/assets/images/icons/login.png" alt="">
        </div>
        <img title="聊天室" src="@/assets/images/icons/wechat.png" alt="">
      </div>
      <div class="tool-bottom">
        <!-- <div class="menu-box">
          <img src="@/assets/images/icons/add2.png" @click="menuShow = true" alt="">
          <transition name="fade" mode="out-in" appear>
            <div v-if="menuShow">
              <div class="mask" @click="menuShow = false"></div>
              <div class="menu">
                <div>加入群聊</div>
                <div>创建群聊</div>
              </div>
            </div>
          </transition>
        </div> -->
        <img title="退出登录" v-if="user.id" @click.stop="loginout" src="@/assets/images/icons/logout.png" alt="">
      </div>
    </div>
    <Modal
      title="登录"
      :visible="modalVisible"
      @hide="modalVisible = false"
    >
      <div class="create-room">
        <input type="text" v-model="loginForm.username" placeholder="请输入昵称">
        <input type="text" v-model="loginForm.password" placeholder="请输入密码">
        <h4>tip: 未注册账号直接登录自动注册</h4>
        <div class="handle-box">
          <div class="btn normal" @click.stop="modalVisible = false">取消</div>
          <div class="btn primary" @click.stop="login">确定</div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex'
import Avatar from './Avatar.vue';
import config from '../config/index'
import Modal from './Modal.vue'
import { userinfoApi, loginApi, loginoutApi } from '../api/index'
import { ReigsterParams } from '../api/type'
import { awaitTo } from '../utils/index'
export default defineComponent({
  components: {
    Avatar, Modal
  },
  setup() {
    const store = useStore()
    const user = computed(() => {
      return store.state.user
    })
    const loginForm: ReigsterParams = reactive({
      username: '',
      password: ''
    })
    const menuShow = ref(false)
    const modalVisible = ref(false)

    // 打开登录弹窗
    const loginModal = () => {
      if (user.value.id) return
      modalVisible.value = !modalVisible.value
    }

    // 参数校验
    const validate = (params: ReigsterParams) => {
      if (!params.username || !params.password) {
        alert('请完善表单后再提交')
        return false
      } else {
        return true
      }
    }

    // 登录
    const login = async () => {
      if (!validate(loginForm)) return
      // 登录接口仅返回的token
      const [error, result] = await awaitTo(loginApi(loginForm))
      alert(result.data?.msg)
      // 设置token
      localStorage.setItem(config.tokenName, result.data.token)
      fetchUser()
      fetchGroupList()
      loginModal()
    }

    // 退出登录
    const loginout = async () => {
      const [error, result] = await awaitTo(loginoutApi())
      store.commit('clearUser')
      alert('已退出登录')
    }

    // 获取用户信息
    const fetchUser = async () => {
      const [userError, userCallback] = await awaitTo(userinfoApi())
      store.commit('setUser', userCallback.data)
    }

    // 获取群组列表
    const fetchGroupList = async () => {
      const [userError, userCallback] = await awaitTo(userinfoApi())
      console.log(userCallback)
    }
    return {
      user,
      menuShow,
      modalVisible,
      loginForm,
      loginModal,
      login,
      loginout,
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/_mixin.scss';
@import '@/assets/style/_variables.scss';
@import '@/assets/style/_transition.scss';

.chat-nav {
  width: 74px;
  height: 100%;
  background-color: rgba(0,0,0,.7);
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    overflow: hidden;
    // transform: scale(1.08);
    background-image: url('@/assets/images/bcg.jpg');
    // background-color: rgba(0,0,0,.7);
    filter: blur(4px);
    z-index: -1;
  }
  &_tool {
    padding: 10px 5px 10px;
    height: 98%;
    position: relative;
    @include flex(space-between);
    @include flex-direction;
    .tool-avatar {
      width: 55px;
      height: 55px;
      background: #fff;
      border-radius: 50%;
      margin-top: 20px;
      @include flex;
    }
    >div {
      @include flex;
      @include flex-direction;
    }
    img {
      width: 30px;
      height: 30px;
      margin-top: 15px;
      margin-bottom: 15px;
      cursor: pointer;
    }
  }
  .menu-box {
    position: relative;

    .menu {
      background: #fff;
      position: absolute;
      right: -110px;
      top: 0;
      // opacity: 0;
      border-radius: 5px;
      z-index: 2;
      >div {
        width: 100px;
        text-align: center;
        padding: 10px 0;
        cursor: pointer;
        &:hover {
          background: $color-main;
          color: #fff;
        }
        &:nth-child(1) {
          border-radius: 5px 5px 0 0;
        }
        &:nth-child(2) {
          border-radius: 0 0 5px 5px;
        }
      }
      &::before {
        content: '';
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-right: 7px solid #fff;
        position: absolute;
        left: -11px;
        top: 25px;
      }
    }
  }
}
.fade-enter {
  opacity: 1;
}
</style>
<style lang="scss">
@import '@/assets/style/_teleport.scss';
</style>

