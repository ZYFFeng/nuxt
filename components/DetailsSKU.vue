<template>
  <v-layout 
    wrap
    class="defailt-specifications">
    <h2>{{ title }}</h2>
    <v-flex class="defailt-rating">
      <v-rating
        v-model="start"
        class="pa-0 font-weight-bold"
        background-color="yellow darken-2 "
        color="yellow darken-2"
        size="15"
        half-increments
        readonly
      ></v-rating>
      <span class="font-weight-bold ml-1">{{ count }}</span>
    </v-flex>
    <v-flex 
      v-if="price" 
      xs12>
      <p class="price font-weight-bold">{{ detailsList[selectIndex].price }}</p>
    </v-flex>
    <v-flex xs12>
      <div class="font-weight-bold">
        <span>COLOR</span>
        <i >{{ detailsList[selectIndex].color }}</i>
      </div>
    </v-flex>
    

    <v-flex
      class="select-image my-2"
      xs12>
      <div 
        v-for="(item, i) in detailsList"
        :class="{'select-active': selectIndex === i}"
        :key="item.sku"
        class="ma-1 pa-1">
        <v-img 
          :src="item.MediumImage[0].amazon"
          contain
          aspect-ratio="1"
          width="40px" 
          height="40px"
          alt=""
          @click="handleColorSelect(i)"/>
      </div>
     
    </v-flex>

    <v-flex
      xs12
    >
      <p class="font-weight-bold">
        <span class="mr-1">SIZE </span>
        <i>{{ sizeSelected === null ? '' : detailsList[selectIndex].size[sizeSelected].size }} B(M)US</i>
      </p>
      
    </v-flex>
    

    <v-flex 
      class="my-1"
      xs12>
      <v-layout
        row
        wrap
      >
        <div 
          v-for="(sizeItem, i) in detailsList[selectIndex].size"
          :class="{
            'inventory-not' : !+sizeItem.color_quntity,
            'inventory': sizeSelected === i && +sizeItem.color_quntity
          }"
          :key="sizeItem.size" 
          class="sku-select ma-1 text-xs-center font-weight-bold" 
          @click="handleSizeSelect(i, +sizeItem.color_quntity)">
          {{ sizeItem.size }} 
        </div>
      </v-layout>
    </v-flex>

    <v-flex
      sm8
      xs12
    >
      <v-btn
        color="grey darken-4 my-5 mx-0"
      >
        BUY AT AMAZON
      </v-btn>
    </v-flex>
    <v-flex class="description">
      <ul>
        <li 
          v-for="text in description"
          :key="text" 
          class="ml-1 mb-2 font-weight-bold">{{ text }}</li>
      </ul>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => ''
    },
    start: {
      type:  Number,
      default:() => ''
    },
    detailsList: {
      type: Array,
      default:() => []
    },
    description: {
      type: Array,
      default: () => []
    }, 
    count: {
      type: String,
      default: () => `0 Reviews`
    },
    selectIndex: {
      type: Number,
      default: () => 0
    }
  },
  data () {
    return {
      sizeSelected: null
    }
  },
  mounted() {
    console.log(this.start)
  },
  methods: {
    handleColorSelect(i) {
      this.sizeSelected = null
      this.$emit('handleColorSelect', i)
    },
    handleSizeSelect(i, inventory) {
      if (inventory) {
        this.sizeSelected = i
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.defailt-rating
  display flex
  height 40px
  align-items center
  .v-rating
    display flex

.defailt-specifications
  >>> .v-rating 
        .v-icon
          padding 0 !important

.sku-select
  border 1px solid #2d2d2d
  width 40px
  height 40px
  line-height 40px
  &:hover
    background #2d2d2d
    color #fff
.defailt-specifications
  >>> .v-btn__content 
        color #fff  
        padding 0 20px
  >>> .v-btn
        width 100%
.description
  li
    line-height 23px

.select-image
  display flex
  flex-wrap wrap
  .v-responsive
    flex initial
    border-radius 100%
    overflow hidden
.select-active
  border-radius 100%
  box-shadow: 0 0 3px 1px #0000007a
.inventory-not
  opacity .5
.inventory 
  background #2d2d2d
  color #ffffff
</style>
