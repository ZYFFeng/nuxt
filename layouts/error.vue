<template>
  <div class="error-page">
    <h1 
      v-if="error.statusCode === 404" 
      class="display-1"><em class="display-3"> 404 </em>Page not found</h1>
    <h1 v-else>{{ error.message }}</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
   props: {
    error: {
      type: Object,
      default: null
    }
  },
  mounted() {
    window.scrollTo(0,0)
  }
}
</script>

<style lang="stylus" scoped>
.error-page
  min-height 700px
</style>
