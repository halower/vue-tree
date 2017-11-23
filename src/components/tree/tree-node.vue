<template>
  <ul>
    <li v-for='item in nodeData' v-show="item.visible" :class="[(item.children && item.children.length > 0) ? '':'leaf']">
      <div class="tree-node-el">
        <i v-if="item.children && item.children.length > 0"
           @click.stop='handleNodeExpand(item)'
           :class="[item.open? 'tree-open':'tree-close','icon']">
        </i>
        <div :class="['inputCheck',
           options.showCheckbox && options.halfCheckedStatus  && !item.nodeSelectNotAll ? (item.checked ? 'box-checked' : 'box-unchecked') : '',
           item.nodeSelectNotAll ? 'notAllNodes' : '']"
           @click="walkCheckBox(item)" >
          <input type="checkbox" class="check"
              v-if="options.showCheckbox && options.halfCheckedStatus  && !item.nodeSelectNotAll"
              v-model='item.checked'
             @change="handlecheckedChange(item)" />
        </div>
        <span
           @click="handleNode(item)"
          :class="{'node-selected':(item.checked && !options.showCheckbox) || item.searched }">
           {{item.label}}
        </span>
      </div>
      <tree-node v-if="item.children && item.children.length > 0"
        :options="options"
        @handlecheckedChange="handlecheckedChange" 
        v-show='item.open'
        :tree-data="item.children">
      </tree-node>
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
  computed:{
    inputWidth: function(){
      if(this.checkFirfox()){
        return 14
      }
      return 13
    }
  },
  watch: {
    treeData: function(data){
      this.nodeData = (data || []).slice(0)
    }
  },
  methods: {
    checkFirfox(){
      let u = navigator.userAgent
        if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1){
          return true
        }
        return false
    },
    walkCheckBox(node){
      if(node.nodeSelectNotAll){
        node.checked = !node.checked
        this.handlecheckedChange(node)
      }
    },
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
  .halo-tree .tree-node-el {
    position: relative;
    z-index: 2;
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

  
  .halo-tree .icon {
    margin-right: 0;
  }

  .tree-open,
  .tree-close {
    width:14px;
    height:14px;
    text-align: center;
    line-height: 14px;
    border: 1px solid #888888;
    border-radius: 2px;
    background: #FFFFFF;
  }
  .tree-close:after {
    content: "+";
    font-style: normal;
  }
  .tree-open:after {
    content: "\2013";
    font-style: normal;
  }
.search{
  width:14px;
  height:14px;
  background-image: url("../../assets/search.png");
}
/*.check.notAllNodes{
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  width: 13px;
}*/

  .check {
    display: block;
    position: absolute;
    font-size: 14px;
    width: 16px;
    height: 16px;
    left: -5px;
    top: -4px;
    border: 1px solid #000000;
    /*width: 14px;
    height: 14px;*/
    opacity: 0;
    cursor: pointer;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
    z-index: 2;
  }
.inputCheck{
  display: inline-block;
  position: relative;
  width: 14px;
  height: 14px;
  border: 1px solid #888888;
  border-radius: 2px;
  top: 4px;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
}
.inputCheck.notAllNodes:before{
  content: "\2713";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #888888;
  z-index: 1;
  color: #ffffff;
}
  .inputCheck.box-checked {
  }
  .inputCheck.box-checked:after {
    content: "\2713";
    display: block;
    position: absolute;
    z-index: 1;
    width: 100%;
    text-align: center;
  }
  .inputCheck.box-unchecked {

  }
</style>