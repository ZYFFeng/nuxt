<template>

  <v-dialog
    v-model="dialogChild"
    :width="dialogWidth"
  >
    <v-card>
      <v-card-text>
        <div 
          class="goods-content">
          <div 
            v-show="QvDataStaus" 
            class="progress">
            <v-progress-circular
              :width="7"
              :size="70"
              color="#333"
              indeterminate
            ></v-progress-circular>
          </div>
          <v-layout class="row">
            <v-flex 
              sm7 
              px-3>
              <div class="modal-goodsImg">
                <div 
                  v-swiper:swiper="swiperOption"  
                  v-if="goodsInfoData.list"             
                  ref="swiperOption" 
                  class="swiper-container goods-slide-box"
                >
                  <ul                     
                    class="swiper-wrapper">
                    <li 
                      v-for="(item,index) in goodsInfoData.list[colorIndex].img_arr"
                      :key="index" 
                      class="swiper-slide" >
                      <a 
                        href="javascript:void(0);" 
                        class="item-box">
                        <img 
                          :key="index" 
                          :src="item.s3" 
                          class="img-responsive" 
                          @error="$event.target.src = item.amazon" />
                      </a>
                    </li>
                  </ul>										
                </div>	
                <ul 
                  ref="swiperPages" 
                  class="goods-slide-pages swiper-pages" ></ul>
                  <!--<swiper class="goods-slide-box" :options="ModalSlide" ref="myswiper3">
										<template v-for="item,index in goodsinfo.img_arr">
											<swiper-slide><a href="#" class="item-box"><img class="img-responsive" :key="index" :src="item.s3" @error="$event.target.src = item.amazon" /></a></swiper-slide>							
										</template>
									</swiper>-->							
              </div>
              
            </v-flex>
            <v-flex 
              sm5 
              px-3>
              <div class="goods-details">
                <div class="goods-title">
                  <h2>{{ goodsInfoData.name }} <v-icon class="fa fa-heart"></v-icon></h2>
                  <!--<p class="title-descration">Made in laty leaste preneey <br /> loafers</p>
										<div class="goods-id">ltem # 94796</div>-->
                </div>
                <div class="goods-price">
                  <ul>
                    <li>{{ firstData.price }}</li>
                  </ul>
                  <!-- $19.98 <span class="discount-text">50% off</span> -->
                </div>
                <!--<div class="view-full-details">
										<router-link :to="" >view-full-details</a>
									</div>-->
                <div class="goods-color">
                  <label>color&nbsp;&nbsp;&nbsp;<i>{{ goodsColor }}</i></label>
                  <ul class="color-option-list">											
                    <li 
                      v-for="(item,index) in goodsInfoData.list" 
                      :key="index"
                      :class="goodsColor === item.color?'active':''" 
                      @click="switchColor(goodsInfoData.list[index],item.color,index)">
                      <span>
                        <div class="option-wrap-style">
                          <img 
                            :src="item.LargeImage" 
                            class="img-responsive" />
                        </div>
                      </span>
                    </li>
                  </ul>
                </div>
                <div class="goods-size">
                  <div class="goods-details-title"><span>SIZE &nbsp;&nbsp;&nbsp;<i>{{ goodsSize }}&nbsp;B(M)US</i></span></div>
                  <ul class="size-option-list">
                    <li 
                      v-for="(item,index) in goodsInfoData.list[colorIndex].size" 
                      :key="index"
                      :class="{no_count:item.color_quntity===0,active:item.size===goodsSize && item.color_quntity!==0}" 
                      @click="switchSize(item,index)">{{ item.size }}</li>
                  </ul>				
                </div>
                <!--{{ModalSizeindex}}-->
                <!-- <div 
                  v-if="goodsInfoData.list[0].size" 
                  class="buy-btn">
                  
                  <router-link 
                    id="buy-at-amazon" 
                    :to="{path:'/Details',query:{style:productstyle,prent_section:this.$route.params.menu_name}}" 
                    class="btn btn-default">VIEW DETAILS</router-link>
                  <a 
                    id="view-details" 
                    :href="goodsInfoData.list[0].size[Sizeindex].buy_url" >BUY AT AMAZON</a>
                </div> -->
              </div>
            </v-flex>
          </v-layout>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
		name: 'Dialogs',
    props: {
      goodsInfoData: {
        type: Object,
        default:() => {}
      },
      firstData: {
        type:Object,
        default:() => {}
			},
			dialogStatus: {
				type: Boolean,
				default:() => false
			},
			dialogWidth: {
				type: Number,
				default: () => 930
			},
			QvDataStaus: {
				type: Boolean,
				default: () => true
			} 
		},
		data (){
			return {
				dialogChild: false,
				colorIndex:0,
				goodsSize:"",
				goodsColor:"",
				swiperOption: {
					autoHeight:true,
					observer:true,
					observeParents:true,
					pagination:{
							el:'.goods-slide-pages',
							clickable:true,
							renderBullet:(index, className) => {				
									return `<li class="${className} thumbnail" ><span><img class="img-responsive" src="" /></span></li>`;											
							}
					}
				}
			}
		},
		watch: {
			dialogStatus (value) {
				this.dialogChild = value;
			},
			dialogChild (value) {
				this.$emit('modifyStatus', value);
			},
			firstData (value){
				this.goodsSize = "";
				this.switchColor(value);
			}
		},
		mounted (){
			// this.$nextTick(() => {
      //   const swiperOption = this.$refs.swiperOption.swiper
			// 	const swiperPages = this.$refs.swiperPages.swiper
			// 	console.log(swiperOption,swiperPages);
      //   swiperOption.controller.control = swiperPages
      //   swiperPages.controller.control = swiperOption
      // });
		},
    methods:{
				async switchColor(value,color,index) {								
					this.goodsColor = await color || value.color;
					this.colorIndex = await index || 0;
					let mySwiperPages = await this.$refs.swiperPages.children;
					Array.from(mySwiperPages).forEach((li,index) =>  {
						li.firstElementChild.firstElementChild.setAttribute('src',`${value.MediumImage[index].amazon}`);
					});						
			},
			switchSize (){
				
			}
    }
  }
