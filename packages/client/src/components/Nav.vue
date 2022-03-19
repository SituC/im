<!--
 * @file: 左侧导航栏
-->
<template>
  <div class="chat-nav">
    <div class="chat-nav_tool">
      <div class="tool-top">
        <div class="tool-avatar">
          <Avatar></Avatar>
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
        <img title="退出登录" src="@/assets/images/icons/logout.png" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Avatar from './Avatar.vue';
export default defineComponent({
  components: {
    Avatar,
  },
  setup() {
    const menuShow = ref(false)
    return {
      menuShow
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
      margin-top: 20px;
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
</style>>
