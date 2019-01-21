<template>
  <v-app>
    <HeadNoption/>
    <div class="main"><nuxt/></div>
    <v-footer 
      dark 
      class="pa-3"
      style="font-size:14px"
    >
      <v-spacer/>
      <div>&copy;{{ $store.state.windowSize }}2014 - 2019 Dream Pair Shoes. All Rights Reserved.</div>
    </v-footer>
  </v-app>
</template>
<script>
import HeadNoption from '@/components/Header/index.vue'
export default {
  components: {
    HeadNoption
  },
  mounted () {
    this.onResize()
  },
  methods: {
    onResize () {
      this.$store.commit('changeWindowSize', { 
        x: window.innerWidth, 
        y: window.innerHeight 
      })  
    }
  }
}
</script>
<style lang="stylus" socped>
@font-face
  font-family: MontserratRegular
	src:url('../assets/font/Montserrat-Regular.ttf')

body, html,html .main, .application
	font-family:'MontserratRegular'
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box
*,
*:before,
*:after 
  box-sizing: border-box
  margin: 0
  padding: 0
a
  text-decoration none
.main 
  padding 0 10vw
</style>
