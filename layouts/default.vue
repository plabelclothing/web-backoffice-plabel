<template>
  <div>
    <Nuxt/>
  </div>
</template>

<script>

export default {
  name: 'default',
  created() {
    document.getElementsByTagName('html')[0].classList = '';
  },
}
</script>
