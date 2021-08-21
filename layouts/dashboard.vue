<template>
  <div class="container is-fluid">
    <div class="notification is-primary header">
      <div class="div_logo">
        <img src="https://cdn.plabelclothing.com/source/web-portal-plabel/other/logo-small.png">
      </div>
    </div>
    <Nuxt/>
  </div>
</template>

<script>
export default {
  name: 'dashboard'
}
</script>

<style scoped>
.header {
  background-color:white;
}
.div_logo {
  margin:auto auto 0%;
  width:100px;
}
</style>
