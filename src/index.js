import ZTree from './components/tree/tree.vue';
import ComboZTree from './components/tree/combotree.vue'



ZTree.install = function(Vue) {
  Vue.component('ZTree', ZTree);
};
ComboZTree.install = function(Vue) {
  Vue.component('ComboZTree', ComboZTree);
};



export { ZTree, ComboZTree }


export default ZTree
