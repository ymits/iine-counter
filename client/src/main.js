import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueQriously from 'vue-qriously';

Vue.use(VueQriously);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
