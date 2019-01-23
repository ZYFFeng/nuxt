<template>
  <div class="list">
    <v-layout 
      row 
      wrap>
      <!-- breadcrumbs -->
      <v-flex xs12>
        <v-breadcrumbs 
          :items="items" 
          dork 
          divider="/"/>
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
      
      <!-- pcMenu ListCard chip pagination-->
      <v-layout 
        justify-space-around 
        row 
        wrap>
        <v-flex 
          ref="ListMenu"
          class=" pr-3 hidden-xs-only"
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
            :menu-name="department"
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
              v-show="priceShow !== '' " 
              class="refined">
              <span >Refined by：</span>
              <v-chip
                v-model="chip"
                close
              >{{ $route.query.show }}
              </v-chip>
            </div>
            <el-pagination
              v-if="page !== 0"
              :total="page"
              :page-size="pageSize"
              :current-page.sync="curPage"
              small
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
                :brand="item.brand"
                :title="item.title"
                :price="item.update_sale_price"
                :color="item.color"
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
          :total="pages" 
          :page-size="pageSize" 
          :current-page.sync="curPage" 
          small
          layout="prev, pager, next"
          @size-change="handlePageChange"
          @current-change="handlePageChange"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ListCard from '@/components/ListCard'
import ListMenu from '@/components/ListMenu'
import { throttle, delUndefined } from '@/utils'
export default {
  components: {
    ListCard,
    ListMenu
  },
  data() {
    return {
      menuName: '',
      className: '',
      chip: true,
      progressVisible: false,
      scrollTop: 0,
      isFixed: false,
      ListMenuWidth: 0,
      items: []
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
      pages: page * goodsListParams.pageSize,
      pageSize: +goodsListParams.pageSize,
      curPage: +goodsListParams.page,
      department,
      priceShow: query.show || '',
      ListMenu: propertyResponse,
    }
  },
  mounted() {
    this.items = this.itemCreate(this.$route)
    this.ListMenuWidth = this.$refs.ListMenu.offsetWidth -16
    window.addEventListener('scroll', throttle(() => {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop 
      this.isFixed = this.scrollTop > 300
    }, true))
  },
  methods: {
    handlePrice(obj) {
      const priceQuery = delUndefined(obj)
      this.routerPush(priceQuery)
      this.goodsList(priceQuery)
    },
    handlePageChange(val) {
      this.progressVisible = true
      const query = this.getRouterQuery()
      query.page = val
      query.pageSize = query.pageSize ? query.pageSize : 21
      this.routerPush(query)
      this.goodsList(query)
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
    async goodsList( query ) {
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
      console.log(query)
      this.pages = query.page
      this.pageSize = query.pageSize
      this.listData = resData
      this.pages = page * query.pageSize
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
  height 92vh
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

  
</style>
