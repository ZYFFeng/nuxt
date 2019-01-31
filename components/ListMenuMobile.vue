<template>
  <v-menu 
    origin="center center"
    transition="scale-transition">
    <v-btn
      slot="activator"
    >
      FILTER BY &nbsp;
      <v-icon dark>fas fa-caret-down</v-icon>
    </v-btn>
    <v-list class="mobile-menu">
      <v-list-tile >PRICE</v-list-tile>
      <v-subheader
        v-for="(item, index) in priceFilter"
        :class="{ selected : item.show === isSelected }" 
        :key="index"
        inset
        @click="handlePrice(item)"
      >
        {{ item.show }}
      </v-subheader>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'ListMenuMobile',
  props: {
    priceFilter: {
      type: Array,
      default: () => []
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
  methods: {
    handlePrice(item) {
      const priceObj = JSON.parse(JSON.stringify(item))
      priceObj.page = 1
      priceObj.pageSize = 21
      priceObj.price_gt = priceObj.gt
      priceObj.price_lt = priceObj.lt
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
</style>
