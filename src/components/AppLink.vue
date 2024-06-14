<script setup>
import { RouterLink } from 'vue-router';
import { computed } from 'vue';

// 關閉 Attributes 繼承
defineOptions({
  inheritAttrs: false,
});

// 新增設置 props
const props = defineProps({
  ...RouterLink.props,
  inactiveClass: String,
});

// 是否為外部連結
const isExternalLink = computed(() => {
  return typeof props.to == 'string' && props.to.startsWith('http');
});
</script>

<template>
  <a
    v-if="isExternalLink"
    v-bind="$attrs"
    :href="props.to"
    :class="inactiveClass"
    target="_blank"
    ><slot
  /></a>
  <router-link
    v-else
    v-bind="$props"
    custom
    v-slot="{
      // the resolved route object
      route,
      // the href to use in a link
      href,
      // boolean ref indicating if the link is active
      isActive,
      // boolean ref indicating if the link is exactly active
      isExactActive,
      // function to navigate to the link
      navigate,
    }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="[
        isActive ? activeClass : inactiveClass,
        isExactActive ? exactActiveClass : '',
      ]"
    >
      <slot />
    </a>
  </router-link>
</template>
