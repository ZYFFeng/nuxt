const pkg = require('./package')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Dream Pairs Shoes Official Website – We’ve Got Your Dream Pairs Here',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'keywords', name: 'keywords', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#b93daa' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'normalize.css',
    '~/assets/style/app.styl',
    { src: 'swiper/dist/css/swiper.css' }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/vuetify',
    '@/plugins/vuetify-message',
    { src: '~/plugins/vue-awesome-swiper.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    ['@nuxtjs/axios', {
      baseURL: 'https://shop.wangoon.com'
    }]
  ],
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'listChild',
        path: '/list/:menuName',
        component: resolve('pages/list.vue'),
        children:[{
					path: '/list/:menuName/:childName',
					component: resolve('pages/list.vue'),
					children:[
						{
              path: '/list/:menuName/:childName/:className',
							component: resolve('pages/list.vue')
						}	
					]
			  }]
      },
      {
        path: '/newlist/:menuName/:childName',
        component: resolve('pages/newlist.vue')
      })
    }
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // config.module.rules.push({
      //   test: /\.ttf$/,
      //   use: [
      //     {
      //       loader: 'ttf-loader',
      //       options: {
      //         name: './font/[hash].[ext]',
      //       },
      //     },
      //   ]
      // })
    }
  }
}
