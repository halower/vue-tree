<template>
  <ul class="halo-tree">
      <li v-for="(item, index) in data"@drop="drop(item, $event)" @dragover="dragover($event)" :key="item.title" :class="{leaf: isLeaf(item), 'first-node': !parent && index === 0, 'only-node': !parent && data.length === 1}"  v-show="item.hasOwnProperty('visible') ? item.visible : true">
          <div class="tree-node-el" :draggable="draggable" @dragstart="drag(item, $event)">
              <span @click="expandNode(item)" v-if="item.children && item.children.length > 0" :class="item.expanded ? 'tree-open' : 'tree-close'">
              </span>
              <div v-if='multiple' :class="[item.checked ? (item.halfcheck ? 'box-halfchecked' : 'box-checked') : 'box-unchecked', 'inputCheck']">
                  <input class="check" v-if='multiple' type="checkbox" @change="changeNodeCheckStatus(item, $event)" v-model="item.checked"/>
              </div>
              <Render :node="item" :tpl ='tpl'/>
              {{item.level}}
          </div>
          <transition name="bounce">
            <tree v-if="!isLeaf(item)" @node-click='nodeClick' :dragAfterExpanded="dragAfterExpanded" :draggable="draggable" v-show="item.expanded"  :tpl ="tpl" :data="item.children" :halfcheck='halfcheck' :scoped='scoped' :parent ='item' :multiple="multiple"></tree>
          </transition>
      </li>
  </ul>
</template>
<script>
import Render from './render'
import mixins from './mixins'
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
  components: { Render },
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
          this.$emit('nodeChecked', child, checked)
        }
      }
    })

    /*
     * @event monitor the parent nodes seleted event
     */
    this.$on('parentChecked', (node, checked) => {
      this.$set(node, 'checked', checked)
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
      }
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
      ev.preventDefault()
      ev.stopPropagation()
      let guid = ev.dataTransfer.getData('guid')
      let drag = this.getDragNode(guid)
      // if drag node's parent is enter node or root node
      if (drag.parent === node || drag.parent === null) return false
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
    },
    /* @method Determine whether it is a leaf node
     * @param node current node
    */
    isLeaf (node) {
      return !(node.children && node.children.length)
    },
    /* @method adding child node
     * @param node parent node
     * @param newnode  new node
    */
    addNode (parent, newNode) {
      this.$set(parent, 'expanded', true)
      let addnode = null
      if (typeof newNode === 'undefined') {
        throw new ReferenceError('newNode is required but undefined')
      }
      if (typeof newNode === 'string') {
        addnode = {title: newNode}
      } else {
        if (newNode && !newNode.hasOwnProperty('title')) {
          throw new ReferenceError('the property (title) is missed')
        }
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
        for (let rn of root.data) this.$set(rn, 'selected', false)
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
    getNodes (opt, data) {
      data = data || this.data
      let res = []
      for (const node of data) {
        let tmp = true
        for (const [key, value] of Object.entries(opt)) {
          if (node[key] !== value) {
            tmp = false
            break
          }
        }
        if (tmp) res.push(node)
        if (node.children && node.children.length) {
          res = res.concat(this.getNodes(opt, node.children))
        }
      }
      return res
    },

     /*
     *@method get Nodes that selected
     */
    getSelectedNodes () {
      return this.getNodes({selected: true}, this.data)
    },

    /*
     *@method get Nodes that checked
     */
    getCheckedNodes () {
      return this.getNodes({selected: true}, this.data)
    },

      /*
     *@method filter nessary nodes methods
     *@param filter string or predicate expression
     *@param data current nodes
     */
    filterNodes (filter) {
      for (const node of this.data) {
        let searched = filter ? (typeof filterNodes === 'function' ? filter(node) : node.title.indexOf(filter) > -1) : false
        this.$set(node, 'searched', searched)
        this.$set(node, 'visible', false)
        this.$emit('toggleshow', node, filter ? searched : true)
        if (node.children && node.children.length) {
          if (searched) this.$set(node, 'expanded', true)
          this.filterNodes(filter, node.children)
        }
      }
    }
  }
}
</script>
