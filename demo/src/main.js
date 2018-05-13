// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import routestore from '@/config/routestore'
import {apistore} from '@/config/apistore'
import directive from '@/directives'
import store from '@/store'
import eventbus from '@/store/eventbus'
import VModal from 'vue-js-modal'
import VueI18n from 'vue-i18n'
import messages from '@/config/i18n'

import 'vue-tree-halower/dist/halower-tree.min.css'
import VTree from '@/vue-tree-halower'

Vue.use(directive)
Vue.use(Router)
Vue.use(VModal, { dialog: true })
Vue.use(VueI18n)
Vue.use(VTree)

const router = new Router({
  routes: routestore,
  mode: 'history'
})

const i18n = new VueI18n({
  locale: 'zh',
  messages
})

Vue.prototype.$api = apistore
Vue.prototype.$eventbus = eventbus
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  router,
  template: '<App/>',
  components: { App }
})
