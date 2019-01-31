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
import { throttle } from '@/utils'
export default {
  components: {
    HeadNoption,
    Footer
  },
  mounted () {
    this.onResize()
    window.onresize = throttle( _ => {
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
@media only screen and (min-width: 1904px) {
  .container {
    max-width: 1570px !important;
  }
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
.v-breadcrumbs {
  padding: 8px 15px;
  margin-bottom: 20px;
  list-style: none;
  background-color: #f5f5f5;
  border-radius: 4px;
}
._form-branding {
  display: none !important;
}

</style>
