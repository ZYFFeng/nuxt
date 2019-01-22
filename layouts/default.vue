<template>
  <v-app>
    <HeadNoption/>
    <v-container><nuxt/></v-container>
    <Footer/>
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
import Footer from '@/components/Footer/index.vue'
export default {
  components: {
    HeadNoption,
    Footer
  },
  mounted () {
    this.onResize()
    window.onresize = this.throttle( _ => {
        this.onResize()
      }
    )
  },
  methods: {
    onResize() {
      this.$store.commit('changeWindowSize', { 
        x: window.innerWidth, 
        y: window.innerHeight 
      })  
    },
    throttle(fn, interval = 300) {
        let canRun = true
        return function () {
          if (!canRun) return
          canRun = false
          setTimeout(() => {
              fn.apply(this, arguments)
              canRun = true
          }, interval)
      };
    }
  }
}
</script>
<style >
@font-face {
  font-family: MontserratRegular;
	src:url('../assets/font/Montserrat-Regular.ttf');
}
  

body, html,html .main, .application {
  font-family:'MontserratRegular';
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
	
.theme--light.application{
  background: #ffffff;

}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
  
a {
  text-decoration: none;

}
</style>
