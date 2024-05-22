<script setup>
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';

const route = useRoute();

// 設置 canonical URL
useHead({
  link: () => [
    {
      rel: 'canonical',
      href: `${window.location.origin}/photo/${route.params.id}`,
    },
  ],
});
</script>

<template>
  <h3>PhotoDetail</h3>
  <p>photoId: {{ $route.params.id }}</p>
</template>
