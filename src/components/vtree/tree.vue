<template>
  <ul class="halo-tree">
      <li v-for="(item, index) in data" :key="item.title" :class="{leaf: isLeaf(item)}"  v-show="item.show">
          <div class="tree-node-el">
              <span @click="expandNode(item)" v-if="item.children">
                <span v-show="item.expanded" class="tree-open"></span>
                <span v-show='!item.expanded' @click.once="asyncLoad(item)" class="tree-close"></span>
              </span>
              <div :class="[item.checked ? 'box-checked' : 'box-unchecked', 'inputCheck']">
                  <input :class="[item.halfchecked ? 'halfcheck' : 'check']" v-if='multiple' type="checkbox" @change="changeCheckStatus(item, $event)" v-model="item.checked"/>
              </div>
              <Render :node="item" :tpl ='tpl'/>
          </div>
          <transition name="bounce">
            <tree v-if="!isLeaf(item)" :searchable='searchable' :async="async" :keyword='keyword' v-show="item.expanded" :tpl ="tpl" :data="item.children" :halfcheck='halfcheck' :level="`${level}-${index}`"  :scoped='scoped' :parent ='item' :multiple="multiple"></tree>
          </transition>
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
    async: {
      type: Boolean,
      default: false
    },
    level: {
      type: String,
      default: '0'
    },
    keyword: {
      type: String,
      default: ''
    },
    scoped: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    tpl: Function
  },
  components: { Render },
  watch: {
    data () {
      this.initHandle()
    },
    keyword () {
      for (let node of this.data) {
        if (this.searchable) {
          let searched = node.title.indexOf(this.keyword) > -1
          Vue.set(node, 'searched', searched)
          this.$emit('shownode', node, searched)
        }
      }
    }
  },
  mounted () {
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
      if (!node.parent) return false
      let someBortherNodeChecked = node.parent.children.some(node => node.checked)
      let allBortherNodeChecked = node.parent.children.every(node => node.checked)
      if (this.halfcheck) {
        if (!checked && someBortherNodeChecked) {
          Vue.set(node.parent, 'halfchecked', true)
          return false
        }
        if (allBortherNodeChecked) {
          Vue.set(node.parent, 'halfchecked', false)
        } else {
          if (!someBortherNodeChecked) {
            Vue.set(node.parent, 'halfchecked', false)
          } else {
            Vue.set(node.parent, 'halfchecked', true)
          }
        }
        this.$emit('parentSeleted', node.parent, checked)
      } else {
        if (checked && allBortherNodeChecked) {
          this.$emit('parentSeleted', node.parent, checked)
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

    this.$on('shownode', (node, isShow) => {
      Vue.set(node, 'show', isShow)
      if (isShow && node.parent) {
        this.$emit('shownode', node.parent, isShow)
      }
    })
    this.initHandle()
  },
  methods: {
    /*
    * @method dynamically add an 'parent' attribute for every node
    */
    initHandle () {
      for (let node of this.data) {
        Vue.set(node, 'parent', this.parent)
        Vue.set(node, 'show', true)
      }
    },
    /* @method expand or close node
     * @param node current node
    */
    expandNode (node) {
      Vue.set(node, 'expanded', !node.expanded)
    },
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
      Vue.set(parent, 'expanded', true)
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
    addNodes (node, children) {
      for (let n of children) {
        this.addNode(node, n)
      }
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
<style>
    .halo-tree .bounce-enter-active {
        animation:bounce-in .5s;
    }
    .halo-tree .bounce-leave-active {
        animation:bounce-in .5s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform:scale(0);
        }
        50% {
            transform:scale(1.5);
        }
        100% {
            transform:scale(1);
        }
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
    .halo-tree .inputCheck.box-checked {
	}
    .halo-tree .inputCheck.box-checked:after {
        content:"\2713";
        display:block;
        position:absolute;
        z-index:1;
        width:100%;
        text-align:center;
    }
    .halo-tree.inputCheck.box-unchecked {
	}
    .halo-tree .check, .halfcheck {
        display:block;
        position:absolute;
        font-size:14px;
        width:16px;
        height:16px;
        left:-5px;
        top:-4px;
        border:1px solid #000000;
        /*width:14px;
        height:14px;
        */
        opacity:0;
        cursor:pointer;
        -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter:alpha(opacity=0);
        z-index:2;
    }

    .halfcheck {
      border-radius: 3px;
      opacity: 1;
    }
    .halo-tree li {
        margin: 0;
        padding: 5px 5px 5px 0;
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
        width: 12px
    }
    .halo-tree li:last-child::before {
        height: 26px
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
        line-height: 14px;
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
        padding-left: 19px;
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
</style>