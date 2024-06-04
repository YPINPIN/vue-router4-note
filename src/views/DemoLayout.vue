<template>
  <h2>DemoLayout Page</h2>
  <hr />
  <router-link to="/transition-demo/1">Go to /transition-demo/1</router-link> |
  <router-link to="/transition-demo/2">Go to /transition-demo/2</router-link> |
  <router-link to="/transition-demo/3">Go to /transition-demo/3</router-link> |
  <router-link to="/transition-demo/4">Go to /transition-demo/4</router-link>

  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<style scoped>
/* fade */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
