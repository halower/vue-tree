webpackJsonp([1],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(22),
  /* template */
  __webpack_require__(15),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(20)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(23),
  /* template */
  __webpack_require__(17),
  /* scopeId */
  "data-v-e0674d5c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(19)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(24),
  /* template */
  __webpack_require__(16),
  /* scopeId */
  "data-v-9e877da6",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "width": "300px"
    },
    attrs: {
      "id": "app"
    }
  }, [_c('tree', {
    ref: "tree",
    attrs: {
      "treeData": _vm.treeData,
      "options": _vm.options
    }
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "halo-tree"
  }, [_c('div', {
    staticClass: "input"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.search),
      expression: "search"
    }],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.search)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.search = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon search"
  })]), _vm._v(" "), _c('tree-node', {
    attrs: {
      "treeData": _vm.store.root,
      "options": _vm.options
    },
    on: {
      "handlecheckedChange": _vm.handlecheckedChange
    }
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', _vm._l((_vm.nodeData), function(item) {
    return _c('li', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (item.visible),
        expression: "item.visible"
      }],
      class: [(item.children && item.children.length > 0) ? '' : 'leaf']
    }, [(item.children && item.children.length > 0) ? _c('i', {
      class: [item.open ? 'tree-open' : 'tree-close', 'icon'],
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.handleNodeExpand(item)
        }
      }
    }) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "inputCheck",
      class: {
        notAllNodes: item.nodeSelectNotAll
      },
      style: ({
        width: _vm.inputWidth + 'px',
        height: _vm.inputWidth + 'px'
      }),
      on: {
        "click": function($event) {
          _vm.walkCheckBox(item)
        }
      }
    }, [(_vm.options.showCheckbox && _vm.options.halfCheckedStatus && !item.nodeSelectNotAll) ? _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (item.checked),
        expression: "item.checked"
      }],
      staticClass: "check",
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": Array.isArray(item.checked) ? _vm._i(item.checked, null) > -1 : (item.checked)
      },
      on: {
        "change": function($event) {
          _vm.handlecheckedChange(item)
        },
        "__c": function($event) {
          var $$a = item.checked,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = null,
              $$i = _vm._i($$a, $$v);
            if ($$c) {
              $$i < 0 && (item.checked = $$a.concat($$v))
            } else {
              $$i > -1 && (item.checked = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            item.checked = $$c
          }
        }
      }
    }) : _vm._e()]), _vm._v(" "), _c('span', {
      class: {
        'node-selected': (item.checked && !_vm.options.showCheckbox) || item.searched
      },
      on: {
        "click": function($event) {
          _vm.handleNode(item)
        }
      }
    }, [_vm._v("\n       " + _vm._s(item.label) + "\n    ")]), _vm._v(" "), (item.children && item.children.length > 0) ? _c('tree-node', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (item.open),
        expression: "item.open"
      }],
      attrs: {
        "options": _vm.options,
        "tree-data": item.children
      },
      on: {
        "handlecheckedChange": _vm.handlecheckedChange
      }
    }) : _vm._e()], 1)
  }))
},staticRenderFns: []}

/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_tree_tree_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_tree_tree_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_tree_tree_vue__);
//
//
//
//
//


