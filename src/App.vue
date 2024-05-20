<script setup></script>

<template>
  <h1>Hello Vue Router4!</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>

  <nav>
    <router-link to="/">Go to Home</router-link> |
    <router-link to="/about">Go to About</router-link> |
    <router-link to="/users/1">Go to User 1</router-link> |
    <router-link to="/users/2">Go to User 2</router-link> |
    <router-link to="/users/1/posts/1">Go to User 1 Post 1</router-link> |
    <router-link to="/users/1/posts/2">Go to User 1 Post 2</router-link>
  </nav>

  <main>
    <router-view />
  </main>
</template>
