<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 跨越 history
function forward() {
  // 向前移動一條紀錄，與 router.forward() 相同
  router.go(1);
}
function back() {
  // 返回一條紀錄，與 router.back() 相同
  router.go(-1);
}
</script>

<template>
  <div>
    <MainTitle
      title="滾動行為 (Scroll Behavior)"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E6%BB%BE%E5%8B%95%E8%A1%8C%E7%82%BA-scroll-behavior"
    />
    <section>
      <router-link to="/">Go to Home</router-link> |
      <router-link to="/products2/1">Go to /products2/1</router-link> |
      <router-link to="/products2/2">Go to /products2/2</router-link> |
      <button @click="forward">forward</button> |
      <button @click="back">back</button> |
      <router-link to="/hashpage">Go to /hashpage</router-link>
    </section>
  </div>
</template>
