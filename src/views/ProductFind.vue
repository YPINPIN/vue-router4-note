<script setup>
const props = defineProps({
  title: String,
  category: String,
  isFind: Boolean,
});
</script>

<template>
  <h3>ProductFind</h3>
  <p>props data: {{ props }}</p>
</template>
