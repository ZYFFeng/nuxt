<template>
  <v-layout>
    <v-flex 
      xs12 
      sm2
      offset-sm4>
      <v-card >
        <v-img
          src="https://s3-us-west-2.amazonaws.com/pix.dreampairshoes.com/Shop/Medium/49718-1610041-W-LT.GREY+PINK-SZ-5_nomal_1.jpg"
        />

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
            <div class="text-md-center">Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn 
            flat 
            color="orange">Share</v-btn>
          <v-btn 
            flat 
            color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'ListCard'

}
</script>

<style>

</style>
