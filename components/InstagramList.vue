<template>
  <v-layout class="instagram-list">
    <v-flex 
      xs12 
      sm12 
    >
      <v-container 
        grid-list-sm 
        grid-list-12
        fluid>
       
        <v-layout 
          row 
          wrap>
          <v-flex
            xs3
            align-self-center
            class="follow-instagram"
          >
            <v-icon color="#000">fab fa-instagram</v-icon>
            <h2 class="headline">Follow dreampairs on Instagram</h2>
            <v-btn 
              flat
              class="title"
              outline>
              @dreampairs
            </v-btn>
          </v-flex>
          <v-flex
            v-for="item in instagramList"
            :key="item.id"
            xs3
            d-flex
          >
            <v-card 
              flat 
              tile 
              class="d-flex">
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
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
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
</style>
