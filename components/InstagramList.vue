<template>
  <v-layout 
    class="instagram-list">
    <v-flex 
      xs12 
      sm12 
    >
      <v-layout 
        row 
        wrap>
        <v-flex
          column
          d-flex
          xs12
          md3
          class="follow-instagram"
        >
          <a 
            class="instagram-bnt"
            href="https://www.instagram.com/dreampairsshoes/"
            target="_blank" >
            <div 
              :class="{'mobile-instagram': $store.state.windowSize.x < 960}" 
              class="follow-instagram-content ">
          
              <v-icon color="#000">fab fa-instagram</v-icon>
              <h2 class="headline">Follow dreampairs on Instagram</h2>
              <v-btn 
                flat
                class="title"
                outline>
                @dreampairs
              </v-btn>
            </div>
          </a>
        </v-flex>
        <v-flex
          v-for="item in instagramList"
          :key="item.id"
          xs6
          md3
          d-flex
        >
          <a 
            :href="item.link" 
            target="_blank">
            <v-img
              :src="item.images.standard_resolution.url"
              :lazy-src="`https://picsum.photos/10/6?image=1`"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <v-layout
                slot="placeholder"
                fill-height
                align-center
                justify-center
                ma-0
              >
                <v-progress-circular 
                  indeterminate 
                  color="grey lighten-5"/>
              </v-layout>
            </v-img>
          </a>
          
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    instagramList:{
      type: Array,
      default: () => [] 
    }
  }
}
</script>
<style lang="stylus" scoped>
.instagram-list >>> .v-btn.v-btn--outline
  border: 2px solid #000
.instagram-list >>> .follow-instagram h2
  color #000
  margin 10px 0
.follow-instagram
  flex-direction column
  align-items flex-start
.fa-instagram
  font-size 40px
.instagram-list  .v-btn--depressed
  margin-left 0
.follow-instagram-content
  justify-content: center;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex 1
.instagram-list .flex
  padding 4px
.instagram-list .mobile-instagram
  align-items center
.instagram-bnt
  display flex
  width 100%
  background  #f4f4f4;
  padding 20px 10px 20px 20px
</style>
