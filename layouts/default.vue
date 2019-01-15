<template>
  <v-app>
    <HeadNoption/>
    <el-main><nuxt/></el-main>
    <v-footer 
      dark 
      class="pa-3"
      style="font-size:14px"
    >
      <v-spacer/>
      <div>&copy;2014 - 2019 Dream Pair Shoes. All Rights Reserved.</div>
    </v-footer>
  </v-app>
</template>
<script>
import HeadNoption from '@/components/Header/index.vue'
export default {
  components: {
    HeadNoption
  }
}
</script>
<style lang="scss" socped>
@font-face {
	font-family: MontserratRegular;
	src:url('../assets/font/Montserrat-Regular.ttf');
}
body, html {
	font-family:'MontserratRegular';
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
</style>
