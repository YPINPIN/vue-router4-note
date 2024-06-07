<template>
  <h2>Hash page</h2>
  <hr />
  <router-link :to="{ name: 'HashPage', hash: '#hash1' }"
    >Go to /hashpage#hash1</router-link
  >
  |
  <router-link :to="{ name: 'HashPage', hash: '#hash2' }"
    >Go to /hashpage#hash2</router-link
  >
  <h3 id="hash1">Hash 1</h3>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
    veritatis dolore culpa quia debitis soluta saepe reprehenderit natus sequi
    reiciendis et itaque nam, ipsa rem molestias, molestiae cumque velit iure.
  </p>

  <h3 id="hash2">Hash 2</h3>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
    veritatis dolore culpa quia debitis soluta saepe reprehenderit natus sequi
    reiciendis et itaque nam, ipsa rem molestias, molestiae cumque velit iure.
  </p>
</template>

<style scoped>
h3 {
  color: darkcyan;
  border-bottom: 2px solid darkcyan;
}

p {
  width: 300px;
  padding: 10px;
  background-color: lightcyan;
  min-height: 600px;
}
</style>
