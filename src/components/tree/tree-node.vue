<template>
  <ul>
    <li v-for='item in nodeData' v-show="item.visible" :class="[(item.children && item.children.length > 0) ? '':'leaf']">
      <i v-if="item.children && item.children.length > 0"  @click.stop='handleNodeExpand(item)' :class="[item.open? 'tree-open':'tree-close','icon']">
        </i>
      <input type="checkbox" class="check" v-if="options.showCheckbox" v-model='item.checked' @click.stop="handlecheckedChange(item)" />
      <span @click="handleNode(item)" :class="{'node-selected':(item.checked && !options.showCheckbox) || item.searched }">{{item.label}}</span>
      <tree-node v-if="item.children && item.children.length > 0" :options="options" @handlecheckedChange="handlecheckedChange" v-show='item.open'
        :tree-data="item.children"></tree-node>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'treeNode',
  props: {
    treeData: [Array],
    options: [Object]
  },
  data () {
    return {
      nodeData: []
    }
  },
  created () {
    const parent = this.$parent
    if (parent.isTree) {
      this.tree = parent
    } else {
      this.tree = parent.tree
    }

    const tree = this.tree
    if (!tree) {
      console.warn('找不到树节点')
    }
    this.nodeData = (this.treeData || []).slice(0)
  },
  methods: {
    handleNodeExpand (node) {
      node.open = !node.open
    },
    handlecheckedChange (node) {
      this.$emit('handlecheckedChange', node)
    },
    handleNode (node) {
      if (this.tree.store.last) {
        if (this.tree.store.last.id === node.id) {
          this.tree.store.last.checked = !this.tree.store.last.checked
        } else {
          this.tree.store.last.checked = false
          node.checked = true
          this.tree.store.last = node
        }
      } else {
        this.tree.store.last = node
        node.checked = true
      }
      this.tree.$emit('node-click', node)
    }
  }
}
</script>
<style scoped>
  li:hover {
    cursor: pointer;
  }

  .icon{
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
   }
   
  .halo-tree {
    font-size: 14px;
    min-height: 20px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
  
  .node-selected {
    background-color:#ddd
  }
  
  .halo-tree li {
    margin: 0;
    padding: 5px 5px 5px 0;
    position: relative;
    list-style: none;
  }
  
  .halo-tree li > span,
  .halo-tree li > i,
  .halo-tree li > a {
    line-height: 20px;
    vertical-align: middle;
  }
  
  .halo-tree ul ul li:hover {
    background: rgba(0, 0, 0, .035)
  }
  
  .halo-tree li:after,
  .halo-tree li:before {
    content: '';
    left: -8px;
    position: absolute;
    right: auto;
    border-width: 1px
  }
  
  .halo-tree li:before {
    border-left: 1px dashed #999;
    bottom: 50px;
    height: 100%;
    top: -8px;
    width: 1px;
  }
  
  .halo-tree li:after {
    border-top: 1px dashed #999;
    height: 20px;
    top: 17px;
    width: 12px
  }
  
  .halo-tree li span {
    display: inline-block;
    padding: 3px 3px;
    text-decoration: none;
    border-radius: 3px;
  }
  
  .halo-tree li:last-child::before {
    height: 26px
  }
  
  .halo-tree > ul {
    padding-left: 0
  }
  
  .halo-tree ul ul {
    padding-left: 15px;
    padding-top: 10px;
  }
  
  .halo-tree li.leaf {
    padding-left: 19px;
  }
  
  .halo-tree li.leaf:after {
    content: '';
    left: -8px;
    position: absolute;
    right: auto;
    border-width: 1px;
    border-top: 1px dashed #999;
    height: 20px;
    top: 17px;
    width: 24px;
  }
  
  .check {
    display: inline-block;
    position: relative;
    top: 1px;
  }
  
  .halo-tree .icon {
    margin-right: 0;
  }

  .tree-close{
  width:14px;
  height:14px;
  background-image: url("/static/images/treeOpen-1.png");
}

.tree-open{
  width:14px;
  height:14px;
  background-image: url("/static/images/treeClose-2.png");
}
.search{
  width:14px;
  height:14px;
  background-image: url("/static/images/search.png");
}
</style>