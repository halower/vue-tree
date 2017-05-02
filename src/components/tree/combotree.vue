<template>
<div class="halo-tree">
  <div class="input">
    <input type="text" v-model="nodelabel" @click='toggleShowTree'>
    <span :class="[showTree ? 'caret-up' : 'caret-down', icon]"  @click=toggleShowTree></span>
  </div>
 <tree v-show=showTree ref='tree' :treeData='treeData' :options="options" @node-click='nodeclick' @handlecheckedChange='handlecheckedChange'></tree>
</div>
</template>
<script>
  import Tree from './tree.vue'
  export default {
    name: 'comboTree',
    props: {
      treeData: [Array],
      options: [Object]
    },
    data () {
      return {
        nodelabel: null,
        showTree: false
      }
    },
    methods: {
      toggleShowTree () {
        this.showTree = !this.showTree
      },
      nodeclick (node) {
        this.nodelabel = node.label
      },
      handlecheckedChange () {
        const dedupe = (array) => {
          return Array.from(new Set(array))
        }
        let nodes = this.$refs.tree.getSelectedNodes()
        let nodeNames = []
        nodes.forEach((n) => nodeNames.push(n.label))
        this.nodelabel = dedupe(nodeNames).join(',')
      }
    },
    components: {Tree}
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
    top: 9px;
    right: 10px;
  }
  .input input{
    display: inline-block;
    box-sizing: border-box;
    width:100%;
    border-radius: 5px;
    height:25px;
    padding-left: 5px;
    border:transparent;
    border:1px solid #ddd;
  }
  .input input:focus {
      border:none;
  }
</style>

