<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const hasAuth = ref(localStorage.getItem('hasAuth'));

function setAuth() {
  localStorage.setItem('hasAuth', true);
  hasAuth.value = 'true';
}
function removeAuth() {
  localStorage.removeItem('hasAuth');
  hasAuth.value = null;
  router.push('/comments');
}
</script>

<template>
  <h3>CommentsLayout</h3>
  <button v-if="hasAuth" @click="removeAuth">removeAuth</button>
  <button v-else @click="setAuth">setAuth</button>
  <hr />
  <router-link to="/comments/new">new comment</router-link> |
  <router-link to="/comments/1">Go to comment id 1</router-link> |
  <router-link to="/comments/2">Go to comment id 2</router-link>
  <div class="layout">
    <router-view />
  </div>
</template>

<style scoped>
.layout {
  padding: 10px;
  background-color: lightsalmon;
  min-height: 20vh;
}
</style>
