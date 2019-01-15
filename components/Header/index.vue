<template>
  <div class="header">
    <div class="hidden-xs-only">
      <div class="nav-navigation" >
        <div class="navigation-left">
          <i class="el-icon-search"/>
        </div>
        <div class="navigation-centre">
          <img 
            src="../../assets/img/logo.png"
            alt="">
        </div>
        <div class="navigation-right">
          <i class="el-icon-goods"/>
          <i class="el-icon-sold-out"/>
          <i class="el-icon-star-on"/>
        </div>
      </div>
      <Menu
        :menuName="menuName"
        :menuLsit="menuLsit"
        :childImg="childImg"
        @MenuList="handleMenuList"
        @MouseOut="handleMouseOut"
        @childMouseover="handleChildMouseover"
      />
    </div>
    <div 
      class="img-Lazy" 
      style="display:none">
      <img 
        v-for="item in LazyImg"
        :src="item" 
        :key="item" 
        alt="">
    </div>
    <div 
      v-show="menuIsShow"
      class="menu-bg"/>
  </div>
</template>

<script>
import Menu from './menu'
export default {
  name: 'HEADNOPTION',
  components: {
    Menu
  },
  data() {
    return {
      menuName: '',
      menuLsit: [],
      childImg: [],
      LazyImg: [],
      menuIsShow: false
    }
  },
  watch: {
    'menuChildImg' (newValue) {
      let imgList = newValue.map(e => e.img)
      imgList = [...new Set(imgList.concat(imgList, this.LazyImg))]
      this.LazyImg  = imgList
    }
  },
  async mounted() {
    const { data } = await this.$axios.get('https://shop.wangoon.com/api/NetworkApi/menu_list_api')
    this.menuLsit = data.resData
  },
  methods: {
    handleMenuList ({ menu_name }) {
      if (menu_name !== 'DEALS') {
        this.childImg = []
        this.menuName = menu_name
        this.menuIsShow = true
      }
    },
    handleMouseOut () {
      this.menuName = ''
      this.menuIsShow = false
    },
    handleChildMouseover ({child_img}) {
      this.childImg = child_img
    }
  },
}
</script>

<style socped lang="scss">
.menu-bg{
  background: rgba(0,0,0,.5);
  width: 100%;
  height: calc(100vh - 150px);
  position: absolute;
  left: -1px;
  top: 150px;
  z-index: 9;
}
.nav-navigation {
  display: flex;
  justify-content: space-between;
  height: 90px;
  padding: 0 8vw;
  background: #ffffff;
  div {
    display: flex;
    align-items: center;
  }
  img {
    height: 100%;
  }
  i {
    font-size: 30px;
    margin: 0 10px;
  }
}
.kids-itme{
  margin-left: 20px;
}
</style>
