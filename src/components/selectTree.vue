<template>
   <div class="tree-container" >
      <div class="tag-box-container">
        <div class="tag-box" ref="txtbox" @click="open = !open" @mouseleave="leaveTextTag">
          <div class="tag blank" v-show="!selectedItems.length">{{pleasechoosetext}}</div>
          <div class="tag" @click.stop="tagClick($event)" ref='txttag' 
             v-for="(node, idx) in selectedItems" :key="idx"
          >
            {{node}}
            <span class="rmNode" @click.stop="rmNode(node)" >x</span>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div class="tree-box" v-show="open">
          <input class="search-input" v-model="searchword" v-show="searchable" @keyup.enter="searchNodes" type="text" :placeholder="searchtext">
          <v-tree ref='dropTree'
            v-bind='vTreeObj'
            v-on="$listeners"
            :data='data'
            :dragAfterExpanded="dragAfterExpanded"
            :draggable="draggable"
            :tpl ="tpl"
            :multiple="multiple"
            @dropTreeNodeChecked='nodeCheckStatusChange'
            @async-load-nodes='asyncLoadNodes'
            @node-expanded='asyncLoadNodes'
            @node-click='nodeClick'
            @node-check='nodeClick'
          />
        </div>
      </transition>
    </div>
</template>
<script>
import VTree from './tree'

export default {
  name: 'selectTree',
  model: {
    event: 'value-change'
  },
  inheritAttrs: false,
  components: { VTree },
  data () {
    return {
      searchword: '',
      open: false,
      selectedItems: []
    }
  },
  watch: {
    selectedItems: function () {
      this.$emit('value-change', this.selectedItems)
    }
  },
  mounted () {
    this.selectedItems = this.value
    this.initTreeStatus()
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    searchable: {
      type: Boolean,
      default: true
    },
    pleasechoosetext: {
      type: String,
      default: 'please choose...'
    },
    searchtext: {
      type: String,
      default: 'search...'
    },
    data: {
      type: Array,
      default: () => []
    },
    parent: {
      type: Object,
      default: () => null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    dragAfterExpanded: {
      type: Boolean,
      default: true
    },
    tpl: Function,
    searchFilter: Function
  },
  computed: {
    vTreeObj () {
      return this.$attrs
    }
  },
  methods: {
     /* @event passing the async-load-nodes event to the parent component
     *  @param node clicked node
     */
    asyncLoadNodes (node) {
      if (node.async && !node.children) {
        this.$emit('async-load-nodes', node)
      }
    },
    /* @event passing the node-click event to the parent component
     * @param node clicked node
     */
    nodeClick (node, selected) {
      this.getNewSelectedNodes()
      this.$emit('node-click', node, selected)
    },
    getSelectedAndCheckedNodes () {
      let checkedNode = []
      if (this.multiple) {
        checkedNode = this.$refs.dropTree.getCheckedNodes(true)
      }
      const selectedNode = this.$refs.dropTree.getSelectedNodes(true)
      return [...new Set([...selectedNode, ...checkedNode])]
    },
    getNewSelectedNodes () {
      this.$nextTick(() => {
        this.selectedItems = this.getSelectedAndCheckedNodes().map(x => x.title)
      })
    },
    /*
    * delete node tag from input
    */
    rmNode (text, eventFromNode) {
      if (!eventFromNode) {
        const node = this.getSelectedAndCheckedNodes().find(x => x.title === text)
        if (node) {
          this.$set(node, 'selected', false)
          this.$set(node, 'checked', false)
        }
      }
      this.getNewSelectedNodes()
    },

    /*
    * node check status change event
    */
    // nodeCheckStatusChange (node, checked) {
    nodeCheckStatusChange () {
      let treeNodes = this.$refs.dropTree.getCheckedNodes(true)
      if (!treeNodes) this.selectedItems = []
      this.selectedItems = []
      for (let node of treeNodes) {
        this.selectedItems.push(node.title)
      }
    },

    /*
    * search nodes from  drop-down tree
    * */
    searchNodes () {
      const filter = this.searchFilter ? this.searchFilter : this.searchword
      this.$refs.dropTree.searchNodes(filter)
    },

   // click tag animation effects
    tagClick (e) {
      var l = e.target.offsetLeft - 5
      this.$refs.txtbox.style.transition = 'transform .3s linear'
      this.$refs.txtbox.style.transform = 'translateX(-' + l + 'px)'
    },

   // remove tag animation effects
    leaveTextTag () {
      this.$refs.txtbox.style.transition = 'transform 0.4s'
      this.$refs.txtbox.style.transform = 'translateX(0)'
    },
    /*
    * @param data source tree data
    * initialize the state of the drop-down tree node
    */
    initTreeStatus (data) {
      data = data || this.data
      for (const node of data) {
        if (this.value.findIndex(text => text === node.title) > -1) {
          this.$set(node, 'selected', true)
          this.$set(node, 'checked', true)
        }
        if (node.children && node.children.length) {
          this.initTreeStatus(node.children)
        }
      }
    },
    getTreeRef () {
      return this.$refs.dropTree
    }
  }
}
</script>
<style>
  .tree-container {
    position: relative;
    width: 90%;
    height: 36px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  .tag-box-container {
    position: relative;
    width: 100%;
    height: 36px;
    overflow: hidden;
  }

  .tag-box {
    width: 2000%;
    height: 36px;
  }


  .tree-box {
    margin-top: 3px;
    border-radius: 6px;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px rgba(0, 0, 0, .4);
  }

  .tree-box ul {
    margin-left: 0;
    -webkit-padding-start: 10px;
  }

  .search-input {
    width: 96%;
    height: 30px;
    box-sizing: border-box;
    margin: 5px auto 0;
    border: 1px solid #ccc;
    font-size: 14px;
    text-indent: 1em;
    border-radius: 6px;
    outline: none;
  }

  .tag {
    float: left;
    position: relative;
    min-width: 50px;
    height: 26px;
    margin: 4px;
    padding: 0 10px;
    line-height: 26px;
    text-align: center;
    border-radius: 6px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    user-select: none;
    cursor: default;
    transition: padding .3s;
  }
  .tag .rmNode{
    display: none;
  }
  .tag:hover{
    padding-right: 25px;
  }
  .tag:hover>.rmNode{
     display: block!important;
  }
  .blank{
  background-color: #fff;
  border:0;
  }
  .rmNode {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 15px;
    height: 15px;
    line-height: 15px;
    font-size: 12px;
    /* border: 1px solid #ccc; */
    background-color: #b3b3b3;
    color: #ececec;
    border-radius: 50%;
    cursor: pointer;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s, transform 0.5s;
    /*transition: all 0.5s;*/
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
