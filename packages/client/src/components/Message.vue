<!--
 * @file: 消息窗口
-->
<template>
  <div class="chat-message-content">
    <div class="title-bar">
      <TitleBar @back="back" title="优秀前端程序员交流群优秀前端程序员交流群优秀前端程序员交流群优秀前端程序员交流群"></TitleBar>
    </div>
    <div class="room-name">
      <h2 class="name">优秀前端程序员交流群优秀前端程序员交流群优秀前端程序员交流群优秀前端程序员交流群</h2>
    </div>
    <div class="room-content">
      <template v-for="item in 10" :key="item">
        <MessageItem></MessageItem>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import MessageItem from './MessageItem.vue';
import TitleBar from './TitleBar.vue';
export default defineComponent({
  components: { MessageItem, TitleBar },
  emits: ['back'],
  setup(props, ctx) {
    const back = () => {
      console.log('back')
      ctx.emit('back')
    }
    return {
      back
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/_mixin.scss';
@import '@/assets/style/_variables.scss';
$color-content: rgb(245,245,245);
$bar-height: 56.8px;
%halfborder {
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    @include halfBorder;
  }
}
.chat-message-content {
  background: #fff;
  height: calc(100% - 200px - 10px - #{$safeHeight});
  width: 100%;
  // flex: 1;
  // @include flex;
  // @include flex-direction;
  .room-name {
    height: $bar-height;
    position: relative;
    padding: 0 20px;
    @include flex;
    @extend %halfborder;
    .name {
      font-weight: normal;
      font-size: 20px;
      width: 400px;
      @include ell;
    }
    @media screen and (max-width: $width-pc) {
      height: $bar-height;
      line-height: $bar-height;
      .name {
        font-size: 14px;
      }
    }
  }
  .room-content {
    height: calc(100% - #{$bar-height});
    width: 100%;
    flex: 1;
    position: relative;
    background: $color-content;
    overflow: auto;
  }
}
// h5
@media screen and (max-width: $width-pc) {
  .room-name {
    display: none !important;
  }
}

// pc
@media screen and (min-width: $width-pc) {
  .title-bar {
    display: none !important;
  }
}
</style>>