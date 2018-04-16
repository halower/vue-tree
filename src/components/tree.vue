<template>
  <collapse-transition>
      <ul class="halo-tree">
          <li v-for="(item, index) in data"
              @drop="drop(item, $event)"
              @dragover="dragover($event)"
              :key="item.id ? item.id : item.title"
              :class="{leaf: isLeaf(item), 'first-node': !parent && index === 0, 'only-node': !parent && data.length === 1, 'second-node': !parent && index === 1}"
              v-show="item.hasOwnProperty('visible') ? item.visible : true">
               <div class="tree-node-el" :draggable="draggable" @dragstart="drag(item, $event)">
                  <span @click="expandNode(item)" v-if="!item.parent ||item.children && item.children.length > 0 || item.async" :class="item.expanded ? 'tree-open' : 'tree-close'">
                  </span>
                  <span v-if='multiple && !item.nocheck' :class="[item.checked ? (item.halfcheck ? 'box-halfchecked' : 'box-checked') : 'box-unchecked', 'inputCheck']">
                      <input :disabled="item.chkDisabled" :class="['check', item.chkDisabled ? 'chkDisabled' : '']" v-if='multiple' type="checkbox" @change="changeNodeCheckStatus(item, $event)" v-model="item.checked"/>
                  </span>
                   <loading v-if="item.loading && item.expanded"/>
                   <Render :node="item" :tpl ='tpl'/>
              </div>
              <tree v-if="!isLeaf(item)"
                    @dropTreeNodeChecked='nodeCheckStatusChange'
                    @async-load-nodes='asyncLoadNodes'
                    @node-expanded='asyncLoadNodes'
                    @node-click='nodeClick'
                    @drag-node-end='dragNodeEnd'
                    :dragAfterExpanded="dragAfterExpanded"
                    :draggable="draggable"
                    v-show="item.expanded"
                    :tpl ="tpl"
                    :data="item.children"
                    :halfcheck='halfcheck'
                    :scoped='scoped'
                    :parent ='item'
                    :multiple="multiple"></tree>
          </li>
      </ul>
  </collapse-transition>
