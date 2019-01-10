<template>
  <div class="header">
    <div class="nav-navigation">
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
        <li 
          v-for="item in menuLsit"
          :key="item.menu_name" 
          class="menu-item">{{ item.menu_name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HEADNOPTION',
  data() {
    return {
      menuLsit: []
    }
  },
  async mounted() {
    const { data } = await this.$axios.get(
      'https://shop.wangoon.com/api/NetworkApi/menu_list_api'
    )
    this.menuLsit = data.resData
  }
}
</script>

<style socped lang="scss">
.nav-menu > .menu-list {
  padding: 0 40px;
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
  padding: 0 30px;
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
</style>
