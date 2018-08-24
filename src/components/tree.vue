<template>
  <TreeUl v-bind='childBind' />
</template>
<script>
import TreeUl from './treeUl'
export default {
  name: 'Tree',
  inheritAttrs: false,
  components: {TreeUl},
  provide(){
    return {
      isLeaf: this.isLeaf,
      childChecked: this.childCheckedHandle,
      parentChecked: this.parentCheckedHandle,
      emitEventToTree: this.emitEventToParent,
      nodeSelected: this.nodeSelected,
      setAttr: this.setAttr
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    halfcheck: {
      type: Boolean,
      default: false
    },
    canDeleteRoot: {
      type: Boolean,
      default: false
    },
    maxLevel: { // 最大层级
      type: Number,
      default: 1024
    }
  },
  beforeCreate () {
    // 默认为false
    this.$defVal = {
      visible: true
    }
  },
  computed: {
    childBind () {
      return Object.assign({},
        this.$attrs,
        this.$props
      )
    }
  },
  methods: {
    // 通过依赖注入共享的方法
    /* @method Determine whether it is a leaf node
     * @param node current node
    */
    isLeaf (node) {
      return !(node.children && node.children.length)
    },
    childCheckedHandle(node, checked, halfcheck = false){
      const {children} = node
      if (children && children.length) {
        children.forEach(child => {
          this.$set(child, 'checked', checked)
          if (halfcheck) {
            this.$set(child, 'halfcheck', false)
          }
          this.childCheckedHandle(child, checked, halfcheck)
        })
      }
    },
    parentCheckedHandle (parentNode, checked, halfcheck = false) {
      if (!parentNode) return false
      let [someBortherNodeChecked, allBortherNodeChecked] = [checked, checked]
      const childNodes = parentNode.children
      if (checked) {
        allBortherNodeChecked = childNodes.every(child => child.checked && !child.halfcheck)
      } else {
        someBortherNodeChecked = childNodes.some(child => child.checked)
      }
      if (halfcheck) {
        // all / some / none
        const nodeHalfcheck = checked ? !allBortherNodeChecked : someBortherNodeChecked
        const {halfcheck: oldHalfCheck = false} = parentNode
        if(oldHalfCheck !== nodeHalfcheck) {
          this.$set(parentNode, 'halfcheck', nodeHalfcheck)
        } else if(nodeHalfcheck) {
          return false
        }
        const parentChecked = checked || nodeHalfcheck
        this.$set(parentNode, 'checked', parentChecked)
      } else {
        this.$set(parentNode, 'checked', allBortherNodeChecked)
      }
      return true
    },
    emitEventToParent (eventName, ...args) {
      if (!eventName) return
      // 为了让接口更清晰
      switch (eventName) {
        case 'node-mouse-over': // 无法使用,不清楚加在哪里
        case 'node-check':
        case 'drag-node-end':
        case 'delNode':
        case 'node-click':
        case 'node-select': // 和 'node-click'一样,为了更好的语义化
        case 'async-load-nodes':
          this.$emit(eventName, ...args)
          break
        default:
          throw new ReferenceError(`the event of ${eventName} is not effective`)
      }
    },
    // 设置node属性
    setAttr (node, attr, val = true) {
      const {[attr]: defVal = this._getDefVal(attr)} = node
      if (defVal !== val) {
        this.$set(node, attr, val)
      }
    },
    setAttrs (node, attrs = [], val = true) {
      const setAttr = this.setAttr
      attrs.forEach(attr => setAttr(node, attr, val))
    },
    // 对外暴露的方法,通过ref访问

    /*
     *@method change the node selected  method
     *@param node current node
     */
    nodeSelected (node) {
      const isMultiple = this.multiple
      const selected = !node.selected
      if (isMultiple) {
        this.$set(node, 'checked', selected)
      } else {
        if (selected) {
          this.data.forEach(allNode => this.setAttr(allNode, 'selected', false))
        }
      }
      this.$set(node, 'selected', selected) // 只对当前的selected属性有效
      this.childCheckedHandle(node, selected, this.halfcheck)
      this.emitEventToParent('node-click', node, selected)
      this.emitEventToParent('node-select', node, selected)
    },

    /* @method adding child node
     * @param node parent node
     * @param newnode  new node
    */
    addNode (parent, newNode) {
      let addnode = null
      this.$set(parent, 'expanded', true)
      const newNodeType = typeof newNode
      if (newNodeType === 'undefined') {
        throw new ReferenceError('newNode is required but undefined')
      } else if (newNodeType === 'string') {
        addnode = { title: newNode }
      } else if (newNodeType === 'object') {
        if (!newNode.hasOwnProperty('title')) {
          throw new ReferenceError('the title property is missed')
        } else {
          addnode = newNode
        }
      } else {
        throw new ReferenceError(`newNode type error, not allowed ${newNodeType}`)
      }
      const {halfcheck, checked} = parent
      addnode = Object.assign({
        checked: !halfcheck && checked
      }, addnode)
      if (this.isLeaf(parent)) {
        this.$set(parent, 'children', [])
        parent.children.push(addnode)
      } else {
        parent.children.push(addnode)
      }
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

    /* @method delete a node
     * @param  parent parent node
     * @param  node current node
     */
    delNode (node, parent, index) {
      if (parent === null || typeof parent === 'undefined') {
        if (this.canDeleteRoot) {
          this.data.splice(index, 1)
        } else {
          throw new ReferenceError('the root element can\'t deleted!')
        }
      } else {
        parent.children.splice(index, 1)
      }
      // this.$emit('delNode', { parentNode: parent, delNode: node })
      this.emitEventToParent('delNode', { parentNode: parent, delNode: node })
    },

    /*
     *@method get Nodes by options method
     *@param data nodes
     *@param opt the options that filter the node
     */
    getNodes (opt = {}, data, isOriginal) {
      const optArr = Object.entries(opt)
      const hasOpt = optArr.length > 0
      return this._getNodes(optArr, hasOpt, data, isOriginal)
    },

    // opt: Array
    _getNodes (opt, hasOpt, data = this.data, isOriginal = false, res = []) {
      // let res = []
      const _pushNode = (arr, node, isOrg) => {
        if (isOrg) {
          arr.push(node)
        } else {
          const n = Object.assign({}, node)
          Reflect.deleteProperty(n, 'hasExpended')
          Reflect.deleteProperty(n, 'children')
          arr.push(n)
        }
      }
      const pushNode = (node) => _pushNode(res, node, isOriginal)
      // is a node matched the condition
      const getDefVal = this._getDefVal
      const _isMatchedNode = (node, condition) => {
        let matched = true
        for(let [attr, val] of condition) {
          if (node.hasOwnProperty(attr)) {
            const {[attr]: nodeVal = getDefVal(attr)} = node
            matched = nodeVal === val
          } else {
            matched = false
          }
          if (!matched) break
        }
        return matched
      }
      const isMatchedNode = (node) => _isMatchedNode(node, opt)

      for (const node of data) {
        if (hasOpt) {
          if(isMatchedNode(node)) {
            pushNode(node)
          }
        } else {
          pushNode(node)
        }
        const {children} = node
        if (children && children.length) {
          this._getNodes(opt, hasOpt, children, isOriginal, res)
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
    searchNodes (filter, data = this.data) {
      if (filter == null || (typeof filter === 'string' && filter.trim() === '')) {
        data.forEach(node => this._modifyAllNode(node))
        return
      }
      const filterFn = typeof filter === 'function' ? filter : ({title = ''} = {}) => title.includes(filter)
      const searchRes = Array.from({length: data.length},() => [])
      data.forEach((node, index) => {
        const matched = searchRes[index]
        this._searchNodes (filterFn, node, index, matched)
        if (matched.length > 0) {
          matched.sort((x, y) => x.length - y.length) // 根据长度升序
          const attrs = ['visible', 'expanded']
          if (matched.some(x => x.length === 1)) {
            attrs.push('searched')
          }
          this.setAttrs(node, attrs)
          this._showSearchNodes(node, matched.map(x => x.slice(1)).filter(x => x.length))
        } else {
          this.setAttr(node, 'visible', false)
        }
      })
    },
    _searchNodes (filterFn, node, index, matched, path = []) {
      const isMatched = filterFn(node)
      path = [...path, index]
      if (isMatched) {
        // 如果titile的内容是html,html内容也能被搜索到
        matched.push(path)
      }
      // this.$set(node, 'searched', searched)
      // this.$set(node, 'visible', false)
      const {children} = node
      if (children && children.length) {
        // if (searched) this.$set(node, 'expanded', true) // 展开
        for(let [i, node] of children.entries()) {
          this._searchNodes(filterFn, node, i, matched, path)
        }
      }
    },
    _getDefVal (attr) {
      return this.$defVal[attr] || false
    },
    _dedupe (arr) {
      return [...new Set(arr)]
    },
    _showSearchNodes (node, matched) {
      matched = matched.map(path => [...path])
      const setAttrs = this.setAttrs
      const dedupe = this._dedupe
      let isSame = true
      while (isSame && matched.length > 0) {
        const {children} = node
        // 将长度为1的匹配路径设置为'searched'
        const newMatched = []
        const searchedPaths = matched.filter(x => {
          const len = x.length
          if ( len > 1) {
            newMatched.push(x)
          }
          return len === 1
        })
        searchedPaths.forEach(path => {
          setAttrs(children[path[0]], ['visible', 'expanded', 'searched'])
        })
        const samePaths = dedupe(matched.map(item => item[0]))
        const len = samePaths.length
        if (len !== children.length) {
          children.forEach((childNode, i) => {
            if (!samePaths.includes(i)) {
              this.setAttr(childNode, 'visible', false)
            }
          })
        }
        if(newMatched.length > 0) {
          if(len === 1) {
            matched = newMatched.map(x => x.slice(1))
            node = children[samePaths[0]]
            setAttrs(node, ['visible', 'expanded'])
          } else {
            samePaths.forEach( pathIndex => {
              let childNode = children[pathIndex]
              setAttrs(childNode, ['visible', 'expanded'])
              this._showSearchNodes(childNode, matched.filter(x => x[0] === pathIndex && x.length > 1).map(x => x.slice(1)))
            })
            isSame = false
          }
        } else {
          isSame = false
        }
      }
    },
    _modifyAllNode (node, attrsObj = {'visible': true, 'searched': false}) {
      for (let [key, val] of Object.entries(attrsObj)) {
        this.setAttr(node, key, val)
      }
      const {children} = node
      if (children && children.length > 0) {
        children.forEach(node => this._modifyAllNode(node, attrsObj))
      }
    }
  }
}
</script>
