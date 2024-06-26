<template>
  <div>
    <MainTitle
      title="動態參數路由-多個動態參數"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E5%A4%9A%E5%80%8B%E5%8B%95%E6%85%8B%E5%8F%83%E6%95%B8"
    />
    <section>
      <router-link to="/users/1/posts/1">Go to User 1 Post 1</router-link> |
      <router-link to="/users/1/posts/2">Go to User 1 Post 2</router-link>
    </section>
  </div>
</template>
