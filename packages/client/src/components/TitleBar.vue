<!--
 * @file: 标题栏
-->
<template>
  <div class="chat-title_bar">
    <img src="@/assets/images/icons/back.png" alt="" @click.stop="back">
    <div>
      <div class="content">{{ title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ExtractPropTypes, defineComponent, ref } from 'vue';
const propsParams = {
  title: {
    type: String,
    default: '',
  }
}
type PropsParams = ExtractPropTypes<typeof propsParams>;
export default defineComponent({
  props: propsParams,
  emits: ['back'],
  setup(props: PropsParams, ctx) {
    const back = () => {
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
.chat-title_bar {
  height: 56.8px;
  line-height: 56.8px !important;
  width: 100%;
  background: #fff;
  position: relative;
  @include flex(flex-start);
  img {
    height: 20px;
    padding: 0 15px;
    position: relative;
    z-index: 10;
    cursor: pointer;
  }
  >div {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    box-sizing: border-box;
    @include flex;
    .content {
      width: 70%;
      @include ell;
    }
  }
}
</style>>