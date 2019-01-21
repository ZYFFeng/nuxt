<template>
  <div class="error-page">
    <h1 
      v-if="error.statusCode === 404" 
      class="display-1"><em class="display-3"> 404 </em>Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
   props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="stylus" scoped>
.error-page
  min-height 700px
</style>
