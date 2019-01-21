<template>
  <div class="list">
    <v-breadcrumbs 
      :items="items" 
      dork 
      divider="/"/>
    <v-layout>
      <v-flex
        sm3
      >
        <ListMenu 
          :color="ListMenu.color"
          :category="ListMenu.category"
          :price="ListMenu.price"
        />
        
      </v-flex>
      <ListCard
        :list-data="listData"
      />
    </v-layout>
   
   
  </div>
</template>

<script>
import ListCard from '@/components/ListCard'
import ListMenu from '@/components/ListMenu'
export default {
  components: {
    ListCard,
    ListMenu
  },
  data() {
    return {
      listData: [],
      ListMenu: [],
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard'
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1'
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ]
    }
  },
  async mounted() {
    const params = {
      page: 1,
      pagesize: 21,
      department: 'MEN'
    }
    const property = {
      department: 'KIDS',
      category: 'Boys'
    }
    const { data: { resData } } = await this.$axios.get(
      '/api/NetworkApi/new_goods_list_by_property', 
      { params }
    )
    const { data: { category, price, color } } = await this.$axios.get('/api/NetworkApi/property', { params: property})
    this.ListMenu = { category, price, color }
    this.listData = resData
  }
}
</script>

<style>
</style>
