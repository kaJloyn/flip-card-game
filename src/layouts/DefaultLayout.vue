<script setup>

</script>

<template>
  <div class="default-layout">
    <slot />
  </div>

</template>

<style scoped>
  .default-layout {
    width: 100vw;
    height: 100vh;
    background: #4b424f;
    overflow-x: hidden;
    overflow-y: hidden;
  }
</style>
