<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

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
</script>

<template>
  <div>
    <MainTitle
      title="編程式導航-導航到不同的位置"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E7%B7%A8%E7%A8%8B%E5%BC%8F%E5%B0%8E%E8%88%AA"
    />
    <section>
      <button @click="goToUser4">Go to User 4</button> |
      <button @click="goToUser5">Go to User 5</button> |
      <button @click="goToUser6">Go to User 6</button> |
      <button @click="goToAboutWithQuery">Go to About With Query</button> |
      <button @click="goToAboutWithHash">Go to About With Hash</button>
    </section>
    <MainTitle
      title="編程式導航-替換當前位置"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E6%9B%BF%E6%8F%9B%E7%95%B6%E5%89%8D%E4%BD%8D%E7%BD%AE"
    />
    <section>
      <button @click="goToHomeReplace">Go to Home (replace)</button>
    </section>
    <MainTitle
      title="編程式導航-跨越 history"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E8%B7%A8%E8%B6%8A-history"
    />
    <section>
      <button @click="forward">forward</button> |
      <button @click="back">back</button> |
      <button @click="goTo(3)">forward 3</button> |
      <button @click="goTo(-100)">back 100</button> |
      <button @click="goTo(100)">forward 100</button>
    </section>
  </div>
</template>
