<template>
  <div class="header">
    <div>
      <div class="nav-navigation hidden-xs-only" >
        <div class="navigation-left">
          <v-text-field
            v-model="email"
            label="SEARCH"
            required
            append-icon="search"
          />
        </div>
        <div class="navigation-centre">
          <nuxt-link 
            to="/">
            <img 
              src="../../assets/img/logo.png"
              alt="">
          </nuxt-link>
        </div>
        <div class="navigation-right">
          <a 
            href="https://www.facebook.com/DreamPairs" 
            target="_blank" 
            rel="noopener noreferrer">
            <v-icon color="#000">fab fa-facebook-f</v-icon>
          </a>
          <a 
            href="https://www.instagram.com/dreampairsshoes/" 
            target="_blank" 
            rel="noopener noreferrer">
            <v-icon color="#000">fab fa-instagram</v-icon>
          </a>
          <a 
            href="https://www.youtube.com/channel/UCjeu1MJuZnVB2sMjE2uX7wQ" 
            target="_blank" 
            rel="noopener noreferrer">
            <v-icon color="#000">fab fa-youtube</v-icon>
          </a>
          
        </div>
      </div>
      <div class="mobile-navigation hidden-sm-and-up">
        <div>
          <v-toolbar-side-icon 
            style="margin:0"
            @click="drawer = !drawer"
          />
          <v-btn 
            style="margin:0"
            icon
            @click="handleSearchControl">
            <v-icon>search</v-icon>
          </v-btn>
        </div>
        <div class="mobile-centre">
          <v-text-field
            v-if="searchControl"
            height="20px"
            label="SEARCH"
            style="box-shadow: none;"
            clearable
            solo
            append-icon="search"
          /> 
          <nuxt-link 
            v-else 
            to="/">
            <img 
              src="../../assets/img/logo.png" 
              alt="">
          </nuxt-link>
        </div>
      </div>
      <Menu
        :menuLsit="menuLsit"
        :childImg="childImg"
        :menuName="menuName"
        :redirect="redirect"
        class=" hidden-xs-only"
        @MenuList="handleMenuList" 
        @MouseOut="handleMouseOut"
        @childMouseover="handleChildMouseover"
      />
    </div>
    <MobileMenu
      :menu-lsit="menuLsit"
      :drawer="drawer"
      @drawerStatus="handleChangeDrowse"
    />
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
import MobileMenu from './mobileMenu'
export default {
  name: 'HEADNOPTION',
  components: {
    Menu,
    MobileMenu
  },
  data() {
    return {
      menuName: '',
      menuLsit: [],
      childImg: [],
      LazyImg: [],
      drawer: false,
      searchControl: false,
      menuIsShow: false,
      email: [],
      redirect: ''
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
    const { data } = await this.$axios.get('/api/NetworkApi/menu_list_api')
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
    handleChildMouseover ({child_img, redirect}) {
      this.childImg = child_img
      this.redirect = redirect
    },
    handleChangeDrowse (val) {
      this.drawer = val
    },
    handleSearchControl () {
      this.searchControl = !this.searchControl
    }
  },
}
</script>

<style  lang="stylus" scoped >
.mobile-centre /deep/ .v-text-field.v-text-field--solo .v-input__control
  min-height 30px
.mobile-centre  /deep/ .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot
  box-shadow none
  background #f1f1f1
.menu-bg
  background: rgba(0,0,0,.5);
  width: 100%;
  height: calc(100vh - 150px);
  position: absolute;
  left: -1px;
  top: 150px;
  z-index: 9;
.nav-navigation 
  display: flex;
  justify-content: space-between;
  height: 90px;
  padding: 0 8vw;
  background: #ffffff;
  div 
    display: flex;
    align-items: center;
  img 
    height: 100%;
  
  i 
    font-size: 30px;
    margin: 0 10px;

.kids-itme
  margin-left: 20px;
  
.mobile-navigation
  height 55px
  overflow hidden
  padding 10px
  position relative
  display: flex;
  align-items: center;
  background #ffffff
  .mobile-centre 
    position absolute
    left 50%
    top 50%
    transform translate(-50%,-50%)
    height: 35px;
    img
      height: 100%;
  
</style>
