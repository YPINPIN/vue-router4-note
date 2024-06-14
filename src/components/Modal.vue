<script setup>
import { isModalOpen } from '@/utility/isModalOpen.js';

function btnClick() {
  isModalOpen.set(!isModalOpen.value);
}
</script>

<template>
  <div class="bg" :class="isModalOpen.value ? 'bg-open' : ''">
    <div class="btn" @click="btnClick">
      {{ isModalOpen.value ? '🗙' : '⏏' }}
    </div>
    <span>Modal</span>
  </div>
</template>

<style scoped>
.bg {
  position: fixed;
  z-index: 999;
  bottom: -20vh;
  left: 0;
  width: 100%;
  min-height: 20vh;
  background-color: darkolivegreen;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg.bg-open {
  bottom: 0;
}
.btn {
  --size: 30px;
  position: absolute;
  top: calc(-1 * var(--size));
  width: calc(2 * var(--size));
  height: var(--size);
  font-size: var(--size);
  line-height: var(--size);
  text-align: center;
  background-color: darkolivegreen;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;
  transition: font-size 0.3s ease;
}
.btn:hover {
  font-size: 35px;
}
.bg span {
  color: black;
  font-size: 50px;
}
</style>
