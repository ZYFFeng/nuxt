<template>
  <div class="index">
    https://shop.wangoon.com/mall/home/homeColumn 返回数据
    <div >{{ newColumn.data }}</div>
    
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
  async asyncData({ $axios }) {
    const newColumn = await $axios.$get(
      'https://shop.wangoon.com/mall/home/homeColumn'
    )
    return { newColumn }
  }
}
</script>
