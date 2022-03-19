<!--
 * @file: 移动端tab
-->
<template>
  <div class="chat-tabbar">
    <template v-for="(item, index) in tabbar" :key="index">
      <div>
        <img :src="item.icon" alt="">
        <span>{{ item.name }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import wechat from '../assets/images/icons/wechat.png';
import wechatEmpty from '../assets/images/icons/weixin_empty.png';
import login from '../assets/images/icons/login.png';
import logout from '../assets/images/icons/logout2.png';
interface Tabbar {
  name: string
  icon: string
  color: string
}
export default defineComponent({
  components: {
  },
  setup() {
    const tabbar: Tabbar[] = reactive([
      { name: '群聊', icon: wechat, color: '#129611' },
      { name: '退出', icon: login, color: '#515151' },
    ])
    return {
      tabbar
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/_mixin.scss';
@import '@/assets/style/_variables.scss';
.chat-tabbar {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: calc(60px + #{$safeHeight});
  background: #fff;
  @include flex;
  >div {
    flex: 1;
    @include flex;
    @include flex-direction;
    img {
      width: 32px;
    }
    span {
      font-size: 12px;
    }
  }
  &::before {
    @include halfBorder;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>