<!--
 * @file: 头像区域
-->
<template>
  <div class="chat-avatar">
    <div class="avatar">{{ username }}</div>
  </div>
</template>

<script lang="ts">
import { computed, ExtractPropTypes, defineComponent, PropType } from 'vue';
import { User } from '../api/type'

const propsParams = {
  user: {
    type: Object as PropType<User>,
    default: () => ({
      username: ''
    }),
  },
}
type PropsParamsType = ExtractPropTypes<typeof propsParams>;
export default defineComponent({
  props: propsParams,
  setup(props: PropsParamsType) {
    const username = computed(() => {
      return props?.user?.username ? props?.user?.username[0]?.toUpperCase() : ''
    })
    return {
      username
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin.scss';
.chat-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  @include flex;
  font-size: 18px;
  font-weight: 600;
  overflow: hidden;
  position: relative;
  color: rgba(#000, 0.9);
  z-index: 1;
  &::after {
    position: absolute;
    left: 0;
    top: 0;
    @include pseudo('@/assets/images/avatar.jpeg', 100%, 100%);
    background-size: cover;
    filter: blur(2px);
    z-index: -1;
  }
}
</style>>