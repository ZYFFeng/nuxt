<template>
  <div class="pictures-of-palmetto-leaves">
    <div class="pictures-container">
      <a :href="link">
        <v-img 
          :src="imageShack"
          :aspect-ratio="ratio"
          class="image-shack"
          contain
          alt="">
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
        </v-img>
      </a>
      <template v-if="onlyIcon">
        <v-icon class="icon-link elevation-5"> fab fa-facebook-f</v-icon>
      </template>
      <template v-else>
        <p 
          v-if="title" 
          class="pictures-title">{{ title }}</p>
        <p 
          v-if="discount" 
          class="text-xs-center">{{ discount }}</p>
        <v-btn 
          v-if="bntType !== 'text'"
          flat
          class="mt-3"
          outline>
          <a :href="link">SHOP NOW</a>
        </v-btn>
        <v-btn 
          v-else 
          class="bnt-border "
          flat><a :href="link">SHOP NOW</a> </v-btn>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PicturesContainer',
  props: {
    link: {
      type: String,
      default: ''
    },
    bntType: {
      type: String,
      default() {
        return 'text'
      }
    },
    imageShack: {
      type: String,
        default() {
          return ''
        }
    },
    onlyIcon: {
      type: Boolean,
      default: () => false
    },
    title: {
      type: String,
      default: () => ''
    },
    discount: {
      type: String,
      default: () => ''
    },
    ratio: {
      type: [String, Number],
      default: () => undefined
    }
  }
}
</script>

<style lang="stylus" scoped>
.pictures-of-palmetto-leaves
  width 100%
.pictures-container
  position relative
  margin 5px
  display: flex;
  flex-direction: column;
  justify-content:center;
  font-width 100
  .pictures-title
    margin: 20px 0 0;
    align-self center
  a
    overflow hidden
  .image-shack 
    display flex
    width:100%;
    transition:all .5s ease;
    &:hover
      transform:scale(1.16);
  >>> .bnt-border .v-btn__content
    border-radius 0
    border-bottom 1px solid 
    font-weight 200
    font-size 16px
  >>> .icon-link
    position absolute
    bottom -20px
    left 50%
    transform translateX(-50%)
    background #333
    color #fff
    width 40px
    height 40px
    border-radius 50%
    font-size 18px
.v-btn
  align-self center
</style>
