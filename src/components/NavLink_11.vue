<template>
  <div>
    <MainTitle
      title="傳遞 props 給路由組件"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E5%82%B3%E9%81%9E-props-%E7%B5%A6%E8%B7%AF%E7%94%B1%E7%B5%84%E4%BB%B6"
    />
    <section>
      <span>布林模式：</span>
      <router-link to="/products/1">Go to /products/1</router-link> |
      <router-link to="/products/2">Go to /products/2</router-link>
      <br />
      <span>布林模式-命名視圖：</span>
      <router-link to="/products2/1">Go to /products2/1</router-link> |
      <router-link to="/products2/2">Go to /products2/2</router-link>
      <br />
      <span>物件模式：</span>
      <router-link to="/products">Go to /products</router-link> |
      <router-link to="/products2">Go to /products2</router-link>
      <br />
      <span>函數模式：</span>
      <router-link to="/find?t=vue&c=book"
        >Go to /find?t=vue&c=book</router-link
      >
      |
      <router-link to="/find?t=ps5&c=game"
        >Go to /find?t=ps5&c=game</router-link
      >
    </section>
  </div>
</template>
