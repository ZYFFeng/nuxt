<template>
  <div 
    :style="{width: picturesWidth}" 
    class="pictures-of-palmetto-leaves">
    <div class="pictures-container">
      <a :href="link">
        <img 
          src="https://shop.wangoon.com/img/2018122807628.jpg" 
          alt="">
      </a>
      <h3 class="pictures-title">NEW YEAR SALE</h3>
      <el-button v-if="bntType === 'text'">button</el-button>
      <el-button v-else>button</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PicturesContainer',
  props: {
    link: {
      type: String,
      default: ''
    },
    bntType: {
      type: String,
      default() {
        return 'text'
      }
    },
    picturesWidth: {
      type: String,
      default: () => '20%'
    }
  }
}
</script>

<style lang="scss" scoped>
.pictures-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  img {
    width:100%;
    transition:all .5s ease;
    &:hover{
      transform:scale(1.16);
    }
  }
}
</style>
