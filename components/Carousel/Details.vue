<template>
  <v-layout
    :column="$store.state.windowSize.x < 750"
    wrap
  >
    <v-flex
      md1
      sm2
      xs12
      order-xs1
      order-sm0
    >
      <div 
        slot="pagination" 
        class="swiper-pagination"/>
    </v-flex>
    <v-flex
      order-xs0
      order-sm1
      md11
      sm10
      xs12>
      <div
        v-swiper="swiperOptionTop"
        ref="swiperOptionTop"
        class="swiper"
      >
        <div class="swiper-wrapper">
          <div 
            v-for="(banner, i) in banner"
            :key="i" 
            class="swiper-slide">
            <v-img 
              :src="banner.amazon" 
              contain
              aspect-ratio="1.2">
              <v-layout
                slot="placeholder"
                fill-height
                align-center
                justify-center
                ma-0
              >
                <v-progress-circular 
                  indeterminate 
                  color="grey darken-3"></v-progress-circular>
              </v-layout>
            </v-img>
          </div>
        </div>
      </div>
      
    </v-flex>
    
  </v-layout>
</template>
<script>
  export default {
    props: {
      banner: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        swiperOptionTop: {
          autoHeight: true,
          observer: true,
          observeParents: true, 
          simulateTouch: false, // 鼠标模拟手机触摸。默认为true
          pagination:{
            el:'.swiper-pagination',
            clickable:true,
            renderBullet: (i, cn) => {
                console.log(i, cn)
                return `<div class="${cn} thumbnail ma-1" >
                          <img class="img-responsive " src="${this.banner[i].amazon}" onerror="" />
                        </div>`
              }
            }
        }
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" scoped>
.swiper-container
    display flex
  .swiper-slide
    img 
      width 100%
.swiper-pagination
  display flex
  flex-wrap wrap
  position relative
  >>> .thumbnail
        border 1px dashed 
        min-width 60px
        min-height 60px
        border-radius initial
        &:focus
          outline none
        img 
          width 100%
  >>> .swiper-pagination-bullet-active
        border 2px solid #ffc979
        border-radius initial
  >>> .swiper-pagination-bullet
        background none
</style>