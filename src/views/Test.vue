<!-- <script>
export default {
  name: 'Test',
  data() {
    return {
      title: 'test page',
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter--');
    next((vm) => {
      // 通過 vm 訪問組件實例
      console.log('title:', vm.title);
    });
  },
  beforeRouteUpdate(to, from) {
    // 可以使用 this
    console.log(
      `beforeRouteUpdate-- title: ${this.title} id: ${to.params.testId}`
    );
  },
  beforeRouteLeave(to, from) {
    console.log('beforeRouteLeave--');
    const answer = window.confirm(
      'Do you really want to leave? you have unsaved changes!'
    );
    if (!answer) {
      return false;
    }
  },
};
</script> -->

<script setup>
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';

onBeforeRouteUpdate((to, from) => {
  console.log('onBeforeRouteUpdate-- id:', to.params.testId);
});
onBeforeRouteLeave((to, from) => {
  console.log('onBeforeRouteLeave--');
  const answer = window.confirm(
    'Do you really want to leave? you have unsaved changes!'
  );
  //取消導航並停留在當前頁面
  if (!answer) {
    return false;
  }
});
</script>

<template>
  <h2>Test page</h2>
  <p>testId: {{ $route.params.testId }}</p>
</template>
