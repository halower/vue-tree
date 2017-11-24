<template>
    <ul class="halo-tree">
        <li v-for="(item, index) in data" :key="item.title" >
            <div class="tree-node-el">
                <div :class="[item.checked ? 'box-checked' : 'box-unchecked', 'inputCheck']">
                    <input class="check" v-if='multiple' type="checkbox" @change="changeCheckStatus(item, $event)" v-model="item.checked"/>
                </div>
                <span @click="expandNode(item)" v-if="item.children">
                  <span v-show="item.expanded">-</span>
                  <span v-show='!item.expanded' @click.once="asyncLoad(item)">+</span>
                </span>
                <span v-html="item.title"/>            
                <Render :node='item' :tpl ='tpl'/>
            </div>
            <transition name="bounce">
              <tree v-if="!isLeaf(item)" :async="async" v-show="item.expanded" :asyncLoad="asyncLoad" :tpl ="tpl" :data="item.children" :halfcheck='halfcheck' :level="`${level}-${index}`"  :scoped='scoped' :parent ='item' :multiple="multiple"></tree>
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
    scoped: {
      type: Boolean,
      default: false
    },
    tpl: Function,
    asyncLoad: Function
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
<style scoped>
.bounce-enter-active {
	animation:bounce-in .5s;
}
.bounce-leave-active {
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
}.expand-enter-active {
	transition:all 3s ease;
	height:50px;
	overflow:hidden;
}
.expand-leave-active {
	transition:all 3s ease;
	height:0px;
	overflow:hidden;
}
.expand-enter,.expand-leave {
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
.inputCheck {
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
.inputCheck.notAllNodes:before {
	content:"\2713";
	display:block;
	position:absolute;
	width:100%;
	height:100%;
	background-color:#888888;
	z-index:1;
	color:#ffffff;
}
.inputCheck.box-checked {
	}.inputCheck.box-checked:after {
	content:"\2713";
	display:block;
	position:absolute;
	z-index:1;
	width:100%;
	text-align:center;
}
  .inputCheck.box-unchecked {
	}
  .check {
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
</style>