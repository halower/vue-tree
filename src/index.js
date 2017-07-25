import ZTree from './components/tree/tree.vue';
import ComboZTree from './components/tree/combotree.vue'



ZTree.install = function(Vue) {
  Vue.component('ZTree', ZTree);
};
ComboZTree.install = function(Vue) {
  Vue.component('ComboZTree', ComboZTree);
};

/**
 * generate key 0-1-2-3
 * this is very important function for now module
 * @param treeData
 * @param parentKey
 * @returns {Array}
 */
 const generateKey = (treeData = [], parentKey = '0') => {
    treeData = treeData.map((item, i) => {
        item.key = parentKey + '-' + i.toString();

        if (item.hasOwnProperty('children') && item.children.length > 0) {
            generateKey(item.children, item.key)
        }

        return item;
    })
    return treeData;
}
/**
 * get parent node
 * @param node { Object }
 * @param treeData { Array }
 * @returns { Object }
 */
const getParentNode = (node = {}, treeData = []) => {
    let tem;
    let postions = node.key.split('-');
    for (let [index, item] of postions.entries()) {
        switch (index) {
            case 0:
                break;
            case 1:
                tem = treeData[item];
                break;
            default:
                tem = tem.children[item];
        }
    }
    return tem
}

export { ZTree, ComboZTree, generateKey, getParentNode }

export default ZTree
