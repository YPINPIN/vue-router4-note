<script setup>
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();

onMounted(() => {
  console.log(`onMounted userId: ${route.params.userId}`);
});

onBeforeRouteUpdate((to, from) => {
  const userId = to.params.userId;
  console.log(`onBeforeRouteUpdate userId: ${userId}`);
});
</script>

<template>
  <h2>User page</h2>
  <hr />
  <p>UserId: {{ route.params.userId }}</p>
</template>
