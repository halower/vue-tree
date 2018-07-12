import VTree from './tree'
import VSelectTree from './selectTree'
VTree.install = function (Vue) {
  Vue.component('VTree', VTree)
}

VSelectTree.install = function (Vue) {
  Vue.component('VSelectTree', VSelectTree)
}

export { VTree, VSelectTree }

export default VTree
