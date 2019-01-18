<template>
  <section 
    v-if="$store.state.windowSize.x > 0" 
    class="swiper-main-body">
    <div
      v-swiper:swiper="swiperOption"
      ref="swiperBox"
      class="swiper"
    >
      <div class="swiper-wrapper">
        <div 
          v-for="(banner, i) in banners"
          :key="i" 
          class="swiper-slide">
          <img 
            :src="$store.state.windowSize.x > 600 ? banner.img : banner.mobile_img">
        </div>
      </div>
      <div 
        slot="pagination" 
        class="swiper-pagination  hidden-sm-and-up"/>
      <div 
        slot="button-prev" 
        class="carousel-button-prev elevation-10 hidden-xs-only">
        <v-icon class="">fas fa-chevron-left</v-icon>
      </div>
      <div 
        slot="button-next" 
        class="carousel-button-next elevation-10 hidden-xs-only">
        <v-icon>fas fa-chevron-right</v-icon>
      </div>
    </div>
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
      // 所有配置均为可选（同Swiper配置）
      swiperOption: {
        notNextTick: true,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.carousel-button-next',
          prevEl: '.carousel-button-prev',
        },
        observer: true,
        observeParents: true
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
.swiper-main-body >>> .carousel-button-next, .carousel-button-prev
  height 50px
  width 50px
  display flex
  justify-content center
  align-items center
  position absolute
  top 50%
  z-index 11
  transform translateY(-50%)
  border-radius 50%
  background rgba(0,0,0,.5)
  .v-icon
    display flex
    font-size 34px
    color #ffffffbd
.carousel-button-next
  right 20px
.carousel-button-prev
  left 20px
.swiper-main-body  img
  width 100%
.swiper-main-body >>> .swiper-pagination-bullet-active 
  opacity: 1;
  background: #333;

</style>
