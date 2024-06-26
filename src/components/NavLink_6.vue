<template>
  <div>
    <MainTitle
      title="巢狀路由"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E5%B7%A2%E7%8B%80%E8%B7%AF%E7%94%B1"
    />
    <section>
      <router-link :to="{ name: 'User', params: { userId: '1' } }"
        >Go to User 1</router-link
      >
      |
      <router-link :to="{ name: 'User', params: { userId: '2' } }"
        >Go to User 2</router-link
      >
      |
      <router-link to="/users/1/profile">Go to User 1 Profile</router-link> |
      <router-link to="/users/1/posts">Go to User 1 Posts</router-link> |
      <router-link to="/users/2/profile">Go to User 2 Profile</router-link> |
      <router-link to="/users/2/posts">Go to User 2 Posts</router-link>
    </section>
  </div>
</template>
