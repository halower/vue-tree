import * as types from '@/store/mutation-types'

const state = {
  code: '000000',
  oldcode: ''
}
const getters = {
  precode: state => state.oldcode ? state.oldcode : '--------'
}

const mutations = {
  [types.CHANGE_CODE] (state) {
    state.oldcode = state.code
    state.code = Math.ceil(Math.random() * 100000)
  }
}
const actions = {
  changeCode ({commit}) {
    commit(types.CHANGE_CODE)
  }
}
export default{
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
