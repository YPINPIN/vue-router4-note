<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <h2>Search page</h2>
  <hr />
  <p>Query: {{ route.query }}</p>
</template>
