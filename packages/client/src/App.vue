<template>
  <div class="container">
    <div class="chat-box">
      <div class="chat-box_nav">
        <Nav></Nav>
      </div>
      <div>
        <Group @toDetail="toDetail"></Group>
      </div>
      <div class="chat-message_wrap" :class="{'chat-message_block': detailShow}" :style="{
        display: detailShow
          ?
            'block !important'
          : 
          isMobile() ? 'none' : 'block'
        }">
        <div class="chat-box_message">
          <Message @back="back"></Message>
          <Entry></Entry>
        </div>
        <!-- <img src="@/assets/images/icons/wechat-gray.png" alt=""> -->
      </div>
    </div>
    <img class="chat-background" src="@/assets/images/bcg.jpg" alt="im">
    <div class="tabbar-box">
      <Tabbar></Tabbar>
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  import Nav from './components/Nav.vue';
  import Group from './components/Group.vue';
  import Message from './components/Message.vue';
  import Entry from './components/Entry.vue';
  import Tabbar from './components/Tabbar.vue';
  import { isMobile } from './utils/index'
  export default defineComponent({
    components: { Tabbar, Nav, Group, Message, Entry },
    setup() {
      const detailShow = ref(false)
      const toDetail = () => {
        detailShow.value = !detailShow.value
      }
      const back = () => {
        detailShow.value = !detailShow.value
      }
      return {
        detailShow,
        isMobile,
        toDetail,
        back,
      }
    }
  })
</script>
<style lang="scss" scoped>
@import '@/assets/style/_variables.scss';
@import '@/assets/style/_mixin.scss';
.container {
  width: 100vw;
  height: 100vh;
}
.chat-box {
  @include flex;
  font-size: 16px;
  >div {
    height: 100%;
    &:nth-last-child(1) {
      flex: 1;
      @include flex;
      @include flex-direction;
    }
  }
  .chat-message_block {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
  
  @media screen and (min-width: $width-pc) {
    z-index: 999;
    max-width: 1000px;
    min-width: 300px;
    width: 100%;
    height: 80%;
    max-height: 800px;
    min-height: 470px;
    box-shadow: 10px 20px 80px rgb(0 0 0 / 80%);
    border-radius: 8px;
    overflow: hidden;
    @include absouteCenter;
  }
  @media screen and (max-width: $width-pc) {
    width: 100%;
    height: 100vh;
    .chat-box_nav, .chat-message_wrap, .chat-background {
      display: none !important;
    }
    :deep(.chat-group) {
      width: 100vw;
      height: 100vh;
      box-sizing: border-box;
      position: fixed;
      left: 0;
      top: 0;
    }
  }
}
.chat-box_message {
  width: 100%;
  height: 100%;
  @include flex;
  @include flex-direction;
  background: rgb(245,245,245);
  img {
    width: 120px;
  }
}
.chat-background {
  position: fixed;
  object-fit: cover;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
}

// h5
@media screen and (max-width: $width-pc) {
  .chat-background {
    display: none !important;
  }
}

// pc
@media screen and (min-width: $width-pc) {
  .tabbar-box {
    display: none !important;
  }
}
</style>