</script>

<style lang="stylus" scope>
@font-face {
	font-family: MontserratLight;
	src:url('../assets/font/Montserrat-Light.otf');
}
ul,li
	padding 0
i
	font-style normal
.img-responsive
	display block
	max-width 100%
	height auto
#modal{
	font-family:"MontserratLight" !important;
}
#modal .goods-content{
	padding:20px;	
	position:relative;
}
.progress
	width 100%;
	height 100%;
	// background:rgba(0,0,0,0.45);
	position absolute
	z-index 9
	top: 0
	left: 0
	right: 0
	bottom: 0
	background: rgba(218, 217, 217, 0.64);
	.v-progress-circular
		position absolute
		left 50%
		top 50%
		transform translate(-50%,-50%)

.modal-lg{
	width:1024px;
}

.goods-slide-box{
	height:500px;
}
.goods-slide-box .item-box{
	position:relative;
	display:block;
	height:500px;
}
.goods-slide-box .swiper-slide img{
	margin:auto;
	position:absolute;
	left:0;
	top:0;
	right:0;
	bottom:0;
	
}
.view-full-details{
	margin:6px 0;
	overflow:hidden;
}
.view-full-details a{
	float:right;
	text-decoration:underline !important;
}


.modal-goodsImg ul.swiper-pages{
	display:flex;
	width:100%;
	margin-top:20px;
}
.goods-slide-pages li{
	width:16.66666666666667%;
	background:none;
	height:60px;
	border:none;
	border-bottom:2px solid transparent;
	transition:border-color 0.5s;
	border-radius:0;
	outline:none;
	position:relative;
}
.goods-slide-pages li:active{
	background:none;
	box-shadow:none;
}
.goods-slide-pages li.swiper-pagination-bullet-active{
	border-color:#fc8c1b;
}
.goods-slide-pages li span{
	display:block;
	width:100%;
	position:absolute;
	top:50%;
	left:0;
	transform:translateY(-50%);
	padding:4px;
}
.goods-slide-pages li img{
	display:block;
	margin:0 auto;
	max-height:50px;
}	


