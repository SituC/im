<!--
 * @file: 消息对话项
-->
<template>
  <div class="chat-message_tip">柠檬枯萎了 进入了聊天室</div>
  <div class="chat-message_item isme">
    <div class="message-avatar">
      <Avatar></Avatar>
    </div>
    <!-- 消息区域 -->
    <div class="message-user">
      <div class="user-name">柠檬熟了</div>
      <div class="user-text">不行，要综合考虑骑手的收入和送餐时间不行，要综合考虑骑手的收入和送餐时间不行，要综合考虑骑手的收入和送餐时间</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Avatar from './Avatar.vue';
export default defineComponent({
  components: { Avatar },
})
</script>
<style lang="scss" scoped>
@import '@/assets/style/_mixin.scss';
@import '@/assets/style/_variables.scss';
$avatarL: 10px;
.chat-message_tip {
  padding: 10px 25px;
  text-align: center;
  color: $color-text-light;
  font-size: 12px;
  max-width: 500px;
  @include ell;
  @include flex;
  margin: 10px auto;
  &::before, &::after {
    content: '';
    width: 100px;
    height: 1px;
    background: rgba(#d6d6d6, 0.5);
    margin: 0 10px;
  }
}
.chat-message_item {
  @include flex(flex-start, flex-start);
  padding: 10px 25px;
  .message-avatar {
    width: 35px;
    height: 35px;
    margin-right: $avatarL;
  }
  .message-user {
    @include flex(flex-start, flex-start);
    @include flex-direction;
  }
  .user-name {
    font-size: 13px;
    color: $color-text-light;
  }
  .user-text {
    max-width: 450px;
    display: inline-block;
    margin-top: 4px;
    padding: 6px;
    background-color: white;
    color: $color-text;
    font-size: 16px;
    border-radius: 5px;
    text-align: left;
    word-break: break-word;
    position: relative;
    &::before {
      content: '';
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-right: 7px solid #fff;
      position: absolute;
      left: -11px;
      top: 5px;
    }
  }
  &.isme {
    // @include flex(flex-end);
    @include flex-direction(row-reverse);
    .message-user {
      flex: 1;
      @include flex(flex-end, flex-end);
    }
    .message-avatar {
      margin-right: 0;
      margin-left: $avatarL;
    }
    .user-text {
      &::before {
        display: none;
      }
      &::after {
        content: '';
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-left: 7px solid #fff;
        position: absolute;
        right: -11px;
        top: 5px;
      }
    }
  }
}
</style>