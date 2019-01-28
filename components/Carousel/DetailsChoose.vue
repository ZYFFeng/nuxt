<template>
  <v-layout>
    <v-flex
      xs9
    >
      <div
        v-swiper="swiperOptionTop"
        ref="swiperTop"
        class="swiper" >
        <div class="swiper-wrapper">
          <div 
            v-for="(banner, i) in banners"
            :key="i" 
            class="swiper-slide">
            <a :href="banner.url">
              <img :src="banner.mobile_img">
            </a>
          </div>
        </div>
        <div 
          slot="pagination" 
          class="swiper-pagination  hidden-sm-and-up"/>
        <div 
          slot="button-prev" 
          class="carousel-button-prev">
        </div>
        <div 
          slot="button-next" 
          class="carousel-button-next">
        </div>
      </div>
    </v-flex>
    <v-flex xs3>
      <div
        v-swiper="swiperOptionThumbs"
        ref="swiperThumbs"
        :instanceName="'customSwiperInstanceName'"
        class="swiper"
      >
        <div class="swiper-wrapper">
          <div 
            v-for="(banner, i) in banners"
            :key="i" 
            class="swiper-slide">
            <a :href="banner.url">
              <img :src="banner.mobile_img">
            </a>
          </div>
        </div>
        <div 
          slot="pagination" 
          class="swiper-pagination  hidden-sm-and-up"/>
        <div 
          slot="button-prev" 
          class="carousel-button-prev">
        </div>
        <div 
          slot="button-next" 
          class="carousel-button-next">
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>


<script>
  export default {
    data() {
      return {
        swiperOptionTop: {
          spaceBetween: 10,
          loop: true,
          loopedSlides: 5, //looped slides should be the same
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        swiperOptionThumbs: {
          spaceBetween: 10,
          slidesPerView: 3,
          touchRatio: 0.2,
          loop: true,
          loopedSlides: 5, //looped slides should be the same
          slideToClickedSlide: true,
          direction: 'vertical'
        },
        banners: [
          {
            mobile_img: 'http://img2.imgtn.bdimg.com/it/u=3971922570,1385569668&fm=26&gp=0.jpg'
          },
          {
            mobile_img: 'http://www.ooqiu.com/uploads/allimg/160421/183-1604210926320-L.jpg'
          },
          {
            mobile_img: 'http://img2.imgtn.bdimg.com/it/u=3971922570,1385569668&fm=26&gp=0.jpg'
          }
        ]
      }
    },
    mounted() {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.swiper
        const swiperThumbs = this.$refs.swiperThumbs.swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      })
    }
  }
</script>

<style lang="stylus" scoped>
 .swiper-slide
  img 
    width 100%
  .swiper-slide-active
    border 1px solid
</style>