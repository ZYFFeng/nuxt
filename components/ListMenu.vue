<template>
  <v-list 
    class="elevation-8 list-menu">
    <v-list-tile>SHOP BY STYLE</v-list-tile>
    <v-divider/>
    <div class="shop-content">
      <template v-if="category[0]">
        <div 
          v-for="(item, key) in category[0]" 
          :key="key" 
          class="shop-content-item">
          <v-list-tile>{{ key }}</v-list-tile>
          <v-subheader 
            v-for="(cildeItem, cildeKey) in item" 
            :key="cildeKey" 
            inset>
            <a :href="cildeItem[Object.keys(cildeItem)[0]]">{{ Object.keys(cildeItem)[0] }}</a> 
          </v-subheader>
        </div>
      </template>
      <template v-else>
        <v-subheader>{{ menuName }}</v-subheader>
        <v-subheader 
          v-for="(cildeItem, cildeKey) in category" 
          :key="cildeKey" 
          inset>
          <a :href="cildeItem">{{ cildeKey }}</a> 
        </v-subheader>
      </template>
    </div>
    <v-divider/>
    <v-list-tile>FILTER BY</v-list-tile>
    <v-divider/>
    <v-list-tile>PRICE</v-list-tile>
    <v-subheader 
      v-for="item in price"
      :key="item.show"
      inset
      @click="handlePrice(item)">
      <a 
        :class="{ selected : item.show === isSelected }" 
        href="javascript:;">
        {{ item.show }}
      </a>
    </v-subheader>
  </v-list>
</template>

<script>
export default {
  name: 'ListMenu',
  props: {
    price: {
      type: Array,
      default: () => []
    }, 
    category: {
      type: [Array, Object],
      default: () => []
    },
    color: {
      type: Array,
      default: () => []
    },
    menuName: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      isSelected: this.$route.query.show
    }
  },
  watch: {
    '$route' () {
      this.isSelected = this.$route.query.show
    }
  },
  mounted () {
    console.log(this.isSelected)
  },
  methods: {
    handlePrice(item) {
      const priceObj = JSON.parse(JSON.stringify(item))
      priceObj.price_gt = priceObj.gt
      priceObj.price_lt = priceObj.lt
      priceObj.page = 1
      priceObj.pageSize = 21
      delete priceObj.gt
      delete priceObj.lt
      this.$emit('handlePrice', priceObj)
    }
  },
}
</script>

<style lang="stylus" scoped>
.selected
  color #fc8c1b
.list-menu 
  >>> .v-list__tile
    font-weight 500
  .shop-content-item >>> .v-list__tile
    font-weight 400
    padding-left 40px
</style>
