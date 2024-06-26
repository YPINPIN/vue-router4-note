<template>
  <div>
    <MainTitle
      title="導航守衛-針對單個路由的守衛"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E9%87%9D%E5%B0%8D%E5%96%AE%E5%80%8B%E8%B7%AF%E7%94%B1%E7%9A%84%E5%AE%88%E8%A1%9B"
    />
    <MainTitle
      title="導航守衛-組件內的守衛"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E7%B5%84%E4%BB%B6%E5%85%A7%E7%9A%84%E5%AE%88%E8%A1%9B"
    />
    <section>
      <router-link to="/">Go to Home</router-link> |
      <router-link to="/test/1">Go to /test/1</router-link> |
      <router-link to="/test/2">Go to /test/2</router-link> |
      <router-link to="/test/1?q=123">Go to /test/1?q=123</router-link> |
      <router-link to="/test/2#main">Go to /test/2#main</router-link>
    </section>
  </div>
</template>
