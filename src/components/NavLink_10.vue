<template>
  <div>
    <MainTitle
      title="重新導向 redirect"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E9%87%8D%E6%96%B0%E5%B0%8E%E5%90%91-redirect"
    />
    <section>
      <router-link to="/">Go to Home</router-link> |
      <router-link to="/about">Go to About</router-link> |
      <router-link to="/home">Go to /home</router-link> |
      <router-link to="/search/book">Go to /search/book</router-link>
      <br />
      <span>相對路徑(不建議使用)：</span>
      <router-link to="/info">Go to info</router-link> |
      <router-link to="/admin/users">Go to AdminUserList</router-link> |
      <router-link to="/admin/users/1">Go to AdminUserDetails 1</router-link>
    </section>
    <MainTitle
      title="別名 alias"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E5%88%A5%E5%90%8D-alias"
    />
    <section>
      <router-link to="/home2">Go to /home2</router-link> |
      <router-link to="/photo/2">Go to /photo/2</router-link> |
      <router-link to="/photo/6/detail">Go to /photo/6/detail</router-link> |
      <router-link to="/photo-12">Go to /photo-12</router-link>
    </section>
  </div>
</template>
