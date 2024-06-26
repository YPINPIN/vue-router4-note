<template>
  <div>
    <MainTitle
      title="省略嵌套父組件 (版本 4.1+)"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E7%9C%81%E7%95%A5%E5%B5%8C%E5%A5%97%E7%88%B6%E7%B5%84%E4%BB%B6-%E7%89%88%E6%9C%AC-41"
    />
    <section>
      <router-link to="/admin">Go to AdminOverview</router-link> |
      <router-link to="/admin/users">Go to AdminUserList</router-link> |
      <router-link to="/admin/users/1">Go to AdminUserDetails 1</router-link>
    </section>
  </div>
</template>
