<!--
 * @file: 群组列表
-->
<template>
  <div class="chat-group">
    <!-- <h2>通讯录</h2> -->
    <div class="chat-search">
      <div class="search-box">
        <img src="@/assets/images/icons/search.png" alt="">
        <input type="text" placeholder="搜索群聊">
      </div>
      <div class="search" @click="modalVisible = true">
        <img title="创建群聊" src="@/assets/images/icons/add4.png" alt="">
      </div>
    </div>
    <div class="chat-group_list">
      <template v-for="item in 15" :key="item">
        <GroupItem @toDetail="toDetail"></GroupItem>
      </template>
    </div>
  </div>
  <Modal
    title="创建群聊"
    :visible="modalVisible"
    @hide="modalVisible = false"
  >
    <div class="create-room">
      <input type="text" placeholder="请输入群聊名称">
      <div class="handle-box">
        <div class="btn normal" @click.stop="modalVisible = false">取消</div>
        <div class="btn primary">确定</div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import GroupItem from './GroupItem.vue';
import Modal from './Modal.vue'
export default defineComponent({
  components: { GroupItem, Modal },
  setup(props, ctx) {
    const modalVisible = ref(false)
    const openModal = () => {

    }
    const toDetail = () => {
      ctx.emit('toDetail')
    }
    return {
      modalVisible,
      openModal,
      toDetail
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/_variables.scss';
@import '@/assets/style/_mixin.scss';
$bcg-color: rgb(229,229,229);
.chat-group {
  width: 260px;
  height: 100%;
  background: $bcg-color;
  border-right: $border;
  h2 {
    @include flex;
    font-size: 16px;
    padding: 8px 0;
    background: #fff;
    border-bottom: #d6d6d6;
  }
  &_list {
    height: calc(100% - 46px);
    @include flex(flex-start);
    @include flex-direction;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
    padding-bottom: calc(70px + #{$safeHeight});
  }
  .chat-search {
    background: #fff;
    height: 56.8px;
    padding: 0 5px;
    @include flex;
    gap: 5px;
    .search-box {
      @include flex(flex-start);
      color: #bfbfbf;
      position: relative;
      background: $bcg-color;
      border-radius: 5px;
      padding: 0 5px;
      flex: 1;
      img {
        width: 16px;
        height: 16px;
      }
      input {
        outline: none;
        border: none;
        background: transparent;
        font-size: 14px;
        flex: 1;
        @media screen and (min-width: $width-pc) {
          padding: 5px;
        }
        @media screen and (max-width: $width-pc) {
          padding: 10px;
        }
      }
    }
    // transform: scale();
    // &::after {
    //   @include halfBorder;
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    // }

    .search {
      width: 26px;
      height: 26px;
      border-radius: 5px;
      cursor: pointer;
      background: $bcg-color;
      @include flex;
      @include flex-direction;
      img {
        width: 18px;
        height: 18px;
      }
    }
  }

}
</style>
<style lang="scss">
@import '@/assets/style/_teleport.scss';
</style>