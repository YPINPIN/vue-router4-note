<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <h2>UserOther</h2>
  <p>afterUser value: {{ route.params.afterUser }}</p>
</template>
