<script setup>
import { ref } from 'vue';
const count = ref(0);
defineExpose({ count, name });
</script>

<template>
  <div class="wrapper">
    <h3>SlotComp 1</h3>
    <button @click="count++">You clicked me {{ count }} times.</button>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 10px;
  background-color: lightpink;
  min-height: 20vh;
}
</style>
