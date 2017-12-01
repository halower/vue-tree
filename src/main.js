import Vue from 'vue'
import App from './App.vue'
import VTree from './lib'
Vue.use(VTree)
new Vue({
  el: '#app',
  render: h => h(App)
})
