import Vue from 'vue'
import App from './App.vue'

import 'vue-tree-halower/dist/halower-tree.min.css'
import {VTree, VSelectTree} from 'vue-tree-halower'
Vue.use(VTree)
Vue.use(VSelectTree)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