</template>
<script>
import mixins from './mixins'
import Render from './render'
import Loading from './loading'
import CollapseTransition from './collapse-transition'
export default {
  name: 'Tree',
  mixins: [mixins],
  props: {
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
    halfcheck: {
      type: Boolean,
      default: false
    },
    scoped: {
      type: Boolean,
      default: false
    },
    tpl: Function
  },
  components: {Render, Loading, CollapseTransition},
  watch: {
    data () {
      this.initHandle()
    }
  },
  mounted () {
    /*
     * @event monitor the children nodes seleted event
     */
    this.$on('childChecked', (node, checked) => {
      if (node.children && node.children.length) {
        for (let child of node.children) {
          this.$set(child, 'checked', checked)
          this.$set(child, 'selected', checked)
          this.$emit('nodeChecked', child, checked)
        }
      }
    })

    /*
     * @event monitor the parent nodes seleted event
     */
    this.$on('parentChecked', (node, checked) => {
      this.$set(node, 'checked', checked)
      this.$set(node, 'selected', checked)
      if (!node.parent) return false
      let someBortherNodeChecked = node.parent.children.some(node => node.checked)
      let allBortherNodeChecked = node.parent.children.every(node => node.checked)
      if (this.halfcheck) {
        // all / some / none
        allBortherNodeChecked ? this.$set(node.parent, 'halfcheck', false) : someBortherNodeChecked ? this.$set(node.parent, 'halfcheck', true) : this.$set(node.parent, 'halfcheck', false)
        if (!checked && someBortherNodeChecked) {
          this.$set(node.parent, 'halfcheck', true)
          return false
        }
        this.$emit('parentChecked', node.parent, checked)
      } else {
        if (checked && allBortherNodeChecked) this.$emit('parentChecked', node.parent, checked)
        if (!checked) this.$emit('parentChecked', node.parent, checked)
      }
    })

    /*
     * @event monitor the node seleted event
     */
    this.$on('nodeChecked', (node, checked) => {
      if (!this.scoped) {
        this.$emit('parentChecked', node, checked)
        this.$emit('childChecked', node, checked)
      } else {
        this.$set(node, 'checked', checked)
        this.$set(node, 'seleted', checked)
      }

      this.$emit('dropTreeNodeChecked', node, checked)
    })

     /*
     * @event monitor the node visible event
     */
    this.$on('toggleshow', (node, isShow) => {
      this.$set(node, 'visible', isShow)
      if (isShow && node.parent) {
        this.$emit('toggleshow', node.parent, isShow)
      }
    })

    this.$on('cancelSelected', (root) => {
      for (let child of root.$children) {
        for (let node of child.data) {
          child.$set(node, 'selected', false)
        }
        if (child.$children) child.$emit('cancelSelected', child)
      }
    })
    this.initHandle()
  },
  methods: {
    /* @method drop node
     * @param node droped node
     * @param ev  $event
    */
    drop (node, ev) {
      ev.preventDefault();
      ev.stopPropagation();
      let guid = ev.dataTransfer.getData('guid');
      let drag = this.getDragNode(guid);
      // if drag node's parent is enter node or root node
      if (drag.parent === node || drag.parent === null || drag === node) return false
      // drag from parent node to child node
      if (this.hasInGenerations(drag, node)) return false
      let dragHost = drag.parent.children
      if (node.children && node.children.indexOf(drag) === -1) {
        node.children.push(drag)
        dragHost.splice(dragHost.indexOf(drag), 1)
      } else {
        this.$set(node, 'children', [drag])
        dragHost.splice(dragHost.indexOf(drag), 1)
      }
      this.$set(node, 'expanded', this.dragAfterExpanded)
      this.$emit('drag-node-end', {dragNode: drag, targetNode: node})
    },
    /* @method drag node
     * @param node draged node
     * @param ev  $event
    */
    drag (node, ev) {
      let guid = this.guid()
      this.setDragNode(guid, node)
      ev.dataTransfer.setData('guid', guid)
    },
    /* @method dragover node
     * @param ev  $event
    */
    dragover (ev) {
      ev.preventDefault()
      ev.stopPropagation()
    },
    /*
    * @method dynamically add an 'parent' attribute for every node
    */
    initHandle () {
      for (let node of this.data) {
        this.$set(node, 'parent', this.parent)
      }
    },
    /* @method expand or close node
     * @param node current node
    */
    expandNode (node) {
      this.$set(node, 'expanded', !node.expanded)
      this.$emit('node-expanded', node)
    },
    /* @event passing the async-load-nodes event to the parent component
     * @param node clicked node
     */
    asyncLoadNodes (node) {
      if (node.async && !node.children) {
        this.$emit('async-load-nodes', node)
      }
    },

    /* @method Determine whether it is a leaf node
     * @param node current node
    */
    isLeaf (node) {
      return !(node.children && node.children.length) && node.parent
    },
    /* @method adding child node
     * @param node parent node
     * @param newnode  new node
    */
    addNode (parent, newNode) {
      let addnode = null
      this.$set(parent, 'expanded', true)
      if (typeof newNode === 'undefined') {
        throw new ReferenceError('newNode is required but undefined')
      }
      if (typeof newNode === 'string') {
        addnode = { title: newNode }
      }
      if (typeof newNode === 'object' && !newNode.hasOwnProperty('title')) {
        throw new ReferenceError('the title property is missed')
      }
      if (typeof newNode === 'object' && newNode.hasOwnProperty('title')) {
        addnode = newNode
      }
      if (this.isLeaf(parent)) {
        this.$set(parent, 'children', [])
        parent.children.push(addnode)
      } else {
        parent.children.push(addnode)
      }
      this.$emit('addNode', { parentNode: parent, newNode: newNode })
    },
    /* @method adding childlren nodes
     * @param node parent node
     * @param newnode  new node
    */
    addNodes (node, children) {
      for (let n of children) {
        this.addNode(node, n)
      }
    },
    /* @event passing the node-click event to the parent component
     * @param node clicked node
     */
    nodeClick (node) {
      this.$emit('node-click', node)
    },

     /* @event passing the nodeChecked event to the parent component
     * @param node check status change node
     */
    nodeCheckStatusChange (node, checked) {
      this.$emit('dropTreeNodeChecked', node, checked)
    },
    /* @event passing the node-mouse-over event to the parent component
     * @param node overed node
     */
    nodeMouseOver (node) {
      this.$emit('node-mouse-over', node)
    },
    /* @event passing the drag-node-end event to the parent component
     * @param node clicked node
     */
    dragNodeEnd (event) {
      this.$emit('drag-node-end', event)
    },
    /* @method delete a node
     * @param  parent parent node
     * @param  node current node
     */
    delNode (parent, node) {
      if (parent === null || typeof parent === 'undefined') {
        throw new ReferenceError('the root element can\'t deleted!')
      }
      parent.children.splice(parent.children.indexOf(node), 1)
      this.$emit('delNode', { parentNode: parent, delNode: node })
    },
    /*
     *@method change the check box status method
     *@param node current node
     *@param $event event object
     */
    changeNodeCheckStatus (node, $event) {
      this.$emit('nodeChecked', node, $event.target.checked)
    },

      /*
     *@method change the node selected  method
     *@param node current node
     */
    nodeSelected (node) {
      const getRoot = (el) => {
        if (el.$parent.$el.nodeName === 'UL') {
          el = el.$parent
          return getRoot(el)
        } return el
      }
      let root = getRoot(this)
      if (!this.multiple) {
        for (let rn of root.data || []) this.$set(rn, 'selected', false)
        this.$emit('cancelSelected', root)
      }
      if (this.multiple) this.$set(node, 'checked', !node.selected)
      this.$set(node, 'selected', !node.selected)
      this.$emit('node-click', node)
    },

    /*
     *@method get Nodes by options method
     *@param data nodes
     *@param opt the options that filter the node
     */
    getNodes (opt, data, isOriginal) {
      data = data || this.data
      let res = []
      for (const node of data) {
        for (const [key, value] of Object.entries(opt)) {
          if (node[key] === value) {
            if (isOriginal) {
              res.push(node)
            } else {
              let n = Object.assign({}, node)
              delete n['parent']
              delete n['children']
              res.push(n)
            }
          }
        }
        if (node.children && node.children.length) {
          res = res.concat(this.getNodes(opt, node.children, isOriginal))
        }
      }
      return res
    },

     /*
     *@method get Nodes that selected
     */
    getSelectedNodes (isOriginal) {
      return this.getNodes({selected: true}, this.data, isOriginal)
    },

    /*
     *@method get Nodes that checked
     */
    getCheckedNodes (isOriginal) {
      return this.getNodes({checked: true}, this.data, isOriginal)
    },

      /*
     *@method filter nessary nodes methods
     *@param filter string or predicate expression
     *@param data current nodes
     */
    searchNodes (filter, data) {
      debugger
      data = data || this.data
      for (const node of data) {
        let searched = filter ? (typeof filter === 'function' ? filter(node) : node.title.indexOf(filter) > -1) : false
        this.$set(node, 'searched', searched)
        this.$set(node, 'visible', false)
        this.$emit('toggleshow', node, filter ? searched : true)
        if (node.children && node.children.length) {
          if (searched) this.$set(node, 'expanded', true)
          this.searchNodes(filter, node.children)
        }
      }
    }
  }
}
</script>
<style>
.collapse-transition {
    transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
}

