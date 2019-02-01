<template>
  <div>
    <div class="container">
      <div class="contact">
        <div class="row">
          <div class="col-sm-5">
            <div class="contact-img">
              <img 
                :src="screenWidth < 768 ? require('../assets/img/contact-m.png') : require('../assets/img/contact.png')"
                class="img-responsive center-block" />
            </div>
          </div>
          <div class="col-sm-7">
            <div class="contact-contaier">			
              <div class="title">
                <h2>WE ARE HERE TO HELP!</h2>
              </div>
              <div class="contact-email">
                <h3>EMAIL</h3>
                <p>General inquries: support@dreampairshoes.com</p>
                <p>Marketing collaboration: MarkCom@dreampairshoes.com</p>
              </div>
              <div class="social-media">
                <h3>SOCIAL MEDIA</h3>
                <p>Send direct message to Dream Pairs Shoes on Facebook. Inquries are generally answered within 1 business day.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
	data(){
		return {
			screenWidth: this.$store.state.windowSize.x
		}
	}
}
</script>

<style>
.contact{
	margin:0.39rem 0 0.52rem;
}
.contact-img img{
	width:100%;
}
.contact-contaier{
	padding-left:0.208rem;
}
.contact-contaier .title{
	font-size:46px;
	margin-bottom:0.46rem;
}
.contact-contaier h3{
	font-size:23px;
	font-weight:bold;
	letter-spacing:2px;
	margin-bottom:0.145rem;
}
.contact-email p{
	margin-bottom:14px;
}
.contact-email{
	margin-bottom:0.52rem;
}
.contact-email p,.social-media p{
	font-size:20px;
}
@media only screen and (max-width:1200px){
	.contact-contaier .title{
		font-size:30px;
	}
	.contact-contaier h3{
		font-size:18px;
	}
	.contact-email p,.social-media p{
		font-size:14px;
	}
}
@media only screen and (max-width:768px) {
	.contact-contaier{
		margin-top:40px;
	}
	.contact-contaier .title{
		text-align:center;
		font-size:24px;
		margin-bottom:35px;
	}
	.contact-contaier h3{
		margin-bottom:18px;
	}
	.contact-email{
		margin-bottom:35px;
	}
}
</style>