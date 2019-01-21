<template>
  <div class="list">
    <v-container 
      grid-list-md 
      text-xs-center>
      <v-layout 
        row 
        wrap>
        <v-flex xs12>
          <v-breadcrumbs 
            :items="items" 
            dork 
            divider="/"/>
        </v-flex>
        <v-layout 
          justify-space-around
          row 
          wrap>
          <v-flex 
            offset-xs3
            xs4>
            <v-chip
              v-model="chip1"
              close
            >Closable</v-chip>
          </v-flex>
          <v-flex 
            xs4>
            <v-pagination
              v-model="page"
              :length="15"
              :total-visible="7"
            />
          </v-flex>
        </v-layout>
        
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
        <div class="text-xs-center">
          <v-pagination
            v-model="page"
            :length="15"
            :total-visible="7"
          />
        </div>
      </v-layout>
    </v-container>
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
      page: 1,
      chip1: true,
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
