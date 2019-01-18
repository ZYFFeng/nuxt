<template>
  <div class="list">
    <v-breadcrumbs 
      :items="items"
      dork 
      divider="/"/>
    <ListCard/>
  </div>
</template>

<script>
import ListCard from '@/components/ListCard'
export default {
  components: {
    ListCard
  },
  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        href: 'breadcrumbs_dashboard'
      },
      {
        text: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1'
      },
      {
        text: 'Link 2',
        disabled: true,
        href: 'breadcrumbs_link_2'
      }
    ]
  })
}
</script>

<style>

</style>
