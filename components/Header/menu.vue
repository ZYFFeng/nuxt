<template>
  <div class="nav-menu">
    <ul class="menu-list">
      <li class="menu-item">
        <nuxt-link to="/">HOME</nuxt-link>
      </li>
      <li
        v-for="item in menuLsit"
        :key="item.menu_name"
        class="menu-item"
        @mouseenter="handleMenuList(item)"
        @mouseleave="handleMouseOut"
      >
        <nuxt-link to="/list">{{ item.menu_name }}</nuxt-link>
        <div
          v-if="item.child_menu.length !== 0"
          v-show="item.menu_name === menuName"
          class="child-item"
        >
          <div class="menu-chid-item">
            <ul v-if="item.menu_name !== 'BRANDS' && item.menu_name !== 'DEALS'">
              <h2>{{ item.menu_name }}</h2>
              <template v-if="item.menu_name !== 'KIDS'">
                <li
                  v-for="childItem in item.child_menu"
                  :key="childItem.child_name"
                  @mouseover="handleChildMouseover(childItem)"
                >{{ childItem.child_name }}</li>
              </template>
              <template v-else>
                <li 
                  v-for="(childItem, key) in item.child_menu[0]" 
                  :key="key"
                >
                  <h3>{{ key }}</h3>
                  <ul class="kids-itme">
                    <li
                      v-for="titleItem in item.child_menu[0][key]"
                      :key="titleItem.child_name"
                      @mouseover="handleChildMouseover(titleItem)"
                    >{{ titleItem.child_name }}</li>
                  </ul>
                </li>
              </template>
            </ul>
          </div>
          <div 
            :class="{ barndsItem: item.menu_name === 'BRANDS' }" 
            class="menu-chid-img">
            <template v-if="childImg.length !== 0">
              <div 
                v-for="childItem in childImg" 
                :key="childItem" 
                class>
                <img 
                  :src="childItem" 
                  alt>
              </div>
            </template>
            <template v-else>
              <div 
                v-for="childItem in item.child_img" 
                :key="childItem.img" 
                class>
                <img 
                  :src="childItem.img" 
                  alt>
              </div>
            </template>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    menuLsit: {
      type: Array,
      default: () => []
    },
    childImg: {
      type: Array,
      default: () => []
    },
    menuName: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    handleMenuList(item) {
      this.$emit('MenuList', item)
    },
    handleMouseOut() {
      this.$emit('MouseOut')
    },
    handleChildMouseover (item) {
      console.log(item)
      this.$emit('childMouseover', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-menu > .menu-list {
  position: relative;
  padding: 0 15vw;
  display: flex;
  justify-content: space-around;
  background: #150d0f;
  .menu-item {
    a {
      list-style: none;
      line-height: 60px;
      color: #bfa69a;
      font-weight: 700;
      font-size: 16px;
    }
    .child-item {
      display: flex;
      position: absolute;
      background: #ffffff;
      width: 70vw;
      z-index: 10;
      left: 50%;
      padding: 20px;
      transform: translateX(-50%);
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
      li {
        width: 16vw;
        line-height: 30px;
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
        max-height: 250px;
        max-width: 100%;
        height: auto;
      }
    }
  }
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
   &:before{
    content: '';
    height: 77px;
    width: .5px;
    position: absolute;
    right: 0;
    background: #585858;
    z-index: 9;
    top: 50%;
    transform: translateY(-50%);
   }
   &:last-child:before{
     display: none;
   }
  }
}
</style>
