<template>
  <div class="sizeChart">
    <v-dialog
      v-model="isShowStatus"
      :width="dialogWidth"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          <v-layout row>
            <v-flex>
              <h4 class="modal-title">Size Chart</h4>
            </v-flex>
            <v-flex class="text-xs-right">
              <button 
                type="button" 
                class="close" 
                @click="isShowStatus=false" 
              >
                <svg 
                  class="c-icon" 
                  version="1.1" 
                  viewBox="0 0 400 400">
                  <path 
                    role="presentation" 
                    d="M393.1,359.4L233.5,200L393.2,40.5c4.4-4.4,6.8-10.3,6.8-16.6c0-6.3-2.5-12.2-7-16.6c-4.4-4.4-10.6-7-16.8-7c-6.3,0-12.2,2.4-16.4,6.8L200,166.7L40.3,7.3c-4.4-4.4-10.4-6.9-16.7-6.9S11.3,2.8,6.9,7.3c-9.3,9.3-9.2,23.9,0.2,33.2l159.7,159.3L7.1,359.4c-4.5,4.5-7,10.5-7,16.9c0,6.2,2.4,12.1,6.9,16.5c4.4,4.4,10.4,6.9,16.7,6.9c6.2,0,12.1-2.4,16.7-6.9l159.9-159.5l159.5,159.3c4.5,4.5,10.5,7,16.8,7c6.1,0,12.1-2.5,16.4-6.8c4.4-4.4,6.9-10.3,6.9-16.5C400,370,397.6,364,393.1,359.4z"></path>
                </svg>
              </button>
            </v-flex>
          </v-layout>     
        </v-card-title>
        <v-card-text>
          <div class="size-content">
            <v-layout
              row
            >
              <v-flex 
                :class="SizeChat=='women'?'active':''"
                class="size-tab" 
                xs6 
                @click="SizeChat='women'">Women's size
              </v-flex>
              <v-flex 
                :class="SizeChat=='men'?'active':''"
                class="size-tab" 
                xs6 
                @click="SizeChat='men'">Men's sizes
              </v-flex>
            </v-layout>
            <div class="size-content-box">
              <div 
                v-show="SizeChat=='women'" 
                class="women table-responsive">
                <v-data-table
                  :headers="TableData.headers"
                  :items="TableData.women"
                  hide-actions
                  class="elevation-1"
                >
                  <template 
                    slot="items" 
                    slot-scope="props">
                    <td>{{ props.item.size }}</td>
                    <td>{{ props.item.heelToToe }}</td>
                    <td>{{ props.item.European }}</td>
                    <td>{{ props.item.GreatBritain }}</td>
                    <td>{{ props.item.Mexico }}</td>
                  </template>
                </v-data-table>
              </div>
              <div 
                v-show="SizeChat=='men'" 
                class="men">
                <v-data-table
                  :headers="TableData.headers"
                  :items="TableData.men"
                  hide-actions
                  class="elevation-1"
                >
                  <template 
                    slot="items" 
                    slot-scope="props">
                    <td>{{ props.item.size }}</td>
                    <td>{{ props.item.heelToToe }}</td>
                    <td>{{ props.item.European }}</td>
                    <td>{{ props.item.GreatBritain }}</td>
                    <td>{{ props.item.Mexico }}</td>
                  </template>
                </v-data-table>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import data from '@/assets/sizeChartData'
export default {
  name: 'PicturesContainer',
  props: {
    isShowDialog: {
      type: Boolean,
      default: () => false
    },
  },
  data () {
    return{
      isShowStatus: false,
      dialogWidth: 900,
      TableData: data(),
      SizeChat: 'women'
    }
  },
  watch:{
    isShowDialog (value) {
      this.isShowStatus = value;
    },
    isShowStatus (value){
      this.$emit("modifyStatus",value)
    }
  }
}
</script>

<style lang="stylus" scoped>
.sizeChart
  background red
.size-content
	margin-top 6px


.size-tab
  margin 0 -1px
  padding-bottom 13px
  font-size 21px
  border-bottom 1px solid transparent
  box-shadow 0 1px 0 0 #767676
  color #767676
  cursor pointer
  transition border-color .3s

.size-tab.active
  border-color #3A2E2C
  box-shadow 0 1px 0 0 #3A2E2C
  color #3A2E2C

.close
  font-size 21px
  font-weight 700
  line-height 1
  color #000
  text-shadow 0 1px 0 #fff
  text-align right

.c-icon
  width 20px
  height 20px
  fill #7f7776

.text-black{
  color:#333;
}
</style>
