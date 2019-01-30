<template>
  <div class="list">
    <v-layout 
      row 
      wrap>
      <v-flex xs12>
        <v-breadcrumbs 
          :items="items" 
          dork 
          divider="/"/>
      </v-flex>
      <v-flex xs12>
        <div class="headr-url-title">
          <h2 v-if="menuName !== 'NEW' && menuName !=='new'">
            {{ menuName === 'BRANDS' ? 'BRAND' : menuName }}'S SHOES
          </h2>
          <h2 v-else-if="className">{{ menuName }} {{ className }}</h2>
          <h2 v-else>NEW ARRIVALS</h2>
        </div>
      </v-flex>
      <v-flex 
        xs12 
        class="hidden-sm-and-up">
        <v-menu 
          origin="center center"
          transition="scale-transition">
          <v-btn
            slot="activator"
          >
            FILTER BY 
          </v-btn>
          <v-list class="mobile-menu">
            <v-list-tile >PRICE</v-list-tile>
            <v-subheader
              v-for="(item, index) in ListMenu.price"
              :key="index"
              inset
            >
              {{ item.show }}
            </v-subheader>
          </v-list>
        </v-menu>
      </v-flex>
      <v-flex 
        v-if="page !== 0" 
        xs12
        class="pagination-conten">
        <el-pagination
          :total="page"
          :page-size="pagesize"
          :current-page.sync="curPage"
          small
          layout="prev, pager, next"
          @size-change="handlePageChange"
          @current-change="handlePageChange"
          @prev-click="handlePageChange"
          @next-click="handlePageChange"/>
      </v-flex>
      <v-layout 
        justify-space-around 
        row 
        wrap>
        <v-flex 
          class="pr-3 hidden-sm-and-down"
          xs3>
          <ListMenu
            :color="ListMenu.color"
            :category="ListMenu.category"
            :price="ListMenu.price"
          />
        </v-flex>
        <v-flex
          :xs9="$store.state.windowSize.x >= 750"
          :xs12="$store.state.windowSize.x < 750"
        > 
          <v-layout 
            v-if="listData.length === 0" 
            justify-center>
            <h2 class="products-not"> WE ARE SORRY, NO PRODUCTS FOUND  :( </h2>
          </v-layout>
          
          <v-layout 
            v-else
            row 
            wrap>
            <v-flex 
              v-for="item in listData"
              :key="item.styleID" 
              class="px-2 pb-2"
              lg4
              md6
              sm6
              xs6
            >
              <ListCard
                :large-image="item.LargeImage"
                :brand="item.brand"
                :title="item.title"
                :price="item.update_sale_price"
                :color="item.color"
                @showDialog="showDialog(true,item.style)"
              />
            </v-flex>
          </v-layout>
        </v-flex>
        
      </v-layout>
      <v-flex 
        v-if="page !== 0" 
        xs12
        class="pagination-conten"
      >
        <el-pagination
          :total="page" 
          :page-size="pagesize" 
          :current-page.sync="curPage" 
          small
          layout="prev, pager, next"
          @size-change="handlePageChange"
          @current-change="handlePageChange"
          @prev-click="handlePageChange"
          @next-click="handlePageChange"/>
      </v-flex>
    </v-layout>
    <!-- Dialogs component -->
    <Dialogs 
      :dialog-status="dialogStatus" 
      :qv-data-staus="QvDataStaus"
      :goods-info-data="goodsInfoData"
      :first-data="firstData"
      @modifyStatus="modifyStatus"></Dialogs>
      <!-- Dialogs component -->
  </div>
</template>

<script>
import ListCard from '@/components/ListCard'
import ListMenu from '@/components/ListMenu'
import Dialogs from '@/components/Dialogs'
export default {
  components: {
    ListCard,
    ListMenu,
    Dialogs
  },
  data() {
    return {
      menuName: '',
      className: '',
      chip1: true,
      items: [],
      dialogStatus: false,
      QvDataStaus: true,  //quick view data whether Loading completed
      goodsInfoData:{},
      firstData:{} 
    }
  },
  async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error, $axios }) {
    const goodsListParams = {
      page: query.curPage || 1,
      pagesize: 21,
      department: params.menuName,
      category: params.childName,
      class: params.className
    }
    const { department } = goodsListParams
    const { resData, page } = await $axios.$get(
      '/api/NetworkApi/new_goods_list_by_property', 
      { params: goodsListParams }
    )
    const propertyResponse  = await $axios.$get(
      '/api/NetworkApi/property', 
      { params: { department } }
      )
    return {
      listData: resData,
      page: page * goodsListParams.pagesize,
      pagesize: +goodsListParams.pagesize,
      ListMenu: propertyResponse,
      curPage: +goodsListParams.page,
      params,
      query,
      department
    }
  },
  mounted() {
    this.items = this.itemCreate(this.$route)
  },
  methods: {
    handlePageChange(val) {
      this.$router.push({ query: {
        curPage: this.curPage,
        pageSize: this.pagesize,
      }})
      this.goodsList(this.$route)
    },
    itemCreate ( {params, path} ) {
      const item = [{
        text: 'HOME',
        disabled: false,
        href: '/'
      }]
      const keys = Object.keys(params)
      keys.forEach((e, i) => {
        if ( i === (keys.length - 1)) {
          item.push({
            text: params[e],
            disabled: true,
            href: path
          })
        } else {
          item.push({
            text: params[e],
            disabled: false,
            href: !i ?`/list/${params[e]}`:`/list/${params[keys[i - 1]]}/${params[e]}`
          })
        }
      })
      this.menuName = params.menuName
      this.className = params.className
      return item
    },
    async goodsList({params, query}) {
      const goodsListParams = {
        page: query.curPage || 1,
        pagesize: 21,
        department: params.menuName,
        category: params.childName,
        class: params.className
      }
      const { resData, page } = await this.$axios.$get(
        '/api/NetworkApi/new_goods_list_by_property', 
        { params: goodsListParams }
      )
      this.listData = resData
    },
    async showDialog (value,style) {
      this.QvDataStaus = true;
      this.dialogStatus = value;
      const { data }= await this.$axios.get(
        '/api/NetworkApi/quickView', 
        { params: { style } }
      )
      this.goodsInfoData = data;
      this.firstData = data.list[0];
      this.QvDataStaus = false;    
    },
    modifyStatus (value){
      this.dialogStatus = value;
    }
  },
}
</script>

<style lang="stylus" scoped>
.v-breadcrumbs
  padding: 10px;
  background: #f5f5f5;
  margin-bottom: 10px;
  min-height 2.1em
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
@media only screen and (max-width: 768px)
  .headr-url-title
    justify-content center
    border: none;
    h2
      font-size: 30px


.pagination-conten
  display flex
  justify-content flex-end
  margin 10px
  >>> .el-pagination
    display inline-block
.products-not
  display inline-block
  margin 20vh 0
</style>
