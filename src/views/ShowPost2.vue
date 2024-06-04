<script>
import { getPost } from '@/utility/api.js';
// 全局控制 loading 狀態
import { loading } from '@/utility/loading.js';

export default {
  async beforeRouteEnter(to, from, next) {
    // 顯示 loading
    loading.set(true);
    const data = await getPost(to.params.postId);
    next((vm) => {
      // 通過 vm 訪問組件實例方法傳遞數據
      vm.setData(data);
    });
  },
  async beforeRouteUpdate(to, from) {
    loading.set(true);
    const data = await getPost(to.params.postId);
    this.setData(data);
  },
};
</script>

<script setup>
import { ref } from 'vue';

const post = ref(null);
const error = ref(null);

function setData(data) {
  post.value = data.post;
  error.value = data.error;
  // 關閉 loading
  loading.set(false);
}

// 暴露方法
defineExpose({
  setData,
});
</script>

<template>
  <h2>ShowPost2 page</h2>
  <hr />
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="post" class="content">
    <h3>title: {{ post.title }}</h3>
    <p>possId: {{ post.id }}</p>
    <p>content: {{ post.body }}</p>
  </div>
</template>