let that = null;
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',
  data() {
    that = this;
    return {
      options: {
        showCheckbox: true,
        halfCheckedStatus: true, //控制父框是否需要半钩状态
        search: {
          useInitial: true,
          useEnglish: false,
          customFilter: null
        }
      },
      treeData: []
    };
  },
  mounted: function (resolve) {
    this.loadTreeData(resolve);
  },
  methods: {
    loadTreeData: function (resolve) {
      return new Promise(resolve => {
        setTimeout(() => {
          that.treeData = [{
            id: 1,
            label: '一级节点',
            open: true,
            checked: false,
            nodeSelectNotAll: false, //新增参数，表示父框可以半钩状态
            parentId: null,
            visible: true,
            searched: false,
            children: [{
              id: 2,
              label: '二级节点-1',
              checked: false,
              nodeSelectNotAll: false,
              parentId: 1,
              searched: false,
              visible: true
            }, {
              label: '二级节点-2',
              open: true,
              checked: false,
              nodeSelectNotAll: false,
              id: 3,
              parentId: 1,
              visible: true,
              searched: false,
              children: [{
                id: 4,
                parentId: 3,
                label: '三级节点-1',
                visible: true,
                searched: false,
                checked: false,
                nodeSelectNotAll: false
              }, {
                id: 5,
                label: '三级节点-2',
                parentId: 3,
                searched: false,
                visible: true,
                checked: false,
                nodeSelectNotAll: false
              }]
            }, {
              label: '二级节点-3',
              open: true,
              checked: false,
              nodeSelectNotAll: false,
              id: 6,
              parentId: 1,
              visible: true,
              searched: false,
              children: [{
                id: 7,
                parentId: 6,
                label: '三级节点-4',
                checked: false,
                nodeSelectNotAll: false,
                searched: false,
                visible: true
              }, {
                id: 8,
                label: '三级节点-5',
                parentId: 6,
                checked: false,
                nodeSelectNotAll: false,
                searched: false,
                visible: true
              }]
            }]
          }];
          resolve(that.treeData);
        }, 100);
      });
    }
  },
  components: {
    Tree: __WEBPACK_IMPORTED_MODULE_0__components_tree_tree_vue___default.a
  }
});

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'treeNode',
  props: {
    treeData: [Array],
    options: [Object]
  },
  data() {
    return {
      nodeData: []
    };
  },
  created() {
    const parent = this.$parent;
    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }

    const tree = this.tree;
    if (!tree) {
      console.warn('找不到树节点');
    }
    this.nodeData = (this.treeData || []).slice(0);
  },
  computed: {
    inputWidth: function () {
      if (this.checkFirfox()) {
        return 14;
      }
      return 13;
    }
  },
  watch: {
    treeData: function (data) {
      this.nodeData = (data || []).slice(0);
    }
  },
  methods: {
    checkFirfox() {
      let u = navigator.userAgent;
      if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1) {
        return true;
      }
      return false;
    },
    walkCheckBox(node) {
      if (node.nodeSelectNotAll) {
        node.checked = !node.checked;
        this.handlecheckedChange(node);
      }
    },
    handleNodeExpand(node) {
      node.open = !node.open;
    },
    handlecheckedChange(node) {
      this.$emit('handlecheckedChange', node);
    },
    handleNode(node) {
      if (this.tree.store.last) {
        if (this.tree.store.last.id === node.id) {
          this.tree.store.last.checked = !this.tree.store.last.checked;
        } else {
          this.tree.store.last.checked = false;
          node.checked = true;
          this.tree.store.last = node;
        }
      } else {
        this.tree.store.last = node;
        node.checked = true;
      }
      this.tree.$emit('node-click', node);
    }
  }
});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tree_node_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tree_node_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__tree_node_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tree_store__ = __webpack_require__(25);
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'tree',
  props: {
    treeData: [Array],
    options: [Object]
  },
  data() {
    return {
      search: null,
      store: {
        root: [],
        last: null
      }
    };
  },
  created() {
    this.isTree = true;
    this.store = new __WEBPACK_IMPORTED_MODULE_1__tree_store__["a" /* default */]({
      root: (this.treeData || []).slice(0),
      last: null
    });
  },
  watch: {
    search: function (val) {
      this.store.filterNodes(val, this.options.search);
    },
    treeData: function (data) {
      this.store = new __WEBPACK_IMPORTED_MODULE_1__tree_store__["a" /* default */]({
        root: (this.treeData || []).slice(0),
        last: null
      });
    }
  },
  methods: {
    handlecheckedChange(node) {
      if (this.options.halfCheckedStatus) {
        this.store.changeCheckHalfStatus(node);
      } else {
        this.store.changeCheckStatus(node);
      }
      this.$emit('handlecheckedChange', node);
    },
    getSelectedNodes() {
      const allnodes = this.store.datas;
      let selectedNodes = [];
      for (let [, node] of allnodes) {
        if (node.checked) {
          selectedNodes.push(node);
        }
      }
      return selectedNodes;
    },
    getSelectedNodeIds() {
      const allnodes = this.store.datas;
      let selectedNodeIds = [];
      for (let [, node] of allnodes) {
        if (node.checked) {
          selectedNodeIds.push(node.id);
        }
      }
      return selectedNodeIds;
    }
  },
  components: { TreeNode: __WEBPACK_IMPORTED_MODULE_0__tree_node_vue___default.a }
});

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const pinyin = __webpack_require__(12);
class TreeStore {
    constructor(options) {
        for (let option in options) {
            if (options.hasOwnProperty(option)) {
                this[option] = options[option];
            }
        }
        this.datas = new Map();
        const _traverseNodes = root => {
            for (let node of root) {
                this.datas.set(node.id, node);
                if (node.children && node.children.length > 0) _traverseNodes(node.children);
            }
        };
        _traverseNodes(this.root);
    }

