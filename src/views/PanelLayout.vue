<template>
  <h2>PanelLayout Page</h2>
  <hr />
  <router-link to="/transition/left">Go to /transition/left</router-link> |
  <router-link to="/transition/right">Go to /transition/right</router-link> |
  <router-link to="/transition/other">Go to /transition/other</router-link>

  <router-view v-slot="{ Component, route }">
    <transition
      :name="route.meta.transition?.toString() || 'fade'"
      mode="out-in"
      appear
    >
      <component :is="Component" />
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

/* slide-left */
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-left-leave-to {
  opacity: 0;
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

/* slide-right */
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-right-leave-to {
  opacity: 0;
}
.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
</style>
