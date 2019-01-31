<template>
  <div class="details">
    <v-layout
      justify-center
      row
      wrap>
      <v-flex
        xs12
        sm7>
        <DetailsChoose
          v-if="list && list.length !== 0"
          :banner="list[selectIndex].HiResImage"
        />
      </v-flex>
      <v-flex
        offset-sm1
        sm4
        xs12>
        <DetailsSKU
          :title="detailsData.name"
          :start="+detailsData.avg_start"
          :count="detailsData.count + ' Reviews'"
          :description="detailsData.description"
          :details-list="detailsData.list"
          :select-index="selectIndex"
          @handleColorSelect="handleColorSelect"
        />
      </v-flex>
      <v-flex 
        ref="navigation"
        :class="{'fixedEvent' : isFixed}"
        class="navigation my-5"
        xs12 
        d-flex 
        justify-space-between>
        <a 
          class="text-xs-center" 
          href="#Description">Description</a>
        <a 
          class="text-xs-center" 
          href="#Related">Related</a>
        <a 
          class="text-xs-center" 
          href="#Reviews">Reviews</a>
        <a 
          class="text-xs-center" 
          href="#Q&A">Q&A</a>
      </v-flex>
      <v-flex 
        id="Description" 
        :class="{'pt-5': isFixed}"
        xs12>
        <v-img 
          :src="detailsData.a_add" 
          @error="$event.target.src = detailsData.no_a_add"/>
      </v-flex>
      <v-flex 
        id="Related" 
        class="pa-5 mt-4">
        <h1 class="text-xs-center" >Related</h1>
        <HomeProductCarousel
          :banners="recommendList"
        />
      </v-flex>
      <v-flex 
        id="Reviews" 
        xs12>
        <div class="reviews-title">
          <h2>Reviews</h2>
          <v-rating
            :value="+detailsData.avg_start"
            class="pa-0 font-weight-bold"
            background-color="yellow darken-2 "
            color="yellow darken-2"
            size="15"
            half-increments
            readonly
          ></v-rating>
        </div>
        <template v-for="item in commentList">
          <CommentList
            :key="item.rev_content"
            :title="item.rev_title"
            :start="+item.rev_comment_stars"
            :time="item.rev_time"
            :nickname="item.rev_nickname"
            :prosize="item.rev_prosize"
            :content="item.rev_content"
            :color="item.rev_procolor"
          />
        </template>
      </v-flex>
      
      
      <el-pagination
        v-if="page !== 0"
        :total="detailsData.count"
        :page-size="pageSize"
        :current-page.sync="page"
        :small="$store.state.windowSize.x < 900"
        layout="prev, pager, next"
        @size-change="handlePageChange"
        @current-change="handlePageChange"/>

      <v-flex xs12>
        <h2 
          id="Q&A" 
          class="text-xs-center mt-5">Q&A</h2>
        <h3 class="text-xs-center">There are no customer Q&As yet.</h3>
      </v-flex>
    </v-layout>
   
  </div>
</template>

<script>
import DetailsChoose from '@/components/Carousel/Details'
import HomeProductCarousel from '@/components/Carousel/HomeProductCarousel'
import DetailsSKU from '@/components/DetailsSKU'
import CommentList from '@/components/CommentList'
import { throttle } from '@/utils'
export default {
  components: {
    DetailsChoose,
    DetailsSKU,
    HomeProductCarousel,
    CommentList,
  },
  data() {
    return {
      selectIndex: 0,
      offsetTop: 0,
      isFixed: false,
      elOffsetTop: 0,
      page: 1,
      pageSize: 5,
      commentList: []
    }
  },
  async asyncData({ $axios, query }) {
    const { style } = query

    try {
      const data = await $axios.$get('/api/NetworkApi/goods_detail',
        { params: { style } }
      )
      const { list } = await $axios.$get('/api/NetworkApi/recommend',
        { params: { style } }
      )
      return {
        detailsData: data,
        list: data.list,
        recommendList: list
      }
    } catch (error) {
      return {
        error
      }
    }
    
  },
  mounted() {
    window.onscroll = throttle( e => {
        this.onScroll(e)
      }
    )
    this.getCommentList()
  },
  methods: {
    handleColorSelect(i) {
      this.selectIndex = i
    },
    onScroll (e) {
      this.offsetTop = window.pageYOffset  //用于FF
              || document.documentElement.scrollTop  
              || document.body.scrollTop
      this.$nextTick(_ => {
        this.elOffsetTop = this.elOffsetTop === 0 ? this.$refs.navigation.offsetTop : this.elOffsetTop
        this.isFixed = this.offsetTop > this.elOffsetTop
      })
    },
    async getCommentList() {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        style: this.$route.query.style
      }
      const { data:{ data }} = await this.$axios.get(
        '/api/NetworkApi/commentList?style=SHOO&page=1&pageSize=5', {
          params
        })
      this.commentList = data
      console.log(this.commentList)
    },
    handlePageChange(val) {
      this.page = val
      this.getCommentList()
    }
  }
}
</script>

<style lang="stylus" socped >
  .details {
    max-width: 1170px !important;
    margin 0 auto
  }
.details
  .el-pagination
    .el-pager li.active
      background #333
      color #ffffff
.navigation
  a
    border-right 1px solid #bdbdbd
    &:last-child
      border-right none

.fixedEvent
  position fixed
  top 0
  left 0
  right 0
  z-index 20
  margin 0 !important
  padding 10px
  width: 100%
  box-shadow: 1px 0 5px #bdbdbd
  background #ffffff

.reviews-title
  display flex
  justify-content center
  align-content center
  flex-direction column
  >h2
    text-align center
  >.v-rating
    text-align center
#Reviews
 .v-rating 
    .v-icon
      padding 0 !important
</style>
