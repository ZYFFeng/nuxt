<template>
  <div id="about">
    <div class="container">
      <div class="about-contaier">
        <div class="about-title">
          <h2>ABOUT DREAM PAIRS</h2>
        </div>
        <div class="about-Text-content">
          <p>Dream Pairs has aimed to create the most covetable, comfortable and affordable shoes since the very beginning. We believe stylish shoes shouldn't cost a fortune, that's why we've cut out the middle man to offer the finest designs straight from the factory floor to your door!</p>
        </div>
        <div class="about-Img">
          <img 
            src="../assets/img/about-img.png" 
            style="width:100%" 
            class="img-responsive" />
        </div>
        <div class="about-Img-description">
          <div class="Img-text-content">
            <div class="quotation-marks marks-top text-left">"</div>
            <p class="text-center">Fashionable footwear at the fairest price possible – </p>
            <p class="text-center">that's our motto here at Dream Pairs.</p>
            <div class="quotation-marks marks-bottom text-right">"</div>
          </div>
        </div>
        <div class="about-Text-content">
          <p>Launched in 2013, Dream Pairs started out as an independent Amazon seller with a passion to change the fashion footwear game. It now has three sub-brands: TOETOS, BRUNO MARC and arctiv8, all created by the Top Glory Trading Group.</p>
        </div>
        <div class="about-Text-content">
          <p>With decades of insider retail experience, the Top Glory Trading Group are dedicated to sourcing, designing and manufacturing the highest quality ladies, men's and children's shoes at a fraction of the big box prices. That’s why we have your dream pairs here.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
	name:"",
	data(){
		return {
			
		}
	}
}
</script>

<style scoped="scoped">
/* @font-face {
	font-family:LSANSI;
	src:url('../assets/font/LSANSI.TTF');
} */
@font-face {
	font-family:MontserratLight;
	src:url('../assets/font/Montserrat-Light.otf');
}
@font-face {
	font-family:MontserratBold;
	src:url('../assets/font/Montserrat-Bold.ttf');
}
.about-contaier{
}
.about-title{
	color:#000;
	font-family:"MontserratBold";
}
.about-Text-content{
	margin:0.42rem 0;
	font-family:"MontserratLight";
}
.about-contaier .about-Img-description{
	color:#5e5d5d;
	font-family:"LSANSI";
	text-align:center;
}
.about-Img-description .Img-text-content{
	display:inline-block;
	position:relative;
}
.about-contaier .about-Img-description .quotation-marks{
	color:#aeaeae;
	position:absolute;
}
.about-contaier .about-Img-description .marks-top{
	left:0;
	top:0;
}
.about-contaier .about-Img-description .marks-bottom{
	right:0;
}
@media only screen and (min-width: 1600px){
	.container{
	    width:1170px;
	}
}
@media only screen and (max-width:768px) {
	.about-title,.about-contaier .about-Img-description{
		font-size:16px;
	}
	.about-Text-content{
		font-size:14px;
	}
	.about-contaier .about-Img-description .quotation-marks{
		font-size:25px;
	}
}
</style>