<template>
  <div class="deals">
    <v-layout
      row
      wrap
    >
      <v-flex 
        xs12 
        class="hidden-sm-and-down"
      >
        <v-layout
          row
          wrap
          class="mb-5"
        >
          <v-flex 
            v-for="item in deals.sowing_Map_pc" 
            :key="item" 
            xs12>
            <v-img
              :src="item"
            ></v-img>
          </v-flex>
        </v-layout>
      </v-flex>  
      
      <v-flex
        v-for="(item) in deals.list"
        :key="item.id"
        sm6
        xs12
        class="pa-2"
      >
        <PicturesContainer
          :link="`/deals/${item.show_name}?id=${item.buy_url}`"
          :title="item.show_name"
          :discount="item.discount"
          :image-shack="item.img"
          :ratio="687/829"
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import PicturesContainer from '@/components/PicturesContainer'
export default {
  components: {
    PicturesContainer
  },
  async asyncData({ $axios, error }) {
      const deals = await $axios.$get(
        '/api/NetworkApi/deals'
        )
      return {
        deals
      }
  },
}
</script>

<style>

</style>
