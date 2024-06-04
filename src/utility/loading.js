import { reactive } from 'vue';

export const loading = reactive({
  value: false,
  set(newVal) {
    this.value = newVal;
  },
});
