import Vue from 'vue'
import App from './App.vue'
import VueKonva from 'vue-konva'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VueKonva, { prefix: 'Konva' });

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
