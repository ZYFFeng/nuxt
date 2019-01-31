<template>
  <v-hover >
    <v-card
      slot-scope="{ hover }"
    >
      <a 
        :href="navigation" 
        :target="isDeals ? '_blank' : ''" >
        <v-img
          :src="LargeImage"
          :alt="title"
          aspect-ratio="1.2"
          contain >
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-progress-circular 
              indeterminate 
              color="grey darken-3"></v-progress-circular>
          </v-layout>
          <v-expand-transition 
            v-if="!isDeals" >
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out v-card--reveal display-3 hidden-xs-only"
              style="height: 100%;"
            >
              <v-btn
                dark
                class="quick-view"
                @click.prevent="handleQuickView"
              >
                QUICK VIEW
              </v-btn>
            </div>
          </v-expand-transition>
        </v-img>
      </a>
      <v-card-title>
        <a 
          :href="navigation" 
          :target="isDeals ? '_blank' : ''" >
          <h6 class="title mb-2 text-xs-center card-brand">{{ brand }}</h6>
          <p 
            class="text-xs-center card-title" 
            style="-webkit-box-orient:vertical">{{ title }}</p>
          <p 
            v-if="!isDeals" 
            class="text-xs-center">{{ price }}</p>
        </a>
        <p 
          v-if="isDeals && dealCode"
          class="deals-code">
          Code: {{ dealCode }}
          <v-icon 
            @copy="handleCopyCode" 
            @click="handleExecCommandCopy">far fa-copy</v-icon>
        </p>
      </v-card-title>
      <a 
        v-if="!isDeals" 
        :href="navigation" 
        :target="isDeals ? '_blank' : ''"
      >
        <v-card-actions >
          <template v-for="(color, index) in color.slice(0, 4)" >
            <i 
              v-if="index < 4"
              :key="index" 
              :style="{background:color, border:color}"
              class="card-color  elevation-3"/>
          </template>
          <template v-if="color.length > 4" >
          
            <v-icon 
              class="card-color elevation-3">fas fa-plus-circle</v-icon>
          </template>
        </v-card-actions>
      </a>
      <a 
        v-else 
        :href="navigation" 
        :target="isDeals ? '_blank' : ''"
        class="buy-amazon">
        <v-card-actions>
          <v-btn
            color="grey darken-4 "
          >
            BUY AT AMAZON
          </v-btn>
        </v-card-actions>
      </a> 
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'ListCard',
  props: {
    LargeImage: {
      type: String,
      default:() => ''
    },
    brand: {
      type: String,
      default:() => ''
    },
    title: {
      type: String,
      default:() => ''
    },
    price: {
      type: String,
      default:() => ''
    },
    color: {
      type: Array,
      default:() => []
    },
    dealCode: {
      type: String,
      default:() => ''
    },
    isDeals: {
      type: Boolean,
      default:() => false
    },
    navigation: {
      type: String,
      default:() => ''
    },
    listStyle: {
      type: String,
      default:() => ''
    }
  },
  methods: {
    handleExecCommandCopy() {
      document.execCommand('copy')
    },
    handleCopyCode(event) {
      event.preventDefault()
      if (event.clipboardData) {
        event.clipboardData.setData('text/plain', this.dealCode)
        this.$message({
          text: 'Copy the success!'
        })
      }
    },
    handleQuickView(event) {
      this.$emit('handleQuickView', this.listStyle)
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-card__actions
  justify-content center
.v-card__title 
  display flex
  justify-content center
  flex-direction column
.v-card--reveal
  align-items: center;
  bottom: 0;
  background: #0a0a0a70;
  justify-content: center;
  position: absolute;
  width: 100%;
  .quick-view
    margin 20%
    border-radius 0


.card-brand
  width 100%;
  text-align center
.card-title
  overflow  hidden
  text-overflow ellipsis
  display -webkit-box
  -webkit-line-clamp 3
.card-color
  margin 0 5px
  width 15px
  height 15px
  border-radius 50%
  font-size 16px
  text-align center
  color #000

.buy-amazon
  display inline-block
  width 100%
  >>> .v-btn
         width 80%
  >>> .v-btn__content 
        color #fff

.deals-code
  display flex
  input 
    display inline-block
  >>> .fa-copy
        font-size 16px
        margin-left: 5px;
        cursor: pointer;
</style>
