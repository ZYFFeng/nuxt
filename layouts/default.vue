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
      <div>&copy;2014 - 2019 Dream Pair Shoes. All Rights Reserved.</div>
    </v-footer>
    <v-icon 
      v-show="chevronUp" 
      class="scroll-top" 
      @click="handleScrollTop">fas fa-chevron-square-up</v-icon>
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
  data () {
    return {
      chevronUp: false
    }
  },
  mounted () {
    this.onResize()
    window.onresize = throttle( _ => {
        this.onResize()
      }
    )
    // document.body.onscroll = throttle( _ => {
    //     const scrollTop = document.documentElement.scrollTop || document.body.scrollTop 
    //     scrollTop > 200 ? this.chevronUp = true : this.chevronUp = false
    //   }
    // )
  },
  methods: {
    onResize() {
      this.$store.commit('changeWindowSize', { 
        x: window.innerWidth, 
        y: window.innerHeight 
      })  
    },
    handleScrollTop() {
      scrollTo(document.body, 0, 20000)
    },
    scrollTo(element, to, duration) {
      console.log(123)
      if (duration <= 0) return
      var difference = to - element.scrollTop
      var perTick = difference / duration * 10
      setTimeout(() => {
          console.log(element.scrollTop)
          element.scrollTop = element.scrollTop + perTick
          if (element.scrollTop === to) return
          scrollTo(element, to, duration - 10)
      }, 10)
    }
  }
}
</script>
<style >
.scroll-top{
  position: fixed;
  width: 33px;
  height: 33px;
  background: rgba(0,0,0,.8);
  z-index: 10;
  right: 14px;
  bottom: 42px;
  transition: .3s;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
}
.text-gray{
  color: #b9b9b9;
}
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
