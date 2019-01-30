<template>
  <v-hover >
    <v-card
      slot-scope="{ hover }"
    >
      <v-img
        :src="LargeImage"
        :alt="title"
        aspect-ratio="1.2"
        contain
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out v-card--reveal display-3"
            style="height: 100%;"
          >
            <v-btn
              dark
              class="quick-view"
              @click="$emit('showDialog')"
            >
              QUICK VIEW
            </v-btn>
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-title>
        <h6 class="subheading mb-0 text-xs-center card-brand">{{ brand }}</h6>
        <p class=" text-xs-center card-title">{{ title }}</p>
        <p>${{ price }}</p>
      </v-card-title>
      <v-card-actions>
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
    }
  },
  methods:{ 
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
  height 3em
  overflow hidden
.card-color
  margin 0 5px
  width 15px
  height 15px
  border-radius 50%
  font-size 16px
  text-align center
  color #000

</style>
