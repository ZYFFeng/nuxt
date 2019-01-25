import Vue from 'vue'
import VuetifyMessage from 'vuetify-message'

Vue.use(VuetifyMessage, {
  timeout: 1000,
  property: '$message',
})