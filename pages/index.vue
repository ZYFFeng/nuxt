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
    <p class="display-1">{{ homeColumn.newColumn.title }}</p>
    <section class="new-column">
      <PicturesContainer
        v-for="(item, key) in homeColumn.newColumn.list" 
        :key="key"
        :link="item.url"
        :title="item.product_name"
        :image-shack="item.img"
        bnt-type="but"
      />
    </section>
    <InstagramList
      :instagram-list="instagram.slice(0,7)"
    />
    <!-- social column -->
    <section class="social-column">
      <PicturesContainer
        v-for="(item, key) in homeColumn.socialColumn.list" 
        :key="key"
        :link="item.url"
        :title="item.product_name"
        :image-shack="item.img"
        only-icon
      />
    </section>
    <!-- best sellers -->
    <section class="best-sellers">
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
  async asyncData({ $axios }) {
      const params = { code: 'H_1' }
      const { list } = await $axios.$get('/mall/home/banner', { params })
      const { data }  = await $axios.$get('/mall/home/homeColumn')
      const bestSellersList  = await $axios.$get('/api/NetworkApi/best_sellers')
      return {
        bannerList: list, 
        homeColumn: data,
        bestSellersList: bestSellersList.list
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
    width 50%
    margin-bottom 20px
</style>
