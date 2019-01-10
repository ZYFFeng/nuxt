<template>
  <div class="index">
    <el-carousel 
      :interval="4000" 
      :height="bannerH +'px'"
      arrow="always">
      <el-carousel-item 
        v-for="item in bannerList" 
        :key="item.url">
        <img 
          :src="item.img" 
          class="carousel-img">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<script>
export default {
  data() {
    return {
      bannerH: 200
    }
  },
  async asyncData({ $axios }) {
    const params = {
      params: {
        code: 'H_1'
      }
    }
    const { list } = await $axios.$get('https://shop.wangoon.com/mall/home/banner', params)
    return { bannerList: list }
  },
  mounted() {
    this.setBannerH()
    window.addEventListener(
      'resize',
      () => {
        this.setBannerH()
      },
      false
    )
  },
  methods: {
    setBannerH() {
      this.bannerH = document.body.clientWidth / 2.5
    }
  }
}
</script>
<style lang="scss" scoped>
.carousel-img {
  width: 100%;
}
</style>
