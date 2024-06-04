<script setup>
import { ref } from 'vue';
const comp = ref(null);

function showCount() {
  console.log('current count: ', comp.value.count);
}
</script>

<template>
  <h2>SlotLayout Page</h2>
  <hr />
  <router-link to="/slot/one">Go to /slot/one</router-link> |
  <router-link to="/slot/two">Go to /slot/two</router-link> |
  <button @click="showCount">showCount</button>

  <router-view v-slot="{ Component }">
    <transition mode="out-in">
      <keep-alive>
        <component :is="Component" ref="comp" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
</style>
