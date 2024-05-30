<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const isLogin = ref(localStorage.getItem('isLogin'));

function login() {
  localStorage.setItem('isLogin', true);
  router.push({ name: 'Home' });
}
function logout() {
  localStorage.removeItem('isLogin');
  isLogin.value = null;
}
</script>

<template>
  <h2>Login page</h2>
  <hr />
  <button v-if="isLogin" @click="logout">Logout</button>
  <button v-else @click="login">Login</button>
</template>
