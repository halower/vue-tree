import VTree from './vtree/tree'
VTree.install = function (Vue) {
  Vue.component('VTree', VTree)
}
export default VTree
