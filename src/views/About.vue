<template>
  <h2>About page</h2>
  <hr />
  <h3>Current Route Information</h3>
  <p>Path: {{ $route.path }}</p>
  <p>Name: {{ $route.name }}</p>

  <button @click="$router.push('/')">Back to Home</button>
</template>
