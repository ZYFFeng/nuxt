<template>
  <div class="list">
    <div class="product-component">
      <div 
        v-for="item in resData" 
        :key="item.LargeImage" 
        class="product-item">
        <img 
          :src="item.LargeImage" 
          alt="">
        <h3>{{ item.title }}1111111111</h3>
      </div>
    </div>
    <el-pagination
      :total="1000"
      background
      layout="prev, pager, next"/>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
  const params = {
      params: {
        page: 1,
        pagesize: 21,
        department: 'NEW',
        category: 'Women'
      }
    }
    const { data: { resData } } = await $axios.get('https://shop.wangoon.com/api/NetworkApi/new_goods_list_by_property',params)
    return {
      resData
    }
  }
}
</script>

<style lang="scss" scoped>
*{
  box-sizing: border-box;
}
.product-component{
  display: flex;
  flex-wrap: wrap;
  .product-item{
    width: 20%;
    padding: 30px;
    box-shadow: 0px 0px 9px #949090;
    margin: 2.5%;
    img{
      width: 100%;
    }
  }
}
</style>
