<template>
  <div class="nav-menu">
    <ul class="menu-list">
      <li class="menu-item">
        <nuxt-link 
          class="menu-item-title" 
          to="/">HOME</nuxt-link>
      </li>
      <li
        v-for="item in menuLsit"
        :key="item.menu_name"
        class="menu-item"
        @mouseenter="handleMenuList(item)"
        @mouseleave="handleMouseOut"
      >
        <a 
          :href="item.redirect_url" 
          class="menu-item-title">{{ item.menu_name }}</a>
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
                ><a :href="childItem.redirect">{{ childItem.child_name }}</a></li>
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
                    ><a :href="titleItem.redirect">{{ titleItem.child_name }}</a></li>
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
                <a :href="redirect">
                  <v-img 
                    :src="childItem"
                    contain
                    aspect-ratio="1" 
                    alt/>
                </a>
              </div>
            </template>
            <template v-else>
              <div 
                v-for="childItem in item.child_img" 
                :key="childItem.img" 
                class>
                <a :href="childItem.redirect_url">
                  <img 
                    :src="childItem.img" >
                </a>
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
    },
    redirect: {
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
      this.$emit('childMouseover', item)
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  list-style: none
}
.nav-menu > .menu-list {
  position: relative;
  padding: 0 15vw;
  display: flex;
  justify-content: space-around;
  background: #150d0f;
  .menu-item {
    flex: 1;
    .menu-item-title {
      width: 100%;
      list-style: none;
      line-height: 60px;
      color: #bfa69a;
      font-weight: 700;
      font-size: 16px;
      display: inline-block;
      text-align: center;
    }
    .child-item {
      display: flex;
      position: absolute;
      background: #ffffff;
      width: 70vw;
      z-index: 20;
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
      flex: 1;
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
    border-right: .5px #151515 solid;
    img{
      height: 100px !important;
    }
    &:last-child{
      border-right: none;
    }
  }
}
</style>
