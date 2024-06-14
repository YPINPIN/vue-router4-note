import { reactive } from 'vue';

export const isModalOpen = reactive({
  value: false,
  set(newVal) {
    this.value = newVal;
  },
});
