<!--
 * @file: 发送消息输入框
-->
<template>
  <div class="chat-entry">
    <textarea></textarea>
    <div class="send-box">
      <div class="send">发送</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
export default defineComponent({

})
</script>

<style lang="scss" scoped>
@import '@/assets/style/_mixin.scss';
@import '@/assets/style/_variables.scss';
$color-content: rgb(245,245,245);
%halfborder {
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    @include halfBorder;
  }
}
.chat-entry {
  background: #fff;
  height: 200px;
  padding-top: 15px;
  padding-bottom: 10px;
  width: 100%;
  position: relative;
  @extend %halfborder;
  @include flex;
  @include flex-direction;
  textarea {
    border: none;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    flex: 1;
    padding: 0 15px;
    font-size: 16px;
    resize: none;
  }
  .send-box {
    width: 100%;
    @include flex(flex-end);
    .send {
      width: 65px;
      height: 28px;
      @include flex;
      @include flex-direction;
      font-size: 16px;
      border: 1px solid #d6d6d6;
      margin-right: 20px;
      background: $color-content;
      color: rgba(#000, 0.5);
      cursor: pointer;
      &:hover {
        background: $color-main;
        color: #fff;
      }
    }
  }
}
</style>>