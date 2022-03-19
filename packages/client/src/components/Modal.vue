<!--
 * @file: 发送消息输入框
-->
<template>
  <teleport to='body'>
    <transition name="fade" mode="out-in">
      <div v-if="visible" class="chat-modal">
        <div class="mask" @click.stop="hide"></div>
        <div class="modal-content">
          <h3>{{ title }}</h3>
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, ref, ExtractPropTypes, PropType, StyleValue, ComponentPublicInstance, Ref } from 'vue';

const propsParams = {
  title: {
    type: String,
    require: false,
    default: '',
  },
  visible: {
    type: Boolean,
    require: true,
    default: false,
  }
}
type PropsParamsType = ExtractPropTypes<typeof propsParams>;

export default defineComponent({
  name: 'modal',
  props: propsParams,
  emits: ['hide'],
  setup(props: PropsParamsType, ctx) {
    const hide = () => {
      ctx.emit('hide')
    }
    return {
      hide
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/_variables.scss';
@import '@/assets/style/_mixin.scss';
@import '@/assets/style/_transition.scss';
.chat-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  .modal-content {
    padding: 20px;
    border-radius: 5px;
    z-index: 2;
    @include absouteCenter;
    h3 {
      font-size: 16px;
      position: relative;
      top: -10px;
    }
    // 移动端
    @media screen and (max-width: $width-pc) {
      background: #fff;
    }
    // pc
    @media screen and (min-width: $width-pc) {
      // width: 600px;
      // height: 350px;
      background: #fff;
      box-shadow: 0 0 10px 2px rgba(#000, 0.5);
    }
  }
}
</style>