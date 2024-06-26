<script setup>
import Modal from '@/components/Modal.vue';
import { isModalOpen } from '@/utility/isModalOpen.js';
import {
  isNavigationFailure,
  NavigationFailureType,
  useRouter,
} from 'vue-router';

const router = useRouter();

// 檢測導航結果
async function goToPath(path) {
  const failure = await router.push(path);
  if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
    // 導航被阻止，給使用者顯示一個提示
    alert('Navigation Failure aborted');
    console.log(
      `Failure -- to: ${failure.to.path}, from: ${failure.from.path}`
    );
  } else if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
    // 導航重複
    alert('Navigation Failure duplicated');
  } else {
    // 導航成功關閉選單
    closeModal();
  }
}
function closeModal() {
  isModalOpen.set(false);
}
async function goToHome() {
  await router.push('/home');
  const redirectedFrom = router.currentRoute.value.redirectedFrom;
  if (redirectedFrom) {
    // redirectedFrom 是解析出的路由地址，就像導航守衛中的 to 和 from
    console.log('redirectedFrom: ', redirectedFrom);
  }
}
</script>

<template>
  <div>
    <MainTitle
      title="導航結果"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E5%B0%8E%E8%88%AA%E7%B5%90%E6%9E%9C"
    />
    <section>
      <router-link to="/">Go to Home</router-link> |
      <button @click="goToPath('/loadpost')">Go to /loadpost</button> |
      <button @click="goToHome()">Go to /home</button>
    </section>
    <Teleport to="body">
      <Modal />
    </Teleport>
  </div>
</template>
