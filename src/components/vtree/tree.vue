<template>
  <ul class="tree">
    <li v-for="(item, index) in data" :key="item.title" >
       <input v-if='multiple' type="checkbox" @change="changeCheckStatus(item, $event)" v-model="item.checked"/> 
       <span v-html="item.title"/>
       <Render :node='item' :tpl ='tpl'/>
       <tree v-if="!isLeaf(item)"  :tpl ='tpl' :data="item.children" :halfcheck='halfcheck' :level="`${level}-${index}`"  :scoped='scoped' :parent ='item' :multiple="multiple">
       </tree>
    </li>
  </ul>
</template>
<script>
import Vue from 'vue'
import Render from './render'

export default {
  name: 'Tree',
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
    halfcheck: {
      type: Boolean,
      default: false
    },
    level: {
      type: String,
      default: '0'
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
      for (let node of this.data) {
        Vue.set(node, 'parent', this.parent)
      }
    }
  },
  mounted () {
    /*
    *@description dynamically add an 'parent' attribute for every node
    */
    for (let node of this.data) {
      Vue.set(node, 'parent', this.parent)
    }

    /*
     * @event monitor the children nodes seleted event
     */
    this.$on('childSelected', (node, checked) => {
      if (node.children && node.children.length) {
        for (let child of node.children) {
          Vue.set(child, 'checked', checked)
          this.$emit('nodeSelected', child, checked)
        }
      }
    })

    /*
     * @event monitor the parent nodes seleted event
     */
    this.$on('parentSeleted', (node, checked) => {
      Vue.set(node, 'checked', checked)
      let childrenCheckedNum = node.parent.children.filter(node => node.checked).length
      if (node.parent) {
        if (this.halfcheck) {
          if (!checked && childrenCheckedNum > 0) return false
          this.$emit('parentSeleted', node.parent, checked)
        } else {
          if (checked && childrenCheckedNum === node.parent.children.length) {
            this.$emit('parentSeleted', node.parent, checked)
          }
        }
      }
    })

    /*
     * @event monitor the node seleted event
     */
    this.$on('nodeSelected', (node, checked) => {
      if (!this.scoped) {
        this.$emit('parentSeleted', node, checked)
        this.$emit('childSelected', node, checked)
      } else {
        Vue.set(node, 'checked', checked)
      }
    })
  },
  methods: {
    /* @method Determine whether it is a leaf node
     * @param node current node
    */
    isLeaf (node) {
      return !(node.children && node.children.length)
    },
    /* @method adding child nodes
     * @param node parent node
     * @param newnode  new node
    */
    addNode (parent, newNode) {
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
        Vue.set(parent, 'children', [])
        parent.children.push(addnode)
      } else {
        parent.children.push(addnode)
      }
      this.$emit('addNode', { parentNode: parent, newNode: newNode })
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
     *@method change the check box status event
     *@param node current node
     *@param $event event object
     */
    changeCheckStatus (node, $event) {
      this.$emit('nodeSelected', node, $event.target.checked)
    }
  }
}
</script>
