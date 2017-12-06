import Vue from 'vue'
import Vuex from 'vuex'

import test from './modules/test'

Vue.use(Vuex)

export const state = {
}

export const mutations = {
}

export const actions = {
}

export const getters = {
}

export default new Vuex.Store({
  modules: {
    test
  },
  state,
  getters,
  actions,
  mutations
})
