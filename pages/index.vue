<template>
  <div class="index">
    <!-- home carousel -->
    <HomeCarousel
      :banners="bannerList"
    />
    <!-- special column -->
    <section class="special-column">
      <PicturesContainer
        v-for="(item, key) in homeColumn.specialColumn.list" 
        :key="key"
        :link="item.url"
        :title="item.product_name"
        :image-shack="item.img"
      />
    </section>
    <!-- new column -->
    <section class="new-column">
      <v-layout 
        row 
        wrap>
        <v-flex xs12>
          <h2 class="ma-4 text-xs-center">{{ homeColumn.newColumn.title }}</h2>
        </v-flex>
        <v-flex 
          v-for="(item, key) in homeColumn.newColumn.list" 
          :key="key" 
          xs12 
          md4>
          <PicturesContainer
            :link="item.url"
            :title="item.product_name"
            :image-shack="item.img"
            bnt-type="but"
          />
        </v-flex>
      </v-layout>
    </section>
    <InstagramList
      :instagram-list="$store.state.windowSize.x > 960 ? instagram.slice(0,7) : instagram.slice(0,6)"
    />
    <!-- social column -->
    <section class="social-column">
      <v-layout 
        row 
        wrap>
        <v-flex xs12>
          <h2 class="ma-4 text-xs-center">{{ homeColumn.socialColumn.title }}</h2>
        </v-flex>
        <v-layout 
          row 
          wrap>
          <v-flex 
            v-for="(item, key) in homeColumn.socialColumn.list" 
            :key="key" 
            class="mb-4"
            md3
            xs6>
            <PicturesContainer
              :link="item.url"
              :title="item.product_name"
              :image-shack="item.img"
              only-icon
            />
          </v-flex>
        </v-layout>
      </v-layout>
      
    </section>
    <!-- best sellers -->
    <section class="best-sellers">
      <v-layout>
        <v-flex xs12>
          <h2 class="ma-5 text-xs-center">BEST SELLERS</h2>
        </v-flex>
      </v-layout>
      
      <HomeProductCarousel
        :banners="bestSellersList"
      />
    </section>
    
  </div>
</template>

<script>
import PicturesContainer from '@/components/PicturesContainer'
import HomeCarousel from '@/components/Carousel/HomeCarousel'
import HomeProductCarousel from '@/components/Carousel/HomeProductCarousel'
import InstagramList from '@/components/InstagramList'
export default {
  components: {
    PicturesContainer,
    HomeCarousel,
    HomeProductCarousel,
    InstagramList
  },
  data() {
    return {
      bannerH: 200,
      instagram: []
    }
  },
  async asyncData({ $axios, error }) {
    try {
      const params = { code: 'H_1' }
      const { list } = await $axios.$get('/mall/home/banner', { params })
      const { data }  = await $axios.$get('/mall/home/homeColumn')
      const bestSellersList  = await $axios.$get('/api/NetworkApi/best_sellers')
      return {
        bannerList: list, 
        homeColumn: data,
        bestSellersList: bestSellersList.list
      }
    } catch (error) {
      error({ statusCode: 505, message: e.message })
    } 
      
  },
  async mounted() {
    const instagram = await this.$axios.$get('/api/InstagramApi/instagram')
    this.instagram = instagram.data
    this.setBannerH()
    window.addEventListener('resize', () => {
        this.setBannerH()
      },false)
  },
  methods: {
    setBannerH() {
      this.bannerH = document.body.clientWidth / 2.7
    }
  }
}
</script>
<style lang="stylus" scoped>
.carousel-img 
  width: 100%
.special-column, .new-column, .social-column
  display flex
  margin 20px 0
@media (max-width: 600px) 
  .special-column, .new-column, .social-column
    flex-wrap wrap
  .social-column >>> .pictures-of-palmetto-leaves
    margin-bottom 20px
</style>
