<template>
  <div class="details">
    <v-layout
      row
      wrap>
      <v-flex
        sm8>
        <DetailsChoose
          :banner="list[selectIndex].HiResImage"
        />
      </v-flex>
      <v-flex
        sm4
        xs12>
        <DetailsSKU
          :title="detailsData.name"
          :start="+detailsData.avg_start"
          :count="detailsData.count + ''"
          :description="detailsData.description"
          :details-list="detailsData.list"
          :select-index="selectIndex"
          @handleColorSelect="handleColorSelect"
        />
      </v-flex>
    </v-layout>
   
  </div>
</template>

<script>
import DetailsChoose from '@/components/Carousel/Details'
import DetailsSKU from '@/components/DetailsSKU'
export default {
  components: {
    DetailsChoose,
    DetailsSKU
  },
  data() {
    return {
      selectIndex: 0
    }
  },
  async asyncData({$axios}) {
    const data = await $axios.$get('/api/NetworkApi/goods_detail?style=PORTZ')
    return {
      detailsData: data,
      list: data.list
    }
  },
  methods: {
    handleColorSelect(i) {
      this.selectIndex = i
    }
  }
}
</script>

<style>

</style>
