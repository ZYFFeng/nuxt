<template>
  <footer class="main-footer" >
    <div class="container layout-contaier">	
      <div class="connect-with">
        <!--<div class="connect-with-title">
						<h2>{{footerData.title}}</h2>	
						<p>{{footerData.description}}</p>
					</div>
					<div class="foot-search">
						<div class="foot-search-box">
							<input class="form-control" type="search"  v-model="email" placeholder="Enter your email" />
							<button class="btn btn-group" type="button" @click="sendEmail(email)">SUBSCRIBE</button>
						</div>
						<div class="foot-descration">
							<p>Be the first to know about new arrivals and exclusive sales.</p>
							<p>and agree to our <a href="#">Terms of use &  terms of sale</a>and <a href="">Privacy policy</a></p>
						</div>
					</div>-->
        <div class="_form_14"/>
        <div class="footer-links hidden-sm-and-up">
          <a 
            target="_blank" 
            href="https://www.facebook.com/DreamPairs"><i class="fab fa-facebook-f"/></a>
          <a 
            target="_blank" 
            href="https://www.instagram.com/dreampairsshoes/"><i class="fab fa-instagram"/></a>			
          <a 
            target="_blank" 
            href="https://www.youtube.com/channel/UCjeu1MJuZnVB2sMjE2uX7wQ"><i class="fab fa-youtube"/></a>
          <a 
            target="_blank" 
            href="https://twitter.com/DreamPairs"><i class="fab fa-twitter"/></a>
        </div>		
        <div class="footer-menu">      
          <div 
            v-for="(item,key) in footerData.list" 
            :key="key"
            class="footer-menu-item hidden-xs-only">
            <h4>{{ key }}</h4>
            <ul>
              <li 
                v-for="children in item" 
                :key="children.name">
                <a 
                  v-if="children.name !== 'Size Chart'" 
                  :href="children.url" >{{ children.name }}</a>
                <a 
                  v-else 
                  href="javascript:void(0)" 
                  data-toggle="modal" 
                  data-target="#goods-details-size">{{ children.name }}</a>
              </li>
            </ul>
          </div>       
          <div class="footer-moblie hidden-sm-and-up">
            <ul>
              <template v-for="item in footerData.allList">
                <li 
                  v-for="children in item" 
                  :key="children.name">
                  <a 
                    v-if="children.name !== 'Size Chart'" 
                    :href="children.url" >{{ children.name }}</a>
                  <a 
                    v-else 
                    href="javascript:void(0)" 
                    data-toggle="modal" 
                    data-target="#goods-details-size">{{ children.name }}</a>
                </li>
              </template>				
            </ul>
          </div>
        </div>
      </div>		
    </div>
  </footer>
</template>
<script>
export default {  
  name: "Footer",
  data() {
    return{
      title: '',
			footerData: {},
			trackByDefault: true
    }
  },
  async mounted() {
		//请求底部导航数据
    const { data } = await this.$axios.get('/mall/home/bottom')
		this.footerData = data.data
		this.createScript()
		// 网站底部收集邮箱js代码
		if (this.trackByDefault || /(^| )ac_enable_tracking=([^]+)/.test(document.cookie)) {
	    this.acEnableTracking()
		}	
			
  },
  methods:{
    acTrackVisit() {
		    const trackcmp_email = ''
		    const trackcmp = document.createElement("script")
		    trackcmp.async = true
		    trackcmp.type = 'text/javascript'
		    trackcmp.src = '//trackcmp.net/visit?actid=251758629&e='+encodeURIComponent(trackcmp_email)+'&r='+encodeURIComponent(document.referrer)+'&u='+encodeURIComponent(window.location.href)
		    const trackcmp_s = document.getElementsByTagName("script")
		    if (trackcmp_s.length) {
		        trackcmp_s[0].parentNode.appendChild(trackcmp)
		    } else {
		        const trackcmp_h = document.getElementsByTagName("head")
		        trackcmp_h.length && trackcmp_h[0].appendChild(trackcmp)
		    }
		},
		acEnableTracking() {
		    const expiration = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30)
		    document.cookie = "ac_enable_tracking=1 expires= " + expiration + " path=/"
		    this.acTrackVisit()
		},
		createScript () {
			const trackcmp = document.createElement("script")
			trackcmp.async = true
			trackcmp.src = "https://dreampairs.activehosted.com/f/embed.php?id=14"
			const trackcmp_s = document.getElementsByTagName("script")
	    if (trackcmp_s.length) {
	        trackcmp_s[0].parentNode.appendChild(trackcmp)
	    } else {
	        const trackcmp_h = document.getElementsByTagName("head")
	        trackcmp_h.length && trackcmp_h[0].appendChild(trackcmp)
	    }
		},
  }
}
</script>
<style lang="stylus" socped>
li 
	list-style none
