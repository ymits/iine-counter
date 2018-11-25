import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueQriously from 'vue-qriously';
import socket from './socket';
import VueSocketIO from 'vue-socket.io'

Vue.use(VueQriously);
Vue.config.productionTip = false;
Vue.use(new VueSocketIO({
    debug: true,
    connection: socket
}));

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
