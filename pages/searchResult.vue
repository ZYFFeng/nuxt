<template>
  <div class="searchResult">
    <v-breadcrumbs 
      :items="items" 
      dork 
      divider="/"/>
    <v-layout
      row
      wrap>
      <!-- title -->
      <v-flex xs12>
        <div class="headr-url-title">
          <h2>Search results for <em>{{ $route.query.keyWords }}</em> </h2>
        </div>
      </v-flex>
      <v-flex 
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
      ],
    }
  },
  async asyncData({isDev,$axios, route, store, env, params, query, req, res, redirect, error}) {
    try {
      const searchQuery = {
        keyWords: query.keyWords,
        page: query.page || 1,
        pageSize: query.pageSize || 20
      }
      const { list, page_num, status } = await $axios.$get(
        '/api/NetworkApi/new_search', 
        { params: searchQuery }
      )
      return {
        listData: list,
        total: page_num * searchQuery.pageSize,
        pageSize: +searchQuery.pageSize,
        page: +searchQuery.page,
        status: status
      }
    } catch (e) {
      error({ statusCode: 500, message: 'Post not found' })
    }
    
  },
  watch: {
    '$route'() {
      this.handlePageChange()
    }
  },
  methods: {
    handlePageChange(val = 1) {
      const query = this.$route.query
      query.page = val
      query.pageSize = query.pageSize ? query.pageSize : 20
      this.searchList(query)
      this.routerPush(query)
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
      return this.$route.query
    },
    routerPush(query) {
      console.log(query)
      this.$router.push({ path: 'searchResult', query })
    }
  }
}
</script>

<style lang="stylus" scoped>
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

.headr-url-title
  border-bottom: 3px solid #e9e4de;
  padding-bottom: 6px;
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
  margin-bottom 20px
  h2
    margin-right: 30px;
    font-size: 23px;
    em
      color: rgb(252, 140, 27);
      font-weight 800

@media only screen and (max-width: 768px)
  .headr-url-title
    justify-content center
    border: none;
    h2
      font-size: 30px
</style>
