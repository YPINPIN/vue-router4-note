<script setup>
import AppLink from '@/components/AppLink.vue';
</script>

<template>
  <AppLink
    v-bind="$attrs"
    class="custom-link"
    active-class="custom-link-active-green"
    exact-active-class="custom-link-exact-active-green"
    inactive-class="custom-link-inactive"
  >
    <slot />
  </AppLink>
</template>

<!-- 添加連結樣式 -->
<style>
/* 添加指定連結樣式 */
.custom-link {
  font-size: 30px;
  text-decoration: none;
  margin-right: 10px;
}
.custom-link:hover {
  text-decoration: underline;
}
.custom-link-active-green {
  color: orange;
}
.custom-link-exact-active-green {
  color: darkgoldenrod;
}
.custom-link-inactive {
  color: darkslategrey;
}
</style>
