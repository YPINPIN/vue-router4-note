<script setup>
import {
  isNavigationFailure,
  NavigationFailureType,
  useRoute,
  useRouter,
} from 'vue-router';
import { useHead } from '@unhead/vue';
import Loading from '@/components/Loading.vue';
import { loading } from '@/utility/loading.js';
import CustomLink from '@/components/CustomLink.vue';
import Modal from '@/components/Modal.vue';
import { isModalOpen } from '@/utility/isModalOpen.js';

const router = useRouter();
const route = useRoute();

// 設置 canonical URL
useHead({
  link: () => [
    {
      rel: 'canonical',
      href: `${window.location.origin}${route.path}`,
    },
  ],
});

function goToUser3() {
  router.push({ name: 'User', params: { userId: '3' } });
}

// 編程式導航
function goToUser4() {
  // 字串路徑
  router.push('/users/4');
}
function goToUser5() {
  // 帶有路徑 (path) 的物件
  router.push({ path: '/users/5' });
}
function goToUser6() {
  // 使用命名路由，並透過 params 添加參數
  router.push({ name: 'User', params: { userId: '6' } });
}
function goToAboutWithQuery() {
  // 透過 query 添加查詢參數，結果為 /about?plan=private
  router.push({ path: '/about', query: { plan: 'private' } });
}
function goToAboutWithHash() {
  // 帶 hash，結果為 /about#team
  router.push({ path: '/about', hash: '#team' });
}
// 替換當前位置
function goToHomeReplace() {
  // router.push({ path: '/', replace: true });
  // 相當於
  router.replace({ path: '/' });
}
// 跨越 history
function forward() {
  // 向前移動一條紀錄，與 router.forward() 相同
  router.go(1);
}
function back() {
  // 返回一條紀錄，與 router.back() 相同
  router.go(-1);
}
function goTo(n) {
  // 如果沒有那麼多的紀錄，會靜默失敗
  router.go(n);
}

// 檢測導航結果
async function goToPath(path) {
  const failure = await router.push(path);
  if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
    // 導航被阻止，給使用者顯示一個提示
    alert('Navigation Failure aborted');
    console.log(
      `Failure -- to: ${failure.to.path}, from: ${failure.from.path}`
    );
  } else if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
    // 導航重複
    alert('Navigation Failure duplicated');
  } else {
    // 導航成功關閉選單
    closeModal();
  }
}
function closeModal() {
  isModalOpen.set(false);
}
async function goToHome() {
  await router.push('/home');
  const redirectedFrom = router.currentRoute.value.redirectedFrom;
  if (redirectedFrom) {
    // redirectedFrom 是解析出的路由地址，就像導航守衛中的 to 和 from
    console.log('redirectedFrom: ', redirectedFrom);
  }
}
</script>

