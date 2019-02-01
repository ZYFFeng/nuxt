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
          <h2>Search results for <span>{{ $route.query.keyWords }}</span> </h2>
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
            :list-style="item.style"
            :title="item.product_name"
            :price="item.price"
            :color="item.color"
            :navigation="`/Details?style=${item.style}`"
            @handleQuickView="handleQuickView"/>
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


    <!-- dialog -->
    <v-dialog
      v-model="dialog"
      max-width="900px"> 
      <v-layout
        wrap
        row
        class="white pa-4 listData-content"
        style="min-height:600px"
      >
        <v-flex xs7> 
          <DetailsChoose
            v-if="list && list.length !== 0"
            :banner="list[selectIndex].HiResImage"
            is-dialog
          />
        </v-flex>
        <v-flex xs5>
          <DetailsSKU
            v-if="detailsData.name"
            :product-style="productStyle"
            :title="detailsData.name"
            :details-list="detailsData.list"
            :select-index="selectIndex"
            :buy-url="detailsData.buy_url"
            is-dialog
            @handleColorSelect="handleColorSelect"
          />
          <div 
            v-show="dialogProgress" 
            class="progress">
            <v-progress-circular
              :size="70"
              :width="7"
              color="#333"
              indeterminate
            />
          </div>
        </v-flex>
      </v-layout>
    </v-dialog>

  </div>
</template>

<script>
import ListCard from '@/components/ListCard'
import BreadcrumbsRoute from '@/components/BreadcrumbsRoute'
import DetailsChoose from '@/components/Carousel/Details'
import DetailsSKU from '@/components/DetailsSKU'
export default {
  components: {
    ListCard,
    BreadcrumbsRoute,
    DetailsChoose,
    DetailsSKU
  },
  data() {
    return {
      progressVisible: false,
      dialog: false,
      detailsData: {},
      list: [],
      selectIndex: 0,
      productStyle: '',
      dialogProgress: false,
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
      error({ statusCode: 500, message: e.message })
    }
    
  },
  watch: {
    '$route'() {
      this.page = 1
      this.handlePageChange()
    }
  },
  methods: {
    handleColorSelect(i) {
      this.selectIndex = i
    },
    handlePageChange(val = 1) {
      const query = this.$route.query
      query.page = val
      query.pageSize = query.pageSize ? query.pageSize : 20
      this.searchList(query)
      this.routerPush(query)
    },
    handleQuickView(val) {
      this.dialog = true
      this.dialogProgress = true
      this.detailsData = {}
      this.list = []
      this.productStyle = val
      this.selectIndex = 0
      this.detailsView(val)
    },
    async searchList(params) {
      this.progressVisible = true
      const { list, page_num } = await this.$axios.$get(
      '/api/NetworkApi/new_search', 
        { params }
      )
      this.listData =  list
      this.total = page_num * params.pageSize
      this.progressVisible = false
    },
    async detailsView(style) {
      const { data } = await this.$axios.get(
        '/api/NetworkApi/quickView', 
        { params: { style } }
      )
      this.detailsData = data
      this.list = data.list
      this.dialogProgress = false
    },
    getRouterQuery () {
      return this.$route.query
    },
    routerPush(query) {
      this.$router.push({ path: 'searchResult', query })
    }
  }
}
</script>

<style lang="stylus" scoped>
.searchResult
  min-height 400px
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
    span
      color: rgb(252, 140, 27);
      font-weight 800

@media only screen and (max-width: 768px)
  .headr-url-title
    justify-content center
    border: none;
    h2
      font-size: 30px
</style>
