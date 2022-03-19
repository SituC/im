<!--
 * @file: 群消息列表项
-->
<template>
  <div class="chat-group_item" @click="toDetail">
    <img src="@/assets/images/avatar-group.jpeg" alt="">
    <div class="box">
      <div class="top">
        <div class="name">远大中央公园13栋远大中央公园13栋</div>
        <div class="date">昨天</div>
      </div>
      <div class="desc">路人：我每天都过来楼下楼下楼下我每天都过来楼下楼下楼下路人：我每天都过来楼下楼下楼下我每天都过来楼下楼下楼下</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const toDetail = () => {

    }
    return {
      toDetail
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/_mixin.scss';
@import '@/assets/style/_variables.scss';
$color-hover: rgb(211,209,209);
.chat-group_item {
  @include flex;
  padding: 10px 10px;
  width: 100%;
  box-sizing: border-box;
  cursor: default;
  &:hover {
    background: $color-hover;
  }
  img {
    width: 45px;
    height: 45px;
  }
  .box {
    flex: 1;
    padding-left: 10px;
    .top {
      @include flex(space-between);
      .name {
        width: 120px;
        color: $color-text;
        @include ell;
      }
      .date {
        flex: 1;
        padding-left: 5px;
        font-size: 12px;
        text-align: right;
        color: $color-text-light;
      }
    }
    .desc {
      color: $color-text;
      font-size: 13px;
      margin-top: 5px;
      width: 180px;
      @include ell;
    }
  }
}
</style>