<template>
  <h1>Hello Vue Router4!</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>

  <nav>
    <router-link to="/">Go to Home</router-link> |
    <router-link to="/about">Go to About</router-link> |
    <router-link :to="{ name: 'User', params: { userId: '1' } }"
      >Go to User 1</router-link
    >
    |
    <router-link :to="{ name: 'User', params: { userId: '2' } }"
      >Go to User 2</router-link
    >
    |
    <button @click="goToUser3">Go to User 3</button> |
    <router-link to="/users/1/posts/1">Go to User 1 Post 1</router-link> |
    <router-link to="/users/1/posts/2">Go to User 1 Post 2</router-link> |
    <router-link to="/users/1/profile">Go to User 1 Profile</router-link> |
    <router-link to="/users/1/posts">Go to User 1 Posts</router-link> |
    <router-link to="/users/2/profile">Go to User 2 Profile</router-link> |
    <router-link to="/users/2/posts">Go to User 2 Posts</router-link> |
    <router-link to="/admin">Go to AdminOverview</router-link> |
    <router-link to="/admin/users">Go to AdminUserList</router-link> |
    <router-link to="/admin/users/1">Go to AdminUserDetails 1</router-link> |
    <router-link to="/settings">Go to Settings</router-link> |
    <router-link to="/home">Go to /home</router-link> |
    <router-link to="/home2">Go to /home2</router-link> |
    <router-link to="/search/book">Go to /search/book</router-link> |
    <router-link to="/info">Go to info</router-link> |
    <router-link to="/photo/2">Go to /photo/2</router-link> |
    <router-link to="/photo/6/detail">Go to /photo/6/detail</router-link> |
    <router-link to="/photo-12">Go to /photo-12</router-link> |
    <router-link to="/products/1">Go to /products/1</router-link> |
    <router-link to="/products/2">Go to /products/2</router-link> |
    <router-link to="/products2/1">Go to /products2/1</router-link> |
    <router-link to="/products2/2">Go to /products2/2</router-link> |
    <router-link to="/products">Go to /products</router-link> |
    <router-link to="/products2">Go to /products2</router-link> |
    <router-link to="/find?t=vue&c=book">Go to /find?t=vue&c=book</router-link>
    |
    <router-link to="/find?t=ps5&c=game">Go to /find?t=ps5&c=game</router-link>
    |
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
    |
    <router-link to="/login">Go to LoginPage</router-link> |
    <router-link to="/camera">Go to CameraPage</router-link>|
    <router-link to="/test/1">Go to /test/1</router-link> |
    <router-link to="/test/2">Go to /test/2</router-link> |
    <router-link to="/test/1?q=123">Go to /test/1?q=123</router-link> |
    <router-link to="/test/2#main">Go to /test/2#main</router-link> |
    <router-link to="/comments">Go to /comments</router-link> |
    <router-link to="/showpost/1">Go to /showpost/1</router-link> |
    <router-link to="/showpost/2">Go to /showpost/2</router-link> |
    <router-link to="/showpost/101">Go to /showpost/101</router-link> |
    <router-link to="/showpost2/3">Go to /showpost2/3</router-link> |
    <router-link to="/showpost2/4">Go to /showpost2/4</router-link> |
    <router-link to="/showpost2/101">Go to /showpost2/101</router-link> |
    <router-link to="/slot">Go to /slot</router-link> |
    <router-link to="/transition">Go to /transition</router-link> |
    <router-link to="/transition-step">Go to /transition-step</router-link> |
    <router-link to="/transition-demo">Go to /transition-demo</router-link> |
    <router-link to="/hashpage">Go to /hashpage</router-link>
  </nav>

  <section>
    <p>Custom Link：</p>
    <CustomLink to="https://www.google.com/">Go to google</CustomLink>
    <CustomLink :to="{ name: 'User', params: { userId: '1' } }"
      >Go to User 1</CustomLink
    >
    <CustomLink to="/users/1/profile">Go to User 1 Profile</CustomLink>
  </section>

  <section>
    <p>Programmatic Navigation：</p>
    <button @click="goToUser4">Go to User 4</button> |
    <button @click="goToUser5">Go to User 5</button> |
    <button @click="goToUser6">Go to User 6</button> |
    <button @click="goToAboutWithQuery">Go to About With Query</button> |
    <button @click="goToAboutWithHash">Go to About With Hash</button> |
    <button @click="goToHomeReplace">Go to Home (replace)</button> |
    <button @click="forward">forward</button> |
    <button @click="back">back</button> |
    <button @click="goTo(3)">forward 3</button> |
    <button @click="goTo(-100)">back 100</button> |
    <button @click="goTo(100)">forward 100</button> |
    <button @click="goToPath('/loadpost')">Go to /loadpost</button> |
    <button @click="goToHome()">Go to /home</button>
  </section>

  <section class="content">
    <div>
      <!-- 命名視圖 -->
      <router-view name="sidebar" />
    </div>
    <main>
      <router-view />
    </main>
  </section>

  <Teleport v-if="loading.value" to="body">
    <Loading />
  </Teleport>

  <Teleport to="body">
    <Modal />
  </Teleport>
</template>

<style scoped>
.content {
  display: flex;
}
main {
  flex: 1;
}
</style>

<!-- 添加連結樣式 -->
<style>
a {
  color: darkblue;
}
.router-link-active {
  color: lightcoral;
}
.router-link-exact-active {
  color: red;
}
/* 添加指定連結樣式 */
.link-active-green {
  color: lightseagreen;
}
.link-exact-active-green {
  color: green;
}
</style>
