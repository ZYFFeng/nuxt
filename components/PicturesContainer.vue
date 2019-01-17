<template>
  <div class="pictures-of-palmetto-leaves">
    <div class="pictures-container">
      <a :href="link">
        <img 
          :src="imageShack"
          class="elevation-5" 
          alt="">
      </a>
      <template v-if="onlyIcon">
        <v-icon class="icon-link elevation-5"> fab fa-facebook-f</v-icon>
      </template>
      <template v-else>
        <h3 
          v-if="title" 
          class="pictures-title">{{ title }}</h3>
        <v-btn 
          v-if="bntType !== 'text'"
          flat
          outline>
          SHOP NOW
        </v-btn>
        <v-btn 
          v-else 
          class="bnt-border"
          flat>SHOP NOW</v-btn>
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
  align-items: center;
  justify-content:center;
  font-width 100
  .pictures-title
    margin: 20px 0 0;
  a
    overflow hidden
  img 
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
    background #333
    color #fff
    width 40px
    height 40px
    border-radius 50%
    font-size 18px
</style>
