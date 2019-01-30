<template>
  <div class="list">
    <v-layout 
      row 
      wrap>
      <!-- breadcrumbs -->
      <v-flex xs12>
        <BreadcrumbsRoute/>
      </v-flex>
      <!-- title -->
      <v-flex xs12>
        <div class="headr-url-title">
          <h2 v-if="menuName !== 'NEW' && menuName !=='new'">
            {{ menuName === 'BRANDS' ? 'BRAND' : menuName }}'S SHOES
          </h2>
          <h2 v-else-if="className">{{ menuName }} {{ className }}</h2>
          <h2 v-else>NEW ARRIVALS</h2>
        </div>
      </v-flex>
      <!-- mdMenu -->
      <v-flex 
        ref="menu" 
        xs12
        class="hidden-sm-and-up">
        <ListMenuMobile
          :price-filter="ListMenu.price"
          @handlePrice="handlePrice"
        />
        <v-chip
          v-model="chip"
          close
        >{{ $route.query.show }}
        </v-chip>
      </v-flex>
      <!-- pcMenu ListCard chip pagination-->
      <v-layout 
        justify-space-around 
        row 
        wrap>
        <v-flex 
          ref="ListMenu"
          class="  hidden-xs-only"
          xl2
          lg3
          md4
          sm4
          xs3>
          <ListMenu
            :style="{ width : `${ListMenuWidth}px` }"
            :class="{'fixedEvent':isFixed}"
            :color="ListMenu.color"
            :category="ListMenu.category"
            :price="ListMenu.price"
            :menu-name="menuName"
            @handlePrice="handlePrice"
          />
          
        </v-flex>
        <v-flex
          xs12
          sm8
          md8
          lg9
        > 
          <!-- pagination chip-->
          <v-layout 
            class="pagination-conten">
            <div 
              class="refined">
              <div 
                v-show="chip" 
                class="hidden-xs-only">
                <span >Refined by：</span>
                <v-chip
                  v-model="chip"
                  close
                >{{ $route.query.show }}
                </v-chip>
              </div>
            </div>
            <el-pagination
              v-if="page !== 0"
              :total="total"
              :page-size="pageSize"
              :current-page.sync="page"
              :small="$store.state.windowSize.x < 900"
              layout="prev, pager, next"
              @size-change="handlePageChange"
              @current-change="handlePageChange"/>
          </v-layout>
          <v-layout 
            v-if="listData.length === 0" 
            justify-center>
            <h2 class="products-not"> WE ARE SORRY, NO PRODUCTS FOUND  :( </h2>
          </v-layout>
          <v-layout 
            v-else
            class="listData-content"
            row 
            wrap>
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
              class="px-2 pb-2"
              lg4
              md6
              sm6
              xs6
            >
              <ListCard
                :large-image="item.LargeImage"
                :list-style="item.style"
                :brand="item.brand"
                :title="item.title"
                :price="item.price"
                :color="item.color"
                :navigation="`/Details/?style=${item.style}&parent=${menuName}`"
                @handleQuickView="handleQuickView"
              />
            </v-flex>
          </v-layout>
        </v-flex>
       
      </v-layout>
      <!-- pagination -->
      <v-flex 
        v-if="page !== 0" 
        xs12
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
            :menu-name="menuName"
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
import ListMenu from '@/components/ListMenu'
import ListMenuMobile from '@/components/ListMenuMobile'
import BreadcrumbsRoute from '@/components/BreadcrumbsRoute'
import { throttle, delUndefined } from '@/utils'
import DetailsChoose from '@/components/Carousel/Details'
import DetailsSKU from '@/components/DetailsSKU'
export default {
  validate({ params, query }){
    if (params.menuName) {
      return true
    } else {
      return false
    }
  },
  async asyncData({  params, query, error, $axios }) {
    const Params = {
      page: query.page || 1,
      pageSize: 21,
      department: params.menuName,
      category: params.childName,
      class: params.className
    }

    const goodsListParams = {...Params, ...query}
    const { department } = goodsListParams

    try {
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
        ListMenu: propertyResponse,
        pageSize: +goodsListParams.pageSize,
        page: +goodsListParams.page,
        total: page * goodsListParams.pageSize,
        menuName: department
      }
    } catch (e) {
      error({ statusCode: 500, message: e.message })
    }
  },
   components: {
    ListCard,
    DetailsChoose,
    DetailsSKU,
    ListMenu,
    ListMenuMobile,
    BreadcrumbsRoute
  },
  data() {
    return {
      menuName: '',
      className: '',
      priceShow: '',
      chip: false,
      progressVisible: false,
      dialogProgress: false,
      scrollTop: 0,
      isFixed: false,
      ListMenuWidth: 0,
      items: [],
      detailsData: {},
      list: [],
      dialog: false,
      selectIndex: 0,
      productStyle: ''
    }
  },
  watch: {
    'chip'(val) {
      if (!val) {
        this.routerPush({})
        this.goodsList()
      }
    },
    '$route'(val){
      // console.log(this.getRouterQuery())
      // this.goodsList()
    }
  },
  mounted() {
    this.$nextTick(_ => {
      this.ListMenuWidth = this.$refs.ListMenu.offsetWidth -16
      this.chip = !!this.$route.query.show
      window.onscroll = throttle(() => {
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop 
        this.isFixed = this.scrollTop > 300
        this.ListMenuWidth = this.$refs.ListMenu.offsetWidth -16
      })
    })
  },
  methods: {
    handleColorSelect(i) {
      this.selectIndex = i
    },
    handlePrice(obj) {
      this.chip = true
      const priceQuery = delUndefined(obj)
      this.routerPush(priceQuery)
      this.goodsList(priceQuery)
    },
    handlePageChange(val) {
      const query = this.getRouterQuery()
      query.page = val
      query.pageSize = query.pageSize ? query.pageSize : 21
      this.routerPush(query)
      this.goodsList(query)
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
    async detailsView(style) {
      const { data } = await this.$axios.get(
        '/api/NetworkApi/quickView', 
        { params: { style } }
      )
      this.detailsData = data
      this.list = data.list
      this.dialogProgress = false
    },
    async goodsList( query = { page: 1, pageSize: 21}, isRoute) {
      this.progressVisible = true
      const { params } = this.$route
      const goodsListParams = {
        department: params.menuName,
        category: params.childName,
        class: params.className
      }
      const parameter = { ...goodsListParams, ...query }
      const { data: { resData, page } } = await this.$axios.get(
        '/api/NetworkApi/new_goods_list_by_property', 
        { params: parameter }
      ) 
      this.page = +query.page
      this.pageSize = +query.pageSize
      this.total = page * query.pageSize
      this.listData = resData
      this.progressVisible = false
    },
    getRouterQuery () {
      return delUndefined(this.$route.query)
    },
    routerPush(query) {
      this.$router.push({ query })
    }
  }
}
</script>

<style lang="stylus" scoped>
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
  min-height 40px
  display flex
  justify-content space-between
  align-items center
  margin 10px
  >>> .el-pagination
    display inline-block


.products-not
  display inline-block
  margin 20vh 0


.pagination-rigth
  display flex
  justify-content flex-end
  margin 10px


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

.fixedEvent
  position fixed
  max-height 92vh
  overflow-y scroll
  top 20px
  z-index 9
/* 设置滚动条的样式 */
::-webkit-scrollbar 
  width:12px;

/* 滚动槽 */
::-webkit-scrollbar-track 
  -webkit-box-shadow: inset006pxrgba(0,0,0,0.3);
  border-radius:10px;

/* 滚动条滑块 */
::-webkit-scrollbar-thumb 
  border-radius:10px;
  background:rgba(0,0,0,0.1);
  -webkit-box-shadow: inset006pxrgba(0,0,0,0.5);
.list /deep/ .theme--light.v-sheet
  background #fff


</style>
