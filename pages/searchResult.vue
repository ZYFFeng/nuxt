<template>
  <div class="searchResult">
    <v-breadcrumbs 
      :items="items" 
      dork 
      divider="/"/>
    <v-layout
      row
      wrap
    >
      <v-flex 
        v-if="page !== 0" 
        xs12
        justify-end
        class="pagination-rigth">
        <el-pagination
          :total="total" 
          :page-size="pageSize" 
          :current-page.sync="page" 
          :small="$store.state.windowSize.x < 900"
          layout="prev, pager, next"
          @size-change="handlePageChange"
          @current-change="handlePageChange"/>
      </v-flex>
      <v-layout 
        row
        wrap 
        class="listData-content">
        <div 
          v-show="progressVisible" 
          class="progress">
          <v-progress-circular
            :size="70"
            :width="7"
            color="#333"
            indeterminate
          />
        </div>
        <v-flex
          v-for="item in listData"
          :key="item.styleID"
          class="pa-2 "
          lg3
          md4
          xs6
        >
          <ListCard
            :large-image="item.LargeImage"
            :brand="item.brand"
            :title="item.product_name"
            :price="item.price"
            :color="item.color"/>
        </v-flex>
      </v-layout>
        
      <v-flex 
        v-if="page !== 0" 
        xs12
        
        justify-end
        class="pagination-rigth">
        <el-pagination
          :total="total" 
          :page-size="pageSize" 
          :current-page.sync="page" 
          :small="$store.state.windowSize.x < 900"
          layout="prev, pager, next"
          @size-change="handlePageChange"
          @current-change="handlePageChange"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ListCard from '@/components/ListCard'
import BreadcrumbsRoute from '@/components/BreadcrumbsRoute'
export default {
  components: {
    ListCard,
    BreadcrumbsRoute
  },
  data() {
    return {
      progressVisible: false,
    }
  },
  async asyncData({isDev,$axios, route, store, env, params, query, req, res, redirect, error}) {
    const searchQuery = {
      keyWords: query.keyWords,
      page: query.page || 1,
      pageSize: query.pageSize || 20
    }
    const { list, page_num } = await $axios.$get(
      '/api/NetworkApi/new_search', 
      { params: searchQuery }
    )
    return {
      listData: list,
      total: page_num * searchQuery.pageSize,
      pageSize: +searchQuery.pageSize,
      page: +searchQuery.page
    }
  },
  data () {
    return {
      items: [
        {
          text: 'HOME',
          disabled: false,
          href: '/'
        },
        {
          text: 'SEARCH RESULT',
          disabled: true,
          href: '/searchResult'
        }
      ]
    }
  },
  methods: {
    handlePageChange(val) {
      const query = this.$route.query
      query.page = val
      query.pageSize = query.pageSize ? query.pageSize : 20
      this.$router.push({ query })
      this.searchList(query)
    },
    async searchList(params) {
      this.progressVisible = true
      const { list, page_num } = await this.$axios.$get(
      '/api/NetworkApi/new_search', 
        { params }
      )
      this.listData =  list
      this.progressVisible = false

    },
    getRouterQuery () {
      return delUndefined(this.$route.query)
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-breadcrumbs
  padding: 10px;
  background: #f5f5f5;
  margin-bottom: 10px;
  min-height 2.1em
.pagination-rigth
  display flex

.listData-content
  position relative
  .progress
    position absolute
    z-index 9
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffffd1;
    .v-progress-circular
      top 200px
      left 50%
      transform translateX(-50%)
</style>
