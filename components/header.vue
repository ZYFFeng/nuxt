<template>
  <div class="header">
    
    <div class="nav-navigation hidden-xs-only" >
      <div class="navigation-left">
        <i class="el-icon-search"/>
      </div>
      <div class="navigation-centre">
        <img 
          src="../assets/img/logo.png"
          alt="">
      </div>
      <div class="navigation-right">
        <i class="el-icon-goods"/>
        <i class="el-icon-sold-out"/>
        <i class="el-icon-star-on"/>
      </div>
    </div>
    <div class="nav-menu">
      <ul class="menu-list">
        <li>HOME</li>
        <nuxt-link
          v-for="item in menuLsit"
          :key="item.menu_name" 
          to="/list"
        >
          <li 
            class="menu-item"
            @mouseenter="handleMenuList(item)"
            @mouseleave="handleMouseOut">{{ item.menu_name }}</li></nuxt-link>
      </ul>
      
      <div 
        v-show="menuIsShow" 
        class="menu-child--list"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseOut">
        <div class="menu-chid-item">
          <ul v-if="menuName !== 'BRANDS' && menuName !== 'DEALS'">
            <h2>{{ menuName }}</h2>
            <template v-if="menuName !== 'KIDS'">
              <li 
                v-for="item in menuChildLsit"
                :key="item.child_name">
                {{ item.child_name }}
              </li>
            </template>
            <template v-else >
              <li 
                v-for="(item,key) in menuChildLsit[0]" 
                :key="key">
                <h3>{{ key }}</h3>
                <ul class="kids-itme">
                  <li 
                    v-for="titleItem in menuChildLsit[0][key]" 
                    :key="titleItem.child_name">
                    {{ titleItem.child_name }}
                  </li>
                </ul>
              </li>
            </template>
          </ul>
          <div 
            :class="{ barndsItem: menuName === 'BRANDS' }"
            class="menu-chid-img" >
            <div 
              v-for="item in menuChildImg"
              :key="item.img" 
              class="">
              <img 
                :src="item.img"
                alt="">
            </div>
          </div>
        </div>
      </div>
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
export default {
  name: 'HEADNOPTION',
  data() {
    return {
      menuName: '',
      menuLsit: [],
      menuChildLsit: [],
      menuChildImg: [],
      LazyImg: [],
      menuIsShow: false,
      timeOut: null
    }
  },
  watch: {
    'menuChildImg' (newValue) {
      let imgList = newValue.map(e => e.img)
      console.log(this)
      imgList = [...new Set(imgList.concat(imgList, this.LazyImg))]
      this.LazyImg  = imgList
    }
  },
  async mounted() {
    const { data } = await this.$axios.get('https://shop.wangoon.com/api/NetworkApi/menu_list_api')
    this.menuLsit = data.resData
  },
  methods: {
    handleMenuList (item) {
      this.menuIsShow = true
      this.menuName = item.menu_name
      if ( item.menu_name !== 'BRANDS' ) {
        this.menuChildLsit = item.child_menu
        this.menuChildImg = item.child_img
      } else {
        this.menuChildImg = item.child_img
      }
    },
    handleMouseenter () {
      clearTimeout(this.timeOut)  
      this.timeOut = null
      this.menuIsShow = true
    },
    handleMouseOut () {
      this.timeOut = setTimeout(_ => {
        this.menuIsShow = false
      }, 5)
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
.nav-menu > .menu-list {
  padding: 0 15vw;
  display: flex;
  justify-content: space-around;
  background: #150d0f;
  li {
    list-style: none;
    line-height: 60px;
    color: #bfa69a;
    font-weight: 700;
    font-size: 16px;
  }
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
.menu-child--list{
  position: relative;
  .menu-chid-item{
    display: flex;
    position:absolute;
    background: #ffffff;
    width: 70vw;
    z-index: 10;
    left: 50%;
    padding: 20px;
    transform: translateX(-50%);
    ul {
      li {
        width: 16vw;
        line-height: 30px;
      }
    }
  }
  .menu-chid-img {
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      flex: 1;
      padding: 10px;
    }
    img{
      max-width: 100%;
      height: auto;
    }
  }
}
 h2 {
    font-weight: 600;
    color: #000;
    border-bottom: 1px solid #000;
    padding-bottom: 3px;
    display: inline-block;
    font-size: 16px;
    line-height: 14px;
    margin: 10px 0;
}
.kids-itme{
  margin-left: 20px;
}
.barndsItem{
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 40px 0;

  div {
    position: relative;
    display: flex;
    justify-content: center;
    img{
    height: 100px !important;
   }
   &::before{
     content: '';
     height: 100px;
     width: 0.8px;
     position: absolute;
     right: 0;
     background: #150d0f;
   }
   &:last-child::before{
     display: none;
   }
  }
}
</style>
