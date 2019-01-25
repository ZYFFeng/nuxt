<template>
  <div class="coupon">
    <v-layout
      row
      wrap>
      <v-flex
        xs12
      >
        <v-breadcrumbs 
          :items="items" 
          dork 
          divider="/"/>
      </v-flex>
      <!-- title -->
      <v-flex xs12>
        <div class="headr-url-title">
          <h2>{{ $route.params.coupon }} </h2>
        </div>
      </v-flex>
      <v-flex
        v-for="item in listData"
        :key="item.code"
        class="pa-2 "
        lg3
        md4
        sm6
        xs12
      >
        <ListCard
          :large-image="item.img"
          :brand="item.discount"
          :title="`${item.show_time} PST -- ${item.shelf_time} PST`"
          :price="item.price"
          :is-deals="true"
          :navigation="item.buy_url"
          :deal-code="item.code"
          :color="item.color"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ListCard from '@/components/ListCard'
export default {
  async asyncData({$axios, route, store, env, query, req, res, redirect, error}) {
    const { id } = query
      const { list, status } = await $axios.$get(
        '/api/NetworkActiveApi/coupon', 
        { params: { id } } 
      )
      return {
        listData: list
      }
  },
  components: {
    ListCard
  },
  data() {
    return {
      items: [
        {
          text: 'HOME',
          disabled: false,
          href: '/'
        },
        {
          text: 'DEALS',
          disabled: false,
          href: '/deals'
        },
        {
          text: this.$route.params.coupon,
          disabled: true,
          href: `/deals/${ this.$route.params.coupon}`
        }
      ]
    }
  },
  mounted() {
    console.log(this.$route.params)
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
    em
      color: rgb(252, 140, 27);
      font-weight 800
</style>
