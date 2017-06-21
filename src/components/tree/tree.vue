<template>
<div class="halo-tree">
  <div class="input">
    <input type="text" v-model="search">
    <span class="icon search"></span>
  </div>
 <tree-node :treeData='store.root' :options="options" @handlecheckedChange="handlecheckedChange"></tree-node>
</div>
</template>
<script>
  import TreeNode from './tree-node.vue'
  import TreeStore from './tree-store'
  export default {
    name: 'tree',
    props: {
      treeData: [Array],
      options: [Object]
    },
    data () {
      return {
        search: null,
        store: {
          root:[],
          last:null
        }
      }
    },
    created () {
      this.isTree = true
      this.store = new TreeStore({
        root: (this.treeData || []).slice(0),
        last: null
      })
    },
    watch: {
      search: function (val) {
        this.store.filterNodes(val, this.options.search)
      },
      treeData: function(data){
        this.store = new TreeStore({
          root: (this.treeData || []).slice(0),
          last: null
        })
        return data
      }
    },
    methods: {
      handlecheckedChange (node) {
        if(this.options.halfCheckedStatus){
          this.store.changeCheckHalfStatus(node)
        }else{
        this.store.changeCheckStatus(node)
        }
        this.$emit('handlecheckedChange', node)
      },
      getSelectedNodes () {
        const allnodes = this.store.datas
        let selectedNodes = []
        for (let [, node] of allnodes) {
          if (node.checked) {
            selectedNodes.push(node)
          }
        }
        return selectedNodes
      },
      getSelectedNodeIds () {
        const allnodes = this.store.datas
        let selectedNodeIds = []
        for (let [, node] of allnodes) {
          if (node.checked) {
            selectedNodeIds.push(node.id)
          }
        }
        return selectedNodeIds
      }
    },
    components: {TreeNode}
  }
</script>
<style scoped>
  *{
    font-size: 13px;
    font-family: '\5FAE\8F6F\96C5\9ED1'
  }
  .input{
    width:100%;
    position: relative;
  }
  .input span {
    position: absolute;
    top:7px;
    right:5px;
  }
  .input input{
    display: inline-block;
    box-sizing: border-box;
    width:100%;
    border-radius: 5px;
    height:25px;
    margin-top: 2px;
  }
  .input input:focus {
      border:none;
  }
  .search{
  width:14px;
  height:14px;
  background-image: url("/static/images/search.png");
}
</style>