.main-footer{
	margin-top:80px
	padding:60px 0
	background:#f4f1ec
}
.connect-with-title{
	text-align:center
	color:#000
}
.connect-with{
	max-width:980px
	margin:0 auto
}
.connect-with h2{
	font-size:26px
	margin-bottom:16px
}
.foot-search{
	max-width:450px
	margin:0 auto
}
.foot-search-box{
	margin-top:30px
	display:flex
}
.foot-search-box input{
	height:43px
	max-width:300px
	border-color:#000
	background-color:#f4f1ec
	border-radius:0
	/*box-shadow:0 0 5px rgba(0,0,0,0.5)*/
}
.foot-search button{
	height:43px
	background:#000
	width:148px
	border-radius:0
	color:#badcbb
}
.foot-search button:active,.foot-search button:hover,.foot-search button:visited{
	color:#badcbb
}
.foot-descration{
	display:inline-block
	margin:10px auto
	color:#8a8a8a
	font-size:12px
}
.foot-descration a{
	border-bottom:1px solid #b4b4b4
	color:#6d6d6d
	margin:0 3px
}


._inline-form ._full_width{
	float:left !important
	display:block !important
	width:auto !important
}
._inline-form ._field-wrapper input[type="text"]{
	width:240px !important
	padding:10px 12px !important
}
._inline-form ._button-wrapper{
	margin:25px 12.5px 0 20px !important
}
._inline-form{
	padding:0 !important  
	margin:0 auto !important
}
._inline-form ._form-content ._html-code p{
	font-size:16px !important
	text-align:center
}
._inline-form ._form-title{
	text-align:center !important
}
._inline-form ._html-code{
	margin-bottom:23px
}
@media only screen and (max-width:768px) {
	._inline-form ._button-wrapper button[type="submit"]{
		font-size:14px !important
		width:110px
		padding:6px !important
	}
	._button-wrapper{
		text-align:center
	}
	._inline-form ._field-wrapper input[type="text"]{
		width:100% !important
	}
	._inline-form ._form-content ._html-code p{
		font-size:14px !important
	}
	._inline-form ._html-code{
		margin-bottom:10px
	}
}



.footer-menu{
	margin:60px auto 0
	border-top:1px solid #c1c1c1
	padding-top:30px
	display:flex
}
.footer-menu-item{
	width:100%
}

.footer-menu h4{
	font-size:18px
	font-weight:bold
}
.footer-menu ul{
	margin-top:10px
	padding:0
}
.footer-menu ul li{
	line-height:30px
}
.footer-menu{
	max-width:900px
}
.footer-links{
	text-align:center
	margin:36px 0
}
.footer-links a{
	font-size:28px
	display:inline-block
	margin:0 16px
}
.copyright{
	background:#333
	padding:14px 0
	font-size:13px
	color:#fff
}
.copyright .copyright-left{
	float:left
}
.copyright .copyright-left ul li{
	display:inline-block
	margin-right:8px
}
.copyright .copyright-left ul li a{
	color:#9c9c9c
	position:relative
	padding-right:6px
}
.copyright .copyright-left ul li a:after{
	content:""
	display:block
	position:absolute
	right:0
	top:50%
	margin-top:-3px
	width:1px
	height:10px
	background:#9c9c9c
}
.copyright .copyright-right{
	float:right
}

/*鞋子尺寸表格样式*/
.goods-details-size .modal{
	overflow:hidden
	padding:30px 0
}
.goods-details-size .modal-content{
	color:#3A2E2C
	overflow-y:scroll
	height:100%
}
.goods-details-size .modal-dialog{
	height:100%
}
.goods-details-size .modal-header{
	padding:15px 30px
	background:#f5f5f5
	border:none
}
.goods-details-size .c-icon{
	width:20px
	height:20px
	fill:#7F7776
}
.goods-details-size button.close{
	opacity:1
	margin-top:12px
}
.goods-details-size h4.modal-title{
	font-size:30px
	text-transform:none
}
.goods-details-size .modal-body{
	padding:15px 30px 15px
}
.modal-body-tips{
	padding:31px 0 40px
	font-size:16px
	border-bottom:1px solid #BAB6B5
}

.size-content{
	margin-top:6px
}
.size-tab span{
	width:50%
	display:block
	float:left
	margin:0 -1px
	padding-bottom:13px
	font-size:21px
	border-bottom:1px solid transparent
	box-shadow:0 1px 0 0 #767676
	color:#767676
	cursor:pointer
	transition:border-color .3s
}
.size-tab span.active{
	border-color: #3A2E2C
	box-shadow:0 1px 0 0 #3A2E2C
	color:#3A2E2C
}
.size-content-box{
	margin-top:20px
}
.size-content-box table{
	width:100%
	max-width:100%
}
.size-table tr th{
	font-weight:700
}
.size-table tr th,.size-table tr td{
	padding:12px
    line-height:1.42857143
    vertical-align:top
    font-size:12px
}

.return-policy{
	margin:50px 0 30px
}
.return-policy h4{
	color:#3A2E2C
	font-size:23px
	margin-bottom:22px
}
.return-policy-describe{
	font-size:16px
}
.return-policy-describe p{
	line-height:30px
}
.return-policy-describe a{
	display:inline-block
	border-bottom:1px solid #ccc
}
.disclaimer{
	margin-top:40px
}
.disclaimer a{
	margin:0 2px
}
.disclaimer i{
	float:left
	color:#3A2E2C
	margin-right:10px
	font-size:23px
	line-height:31px
}
.disclaimer i:before{
	display:block
}
/*鞋子尺寸表格样式*/

</style>
