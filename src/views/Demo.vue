<template>
  <div
    class="wrapper"
    :style="`background-color: hsl(${
      (Number($route.params.id) * 60) % 360
    }, 100%, 75%);`"
  >
    <h3>Demo {{ $route.params.id }}</h3>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 10px;
  min-height: 20vh;
}
</style>
