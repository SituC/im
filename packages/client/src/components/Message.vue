<!--
 * @file: 消息窗口
-->
<template>
  <div class="chat-message-content">
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
export default defineComponent({
  components: { MessageItem }
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/_mixin.scss';
$color-content: rgb(245,245,245);
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
  height: calc(100% - 200px);
  width: 100%;
  // flex: 1;
  // @include flex;
  // @include flex-direction;
  .room-name {
    height: 72px;
    line-height: 72px;
    position: relative;
    padding: 0 20px;
    @extend %halfborder;
    .name {
      font-weight: normal;
      font-size: 20px;
      width: 400px;
      @include ell;
    }
  }
  .room-content {
    height: calc(100% - 72px);
    width: 100%;
    flex: 1;
    position: relative;
    background: $color-content;
    overflow: auto;
  }
}
</style>>