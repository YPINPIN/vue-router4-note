<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const loading = ref(false);
const post = ref(null);
const error = ref(null);

watch(() => route.params.postId, fetchData, { immediate: true });

async function fetchData(postId) {
  error.value = null;
  post.value = null;
  loading.value = true;

  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    if (res.ok) {
      // Promise resolved and HTTP status is successful
      post.value = await res.json();
    } else {
      // Custom message for failed HTTP codes
      if (res.status === 404) throw new Error('404, Not found');
      // For any other server error
      throw new Error(res.status);
    }
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <h2>ShowPost page</h2>
  <hr />
  <div v-if="loading" class="loading">Loading...</div>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="post" class="content">
    <h3>title: {{ post.title }}</h3>
    <p>possId: {{ post.id }}</p>
    <p>content: {{ post.body }}</p>
  </div>
</template>
