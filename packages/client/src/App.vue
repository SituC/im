<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, ref } from 'vue';
  export default defineComponent({
    name: 'app'
  })
</script>
