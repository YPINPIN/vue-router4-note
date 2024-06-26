<template>
  <div>
    <MainTitle
      title="Active links"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#active-links"
    />
    <section>
      <router-link to="/">Go to Home</router-link> |
      <router-link to="/about">Go to About</router-link> |
      <router-link to="/users/1">Go to User 1</router-link> |
      <router-link to="/users/2">Go to User 2</router-link> |
      <router-link to="/users/1/posts/1">Go to User 1 Post 1</router-link> |
      <router-link to="/users/1/posts/2">Go to User 1 Post 2</router-link> |
      <router-link to="/users/1/profile">Go to User 1 Profile</router-link> |
      <router-link to="/users/1/posts">Go to User 1 Posts</router-link> |
      <router-link to="/users/2/profile">Go to User 2 Profile</router-link> |
      <router-link to="/users/2/posts">Go to User 2 Posts</router-link> |
      <router-link to="/admin">Go to AdminOverview</router-link> |
      <router-link to="/admin/users">Go to AdminUserList</router-link> |
      <router-link to="/admin/users/1">Go to AdminUserDetails 1</router-link> |
      <router-link to="/home">Go to /home</router-link> |
      <router-link to="/search/book">Go to /search/book</router-link> |
      <router-link to="/info">Go to info</router-link> |
      <router-link to="/home2">Go to /home2</router-link> |
      <router-link to="/photo/2">Go to /photo/2</router-link> |
      <router-link to="/photo/6/detail">Go to /photo/6/detail</router-link> |
      <router-link to="/photo-12">Go to /photo-12</router-link> |
      <router-link to="/find?t=vue&c=book"
        >Go to /find?t=vue&c=book</router-link
      >
      |
      <router-link to="/find?t=ps5&c=game"
        >Go to /find?t=ps5&c=game</router-link
      >
    </section>
    <MainTitle
      title="精確的 active 連結 (Exact active links)"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E7%B2%BE%E7%A2%BA%E7%9A%84-active-%E9%80%A3%E7%B5%90-exact-active-links"
    />
    <section>
      <router-link to="/students/123">Go to /students/123</router-link>
      |
      <router-link to="/students/456">Go to /students/456</router-link>
    </section>
    <MainTitle
      title="配置 active class 名稱"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E9%85%8D%E7%BD%AE-active-class-%E5%90%8D%E7%A8%B1"
    />
    <section>
      <router-link
        to="/students/123"
        active-class="link-active-green"
        exact-active-class="link-exact-active-green"
        >Go to /students/123</router-link
      >
      |
      <router-link
        to="/students/456"
        active-class="link-active-green"
        exact-active-class="link-exact-active-green"
        >Go to /students/456</router-link
      >
    </section>
  </div>
</template>
