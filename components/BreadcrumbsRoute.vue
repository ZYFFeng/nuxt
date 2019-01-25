<template>
  <v-breadcrumbs 
    :items="items" 
    dork 
    divider="/"/>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  mounted() {
    this.items = this.itemCreate(this.$route)
  },
  methods: {
    itemCreate ({ params, path }) {
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
      return item
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
