<script setup>
import CustomLink from '@/components/CustomLink.vue';
</script>

<template>
  <div>
    <MainTitle
      title="擴展 router-link"
      link="https://github.com/YPINPIN/vue-router4-note?tab=readme-ov-file#%E6%93%B4%E5%B1%95-router-link"
    />
    <section>
      <CustomLink to="https://www.google.com/">Go to google</CustomLink>
      <CustomLink :to="{ name: 'User', params: { userId: '1' } }"
        >Go to User 1</CustomLink
      >
      <CustomLink to="/users/1/profile">Go to User 1 Profile</CustomLink>
    </section>
  </div>
</template>