.goods-title h2{
	font-size:24px;
	color:#000;
	text-transform:none;
}
.goods-title h2 i{
	margin-left:20px;
	color:#9a9a9a;
}
.goods-title .title-descration{
	font-size:21px;
}
.goods-title .goods-id{
	margin-top:8px;
}

.goods-price{
	margin-top:26px;
	font-size:20px;
	font-weight:bold;
}
.discount-text{
	background:#fff3e3;
	padding:5px 15px;
}
.goods-size{
	margin-top:23px;
}
.goods-info label,.goods-color label{
	font-weight:normal;
	font-size:14px;
	text-transform:uppercase;
}
.goods-color label{
	margin-bottom:10px;
}
.goods-color{
	margin-top:26px;
}
.goods-color label i,.goods-size i{
	color:#b9b9b9;
}


.color-option-list{
    overflow: hidden;
}
.color-option-list li{
    margin:0 2px 6px 0;
    float: left;
}
.color-option-list li span{
    width:48px;
    height:48px;
    display:block;
}
.color-option-list .option-wrap-style{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid transparent;
    transition: border 0.6s;
   	position:relative;
   	overflow:hidden;
}
.color-option-list li span img{
    cursor:pointer;
    position:absolute;
  	top:50%;
    left:50%;
		padding:5px;
    transform:translate(-50%,-50%);
    max-height:34px;
}
.color-option-list li.active .option-wrap-style {
    border-color:#767676;
}
.goods-details{
	padding-bottom:30px;
}
.goods-details-title{
	margin-bottom:18px;
}
.goods-details-title a{
	float:right;
}
.goods-size ul{
	overflow:hidden;
}
.goods-size li{
	width:40px;
	height:40px;
	background:#fff;
	border:1px solid #2d2d2d;
	margin:0 8px 8px 0;
	text-align:center;
	float:left;
	line-height:38px;
	transition:all 0.5s;
	cursor:pointer;
}
.goods-size li:hover{
	background:#2d2d2d;
	color:#fff;
}
.goods-size li.no_count{
	opacity:0.6;
	border-color:rgba(0,0,0,0.4);
}
.goods-size li.no_count:hover{
	background:none;
	color:#000;
}
.goods-size li.active{
	background:#2d2d2d;
	color:#fff;
}
.buy-btn{
	margin-top:46px;
	overflow:hidden;
}
.buy-btn>a#buy-at-amazon{
	border-color:#2d2d2d;
	height:44px;
	display:block;
	width:100%;
	float:left;
	line-height:30px;
	max-width:192px;
	transition:all .3s; 
	border-radius:0;
	background:#2d2d2d;	
	color:#fff;
}
.buy-btn>a#view-details{
	border-bottom:1px solid #000;
	float:left;
	line-height:18px;
	margin-top:14px;
	margin-left:20px;
}
.btn-add-bag>i{
	margin-right:16px;
}

.goods-info-group{
	margin-top:20px;
}
.goods-info-group .item-title{
	margin-bottom:6px;
}

.goods-info-group .item-body li{
	line-height:23px;
	margin-bottom:6px;
}
.goods-info-group .item-body li:before{
	content:"";
	display:inline-block;
	width:6px;
	height:6px;
	border-radius:50%;
	background:#b4b4b4;
	margin:0 10px 3px 0;
}
.description li:first-child{
	margin-bottom:20px;
}
</style>