    changeCheckStatus(node) {
        const _traverseUp = node => {
            if (node.checked && node.parentId) {
                let parent = this.getNode(node.parentId);
                parent.checked = this.sameSilibingChecked(node.parentId, node.id);
                _traverseUp(parent);
            } else {
                if (!node.checked && node.parentId) {
                    let upparent = this.getNode(node.parentId);
                    upparent.checked = false;
                    if (upparent.parentId) {
                        _traverseUp(upparent);
                    }
                }
            }
        };

        const _traverseDown = node => {
            if (node.children && node.children.length > 0) {
                for (let child of node.children) {
                    child.checked = node.checked;
                    _traverseDown(child);
                }
            }
        };
        _traverseUp(node);
        _traverseDown(node);
    }
    changeCheckHalfStatus(node) {
        let flag = false;
        //如果勾选的是子节点，父节点默认打上勾
        const _traverseUp = (node, flag) => {
            let parent = null;
            if (node.checked) {
                //打钩
                if (node.parentId) {
                    parent = this.getNode(node.parentId);
                    if (flag) {
                        parent.checked = true;
                        parent.nodeSelectNotAll = true;
                        _traverseUp(parent, true);
                    } else {
                        parent.checked = true;
                        parent.nodeSelectNotAll = this.sameSilibingHalfChecked(true, parent, node.parentId, node.id) === 'half' ? true : false; //返回true则全钩，false为半钩
                        _traverseUp(parent);
                    }
                }
            } else {
                //去钩
                if (node.parentId) {
                    parent = this.getNode(node.parentId);
                    if (this.sameSilibingHalfChecked(false, parent, node.parentId, node.id) === "none") {
                        //返回true则全没钩，false为半钩
                        parent.checked = false;
                        parent.nodeSelectNotAll = false;
                    } else {
                        parent.checked = true;
                        parent.nodeSelectNotAll = true;
                    }
                    _traverseUp(parent, true);
                }
            }
        };
        const _traverseDown = node => {
            if (node.children && node.children.length > 0) {
                if (node.nodeSelectNotAll) {
                    //节点没勾选
                    node.nodeSelectNotAll = false;
                }
                for (let child of node.children) {
                    child.checked = node.checked;
                    _traverseDown(child);
                }
            }
        };
        _traverseUp(node);
        _traverseDown(node);
    }
    sameSilibingChecked(parentId, currentId) {
        let parent = this.datas.get(parentId);
        let sbIds = [];
        parent.children.forEach(x => {
            if (x.id !== currentId) sbIds.push(x.id);
        });
        for (let id of sbIds) {
            let node = this.getNode(id);
            if (!node.checked) return false;
        }
        return true;
    }
    sameSilibingHalfChecked(status, parent, parentId, currentId) {
        let sbIds = [];
        let currentNode = this.getNode(currentId);
        parent.children.forEach(x => {
            if (!currentNode.nodeSelectNotAll && x.id !== currentId) sbIds.push(x.id); //除去当前节点的剩下节点
        });

        if (status) {
            //打钩
            if (sbIds.length !== 0) {
                for (let id of sbIds) {
                    //子节点只要有一个被选中则父框打黑，全选打钩，全没有被选无状态
                    let node = this.getNode(id);
                    if (!node.checked || node.nodeSelectNotAll) {
                        //节点没勾选
                        return "half"; //表示父框半钩的状态
                    }
                }
            } else {
                if (currentNode.nodeSelectNotAll) {
                    return "half"; //表示全钩的状态
                }
            }
            return "all"; //表示全钩的状态
        } else {
            //去钩
            if (sbIds.length !== 0) {
                for (let id of sbIds) {
                    //子节点只要有一个被选中则父框打黑，全选打钩，全没有被选无状态
                    let node = this.getNode(id);
                    if (node.checked || node.nodeSelectNotAll) {
                        //有节点被勾选，父框半钩的状态
                        return "half";
                    }
                }
            } else {
                if (currentNode.nodeSelectNotAll) {
                    return "half"; //表示全钩的状态
                }
            }
            return "none";
        }
    }
    isExitParent(parent) {
        if (parent.id) {
            return this.getNode(node.parentId);
        }
        return null;
    }
    isNullOrEmpty(world) {
        if (world) {
            return world.trim().length === 0;
        }
        return true;
    }
    filterNodes(keyworld, searchOptions) {
        const _filterNode = (val, node) => {
            if (!val) return true;
            if (searchOptions.useEnglish) {
                return node.label.indexOf(val) !== -1;
            } else {
                return this.toPinYin(node.label, searchOptions.useInitial).indexOf(this.toPinYin(keyworld.toLowerCase(), searchOptions.useInitial, true)) !== -1;
            }
        };

        const _syncNodeStatus = node => {
            if (node.parentId) {
                let parentNode = this.getNode(node.parentId);
                if (node.visible) {
                    parentNode.visible = node.visible;
                    _syncNodeStatus(parentNode);
                }
            }
        };
        let filterFunc = searchOptions.customFilter && typeof searchOptions.customFilter === 'function' ? searchOptions.customFilter : _filterNode;
        this.datas.forEach(node => {
            node.visible = filterFunc(keyworld, node);
            node.searched = false;
            if (node.visible) {
                if (!this.isNullOrEmpty(keyworld)) {
                    node.searched = true;
                }
                _syncNodeStatus(node);
            }
        });
    }
    getNode(key) {
        return this.datas.get(key);
    }
    toPinYin(keyworld, useInitial) {
        if (/^[a-zA-Z]/.test(keyworld)) {
            return keyworld;
        }
        let fullpinyin = pinyin(keyworld, {
            filterChinese: true,
            noTone: true
        });
        if (useInitial) {
            let res = '';
            fullpinyin.split(' ').forEach(w => {
                if (!/[a-zA-Z]/.test(w)) {
                    res += w;
                } else {
                    res += w.slice(0, 1);
                }
            });
            return res;
        }
        return fullpinyin;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TreeStore;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ })
],[26]);
//# sourceMappingURL=app.e7eb3ac0e0a2c5daa1bb.js.map