<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToUser3() {
  router.push({ name: 'User', params: { userId: '3' } });
}
</script>

<template>
  <div>
    <MainTitle
      title="命名路由"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E5%91%BD%E5%90%8D%E8%B7%AF%E7%94%B1"
    />
    <section>
      <router-link :to="{ name: 'User', params: { userId: '1' } }"
        >Go to User 1</router-link
      >
      |
      <router-link :to="{ name: 'User', params: { userId: '2' } }"
        >Go to User 2</router-link
      >
      |
      <button @click="goToUser3">Go to User 3</button>
    </section>
  </div>
</template>
