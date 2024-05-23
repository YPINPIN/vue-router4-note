<template>
  <h3>Students name: {{ $route.params.name }}</h3>
  <section class="wrapper">
    <div class="sidebar">
      <h3>Work Nav</h3>
      <router-link
        :to="`/students/${$route.params.name}/works/1`"
        active-class="link-active-green"
        exact-active-class="link-exact-active-green"
        >work 1</router-link
      >
      <router-link
        :to="`/students/${$route.params.name}/works/2`"
        active-class="link-active-green"
        exact-active-class="link-exact-active-green"
        >work 2</router-link
      >
    </div>
    <div class="content">
      <router-view />
    </div>
  </section>
</template>

<style scoped>
.wrapper {
  margin-top: 10px;
  display: flex;
  min-height: 20vh;
}
.sidebar {
  margin-right: 10px;
  padding: 10px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  padding: 10px;
  border: 1px solid black;
  background-color: lightseagreen;
}
</style>
