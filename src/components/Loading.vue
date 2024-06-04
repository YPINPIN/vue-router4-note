<template>
  <div class="mask">
    <span>Loading</span>
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mask span {
  color: lightblue;
  font-size: 50px;
  margin-bottom: 8px;
}
.spinner {
  width: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 5px solid lightblue;
  border-right-color: darkblue;
  animation: spinner_ani 1s infinite linear;
}
@keyframes spinner_ani {
  to {
    transform: rotate(360deg);
  }
}
</style>