.halo-tree li span:hover {
  background-color: #dddddde3
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
.halo-tree .expand-enter-active {
    transition:all 3s ease;
    height:50px;
    overflow:hidden;
}
.halo-tree .expand-leave-active {
    transition:all 3s ease;
    height:0px;
    overflow:hidden;
}
.halo-tree .expand-enter, .halo-tree .expand-leave {
    height:0;
    opacity:0;
}
.halo-tree {
    font-size:14px;
}
.halo-tree ul,.halo-tree li {
    list-style-type:none;
    text-align:left;
}
.halo-tree .inputCheck {
    display:inline-block;
    position:relative;
    width:14px;
    height:14px;
    border:1px solid #888888;
    border-radius:2px;
    top:4px;
    text-align:center;
    font-size:14px;
    line-height:14px;
}
.halo-tree .inputCheck.notAllNodes:before {
    content:"\2713";
    display:block;
    position:absolute;
    width:100%;
    height:100%;
    background-color:#888888;
    z-index:1;
    color:#ffffff;
}
.halo-tree .inputCheck.box-checked:after {
    content:"\2713";
    display:block;
    position:absolute;
    z-index:1;
    width:100%;
    text-align:center;
}
.halo-tree .box-halfchecked {
    background-color: #888888;
}
.halo-tree .box-halfchecked:after {
    content:"\2713";
    display:block;
    position:absolute;
    z-index:1;
    width:100%;
    text-align:center;
    color: #FFFFFF;
}
.halo-tree .check{
    display:block;
    position:absolute;
    font-size:14px;
    width:16px;
    height:16px;
    left:-5px;
    top:-4px;
    border:1px solid #000000;
    opacity:0;
    cursor:pointer;
    -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter:alpha(opacity=0);
    z-index:2;
}
.halo-tree .chkDisabled {
  background-color: #F5F5F5;
  opacity: 1;
  cursor: not-allowed;
}
.halo-tree li {
    margin: 0;
    padding: 5px 5px 5px 15px;
    position: relative;
    list-style: none;
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
    width: 28px
}
.halo-tree li:last-child::before {
    height: 26px
}
.halo-tree>li.first-node:before {
    top: 17px;
}
.halo-tree>li.second-node:before {
    top: 4px;
}
.halo-tree>li.first-node.only-node::before {
    border-left: none;
}
.halo-tree>li.only-node:after {
    border-top: none;
}
.halo-tree > ul {
    padding-left: 0
}
.halo-tree ul {
    padding-left: 17px;
    padding-top: 10px;
}
.halo-tree .tree-open,
.halo-tree .tree-close {
    display: inline-block;
    width:14px;
    height:14px;
    text-align: center;
    line-height: 13px;
    border: 1px solid #888888;
    border-radius: 2px;
    background: #FFFFFF;
}
.halo-tree .tree-open {
    line-height: 13px;
}
.halo-tree .tree-close:after {
    content: "+";
    font-style: normal;
}
.halo-tree .tree-open:after {
    content: "\2013";
    font-style: normal;
}
.halo-tree .tree-node-el {
    background-color: #FFFFFF;
    padding-left: 2px;
    position: relative;
    z-index: 3;
}
.halo-tree li.leaf {
    padding-left: 15px;
}
.halo-tree li.leaf:after {
    content: '';
    left: -7px;
    position: absolute;
    right: auto;
    border-width: 1px;
    border-top: 1px dashed #999;
    height: 20px;
    top: 17px;
    width: 25px;
}
/*Dynamic style part*/
.halo-tree-search-box {
    height: 18px;
    line-height: 18px;
    outline: none;
    border: 1px solid #888888;
    border-radius: 3px;
}
.halo-tree-search-box:focus {
    border: 1px solid rgb(16, 142, 233);
    -webkit-box-shadow: 0 2px 2px rgba(16, 142, 233, .2);
    box-shadow: 0 2px 2px rgba(16, 142, 233,.2);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.halo-tree .node-title {
    padding: 3px 3px;
    border-radius: 3px;
    cursor: pointer;
    margin: 0 2px;
}
.halo-tree .node-selected {
    border: 1px solid #DDDDDD;
    background-color: #DDDDDD;
}
.halo-tree .node-title.node-searched {
    border: 1px solid #FF8247;
}
</style>
