<template>
  <footer class="main-footer">
    <div class="container layout-contaier">	
      <div class="connect-with">
        <div class="_form_14"/>
        <div class="footer-links visible-xs-block">
          <a 
            target="_blank" 
            href="https://www.facebook.com/DreamPairs"><i class="fa fa-facebook"/></a>
          <a 
            target="_blank" 
            href="https://www.instagram.com/dreampairsshoes/"><i class="fa fa-instagram"/></a>			
          <a 
            target="_blank" 
            href="https://www.youtube.com/channel/UCjeu1MJuZnVB2sMjE2uX7wQ"><i class="fa fa-youtube-play"/></a>
          <a 
            target="_blank" 
            href="https://twitter.com/DreamPairs"><i class="fa fa-twitter"/></a>
        </div>				
      </div>
      <div class="footer-menu">
        <div class="row">
          <div 
            v-for="item,key in footerData.list"
            class="col-sm-4 hidden-xs">
            <h4>{{ key }}</h4>
            <ul>
              <li v-for="children in item">
                <a 
                  v-if="children.name != 'Size Chart'" 
                  :href="children.url" >{{ children.name }}</a>
                <a 
                  v-else 
                  href="javascript:void(0);" 
                  data-toggle="modal" 
                  data-target="#goods-details-size">{{ children.name }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-moblie visible-xs-block">
          <ul>
            <template v-for="(item,key) in footerData.allList" >
              <li v-for="children in item">
                <a 
                  v-if="children.name != 'Size Chart'" 
                  :href="children.url" >{{ children.name }}</a>
                <a 
                  v-else 
                  href="javascript:void(0);" 
                  data-toggle="modal" 
                  data-target="#goods-details-size">{{ children.name }}</a>
              </li>
            </template>				
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  async mounted () {
    const footerData = await this.$axios.get('/mall/home/bottom')
  }
}
</script>

<style>

</style>
