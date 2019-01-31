<template>
  <v-layout
    wrap
    class="comment-list my-5"
  >
    <v-flex 
      xs12 
      class="font-weight-black">{{ title }}</v-flex>
    <v-flex 
      xs12 
      class="defailt-rating"> 
      <v-rating
        v-model="start"
        class="pa-0 font-weight-bold"
        background-color="yellow darken-2 "
        color="yellow darken-2"
        size="15"
        half-increments
        readonly>
      </v-rating>
      <span class=" ml-1">{{ start | formatting }}</span>
    </v-flex>
    <v-flex 
      xs12 
      sm2> {{ nickname }} </v-flex>
    <v-flex 
      xs12 
      sm10>{{ time }}</v-flex>
    <v-flex 
      sm2 
      xs12>size :<span class="ml-2">{{ prosize }}</span> </v-flex>
    <v-flex 
      sm10
      xs12 
    > {{ color }} </v-flex>
    <v-flex 
      class="content mt-1" 
      xs12> {{ content }} </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'CommentList',
  filters: {
    formatting (val) {
      return val + '.0'
    }
  },
  props: {
    title: {
      type: String,
      default: () => ''
    },
    start: {
      type: Number,
      default: () => 0 
    },
    time: {
      type: String,
      default: () => ''
    },
    nickname: {
      type: String,
      default: () => ''
    },
    color: {
      type: String,
      default: () => ''
    },
    prosize: {
      type: String,
      default: () => ''
    },
    content: {
      type: String,
      default: () => ''
    }
  },
}
</script>

<style lang="stylus" scoped>
.comment-list
  font-family: MontserratLight
  line-height 30px
  color #333
.comment-list
  >>> .v-rating 
        .v-icon
          padding 0 !important
.defailt-rating
  display flex
  height 40px
  align-items center
  .v-rating
    display flex

.content
  line-height 1.2
</style>
