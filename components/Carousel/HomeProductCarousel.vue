<template>
  <section 
    v-if="$store.state.windowSize.x > 0" 
    :class="{'pa-5': $store.state.windowSize.x > 750 }"
    class="swiper-main-body"
  >
    <div 
      v-swiper:swiper="swiperOption" 
      ref="swiperBox" 
      class="swiper">
      <div class="swiper-wrapper">
       
        <div 
          v-for="(banner, i) in banners" 
          :key="i" 
          class="swiper-slide">
          <nuxt-link :to="{ path:'/Details',query:{ style: banner.style } }">
            <div class="product">
              <div class="product-img">
                <v-img 
                  :src="banner.LargeImage"
                  :lazy-src="`https://picsum.photos/10/6?image=1`"
                  alt 
                  aspect-ratio="1.2"
                  contain
                  @error="$event.target.src = banner.LargeImage"/>
              </div>
              <div class="product-title text-xs-center">{{ banner.brand }}</div>
              <div class="product-name text-xs-center">{{ banner.product_name }}</div>
              <div class="price-price text-xs-center">{{ banner.price }}</div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div
      slot="button-prev"
      class="swiper-button-prev hidden-xs-only"
    />
    <div
      slot="button-next"
      class="swiper-button-next hidden-xs-only"
    />
  </section>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        initialSlide: 0,
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 10,
        autoHeight: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          990: {
            slidesPerView: 3,
            spaceBetween: 10,
            slidesPerGroup: 3
          },
          660: {
            slidesPerView: 2,
            spaceBetween: 10,
            slidesPerGroup: 2
          },
          450: {
            slidesPerView: 2,
            spaceBetween: 10,
            slidesPerGroup: 2
          }
        }
      }
    }
  },
  swiper() {
    // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    return this.$refs.swiperBox.swiper
  },
  methods: {
    handleStopSwiper() {
      this.swiper.autoplay.stop()
    },
    handleStartSwiper() {
      this.swiper.autoplay.start()
    }
  }
}
</script>
<style lang="stylus" scoped>

.swiper-main-body
  position relative
.product
  display flex
  flex-direction column
  font-size: 14px;
  font-weight: 600;
.product li
  text-align center
.product-img
  display flex
  align-items center
  justify-content center
.swiper-button-prev, .swiper-button-next
  filter grayscale(100%)
.price-price
  margin 10px
</style>
