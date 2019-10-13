<template>
  <TreeUl v-bind="childBind"/>
</template>
<script>
import TreeUl from "./treeUl";
export default {
  name: "Tree",
  inheritAttrs: false,
  components: { TreeUl },
  provide() {
    return {
      isLeaf: this.isLeaf,
      childChecked: this.childCheckedHandle,
      parentChecked: this.parentCheckedHandle,
      emitEventToTree: this.emitEventToParent,
      nodeSelected: this.nodeSelected,
      setAttr: this.setAttr
    };
  },
  data() {
    return {
      radioNode: null // 单选节点
    };
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
    maxLevel: {
      // 最大层级
      type: Number,
      default: 1024
    },
    topMustExpand: {
      // 首层必须可以展开
      type: Boolean,
      default: true
    },
    allowGetParentNode: {
      // 允许获取父节点
      type: Boolean,
      default: false
    },
    radio: {
      // 单选, selected节点至多可以选一个
      type: Boolean,
      default: false
    },
    selectAlone: {
      // select事件不影响checkbox
      type: Boolean,
      default: false
    },
    allowCheckedChildrenOfDisabledChild: {
      type: Boolean,
      default: true
    }
  },
  beforeCreate() {
    // 默认为false
    this.$defVal = {
      visible: true
    };
  },
  computed: {
    childBind() {
      return Object.assign({}, this.$attrs, this.$props);
    }
  },
  methods: {
    // 通过依赖注入共享的方法
    /* @method Determine whether it is a leaf node
     * @param node current node
     */
    isLeaf(node) {
      return !(node.children && node.children.length);
    },
    childCheckedHandle(node, checked, halfcheck = false) {
      const { children } = node;
      if (children && children.length) {
        children.forEach(child => {
          if (!child.chkDisabled) {
            this.$set(child, "checked", checked);
            if (halfcheck) {
              this.$set(child, "halfcheck", false);
            }
            this.$set(child, "parentCheckedToChildren", true);
          }
          if (this.allowCheckedChildrenOfDisabledChild) {
            this.childCheckedHandle(child, checked, halfcheck);
          }
        });
      }
    },
    parentCheckedHandle(parentNode, checked, halfcheck = false) {
      if (!parentNode || parentNode.chkDisabled ) return false;
      let someBortherNodeChecked = checked, allBortherNodeChecked = checked;
      const childNodes = parentNode.children
      if (checked) {
        allBortherNodeChecked = childNodes.every(child => child.checked);
      } else {
        someBortherNodeChecked = childNodes.some(({ checked, halfcheck: itemHalfCheck }) => {
          return checked || ( halfcheck && itemHalfCheck)
        });
      }
      if (halfcheck) {
        // all / some / none
        const nodeHalfcheck = checked
          ? !allBortherNodeChecked
          : someBortherNodeChecked;
        const { halfcheck: oldHalfCheck = false } = parentNode;
        if (oldHalfCheck !== nodeHalfcheck) {
          this.$set(parentNode, "halfcheck", nodeHalfcheck);
        } else if (nodeHalfcheck) {
          return false;
        }
        this.$set(parentNode, "checked", allBortherNodeChecked);
      } else {
        this.$set(parentNode, "checked", allBortherNodeChecked);
      }
      return true;
    },
    emitEventToParent(eventName, ...args) {
      if (!eventName) return;
      // 为了让接口更清晰
      if ("node-mouse-over" != eventName)
        switch (eventName) {
          case "node-mouse-over":
          case "node-check":
          case "drag-node-end":
          case "del-node":
          case "node-click":
          case "node-select": // 和 'node-click'一样,为了更好的语义化
          case "async-load-nodes":
          case "node-expand":
            this.$emit(eventName, ...args);
            break;
          default:
            throw new ReferenceError(
              `the event of ${eventName} is not effective`
            );
        }
    },
    // 设置node属性
    setAttr(node, attr, val = true) {
      const { [attr]: defVal = this._getDefVal(attr) } = node;
      if (defVal !== val) {
        this.$set(node, attr, val);
      }
    },
    setAttrs(node, attrs = [], val = true) {
      const setAttr = this.setAttr;
      attrs.forEach(attr => setAttr(node, attr, val));
    },
    // 内部使用方法
    updateRadioNode(node, selected = false) {
      if (!selected) return;
      const previousNode = this.radioNode;
      if (previousNode) {
        this.setNodeAttr(previousNode, "selected", !selected);
      }
      this.radioNode = node;
    },
    // 对外暴露的方法,通过ref访问

    // set node attr
    setNodeAttr(node, attr, val = true) {
      if (!node || !attr) return;
      if (node.hasOwnProperty(attr)) {
        this.setAttr(node, attr, val);
      } else {
        this.$set(node, attr, val);
      }
    },
    /*
     *@method change the node selected  method
     *@param node current node
     */
    nodeSelected(node, position) {
      const selected = !node.selected;
      const changeCheck = this.multiple && !this.selectAlone;
      if (changeCheck) {
        this.$set(node, "checked", selected);
      }
      if (this.radio) {
        this.updateRadioNode(node, selected);
      }
      this.$set(node, "selected", selected); // 只对当前的selected属性有效
      if (changeCheck) {
        this.childCheckedHandle(node, selected, this.halfcheck);
      }
      this.emitEventToParent("node-click", node, selected, position);
      this.emitEventToParent("node-select", node, selected, position);
    },

    /* @method adding child node
     * @param node parent node
     * @param newnode  new node
     */
    addNode(parent, newNode) {
      if (!parent) return;
      let addnode = null;
      this.$set(parent, "expanded", true);
      const newNodeType = typeof newNode;
      if (newNodeType === "undefined") {
        throw new ReferenceError("newNode is required but undefined");
      } else if (newNodeType === "string") {
        addnode = { title: newNode };
      } else if (newNodeType === "object") {
        if (!newNode.hasOwnProperty("title")) {
          throw new ReferenceError("the title property is missed");
        } else {
          addnode = newNode;
        }
      } else {
        throw new ReferenceError(
          `newNode type error, not allowed ${newNodeType}`
        );
      }
      const { halfcheck, checked } = parent;
      addnode = Object.assign(
        {
          checked: !halfcheck && checked
        },
        addnode
      );
      if (this.isLeaf(parent)) {
        this.$set(parent, "children", []);
        parent.children.push(addnode);
      } else {
        parent.children.push(addnode);
      }
    },

    /* @method adding childlren nodes
     * @param node parent node
     * @param newnode  new node
     */
    addNodes(parent, children) {
      if (!parent) return;
      for (let n of children) {
        this.addNode(parent, n);
      }
    },

    /* @method delete a node
     * @param  parent parent node
     * @param  node current node
     */
    delNode(node, parent, index) {
      if (parent === null || typeof parent === "undefined") {
        if (this.canDeleteRoot) {
          this.data.splice(index, 1);
        } else {
          throw new ReferenceError("the root element can't deleted!");
        }
      } else {
        parent.children.splice(index, 1);
      }
      // this.$emit('delNode', { parentNode: parent, delNode: node })
      this.emitEventToParent("del-node", { parentNode: parent, delNode: node });
    },

    /*
     *@method get Nodes by options method
     *@param data nodes
     *@param opt the options that filter the node
     */
    getNodes(opt = {}, data, isOriginal, ignoreInvisibleNode = false) {
      const optArr = Object.entries(opt);
      const hasOpt = optArr.length > 0;
      return this._getNodes(
        optArr,
        hasOpt,
        data,
        isOriginal,
        ignoreInvisibleNode
      );
    },

    // opt: Array
    _getNodes(
      opt,
      hasOpt,
      data = this.data,
      isOriginal = false,
      ignoreInvisibleNode,
      res = []
    ) {
      // let res = []
      const _pushNode = (arr, node, isOrg) => {
        if (isOrg) {
          arr.push(node);
        } else {
          const n = Object.assign({}, node);
          Reflect.deleteProperty(n, "hasExpanded");
          Reflect.deleteProperty(n, "children");
          Reflect.deleteProperty(n, "parent");
          arr.push(n);
        }
      };
      const pushNode = node => _pushNode(res, node, isOriginal);
      // is a node matched the condition
      const getDefVal = this._getDefVal;
      const _isMatchedNode = (node, condition) => {
        let matched = true;
        for (let [attr, val] of condition) {
          if (node.hasOwnProperty(attr)) {
            const { [attr]: nodeVal = getDefVal(attr) } = node;
            matched = nodeVal === val;
          } else {
            matched = false;
          }
          if (!matched) break;
        }
        return matched;
      };
      const isMatchedNode = node => _isMatchedNode(node, opt);

      for (const node of data) {
        const { children, visible = true } = node;
        if (ignoreInvisibleNode && !visible) {
          continue;
        }
        if (hasOpt) {
          if (isMatchedNode(node)) {
            pushNode(node);
          }
        } else {
          pushNode(node);
        }
        if (children && children.length) {
          this._getNodes(
            opt,
            hasOpt,
            children,
            isOriginal,
            ignoreInvisibleNode,
            res
          );
        }
      }
      return res;
    },

    /*
     *@method get Nodes that selected
     */
    getSelectedNodes(isOriginal, ignoreInvisibleNode = false) {
      return this.getNodes(
        { selected: true },
        this.data,
        isOriginal,
        ignoreInvisibleNode
      );
    },

    /*
     *@method get Nodes that checked
     */
    getCheckedNodes(isOriginal, ignoreInvisibleNode = false) {
      return this.getNodes(
        { checked: true },
        this.data,
        isOriginal,
        ignoreInvisibleNode
      );
    },
    /*
     *@method filter nessary nodes methods
     *@param filter string or predicate expression
     *@param data current nodes
     */
    searchNodes(filter, data = this.data) {
      if (
        filter == null ||
        (typeof filter === "string" && filter.trim() === "")
      ) {
        data.forEach(node => this._modifyAllNode(node));
        return;
      }
      const filterFn =
        typeof filter === "function"
          ? filter
          : ({ title = "" } = {}) => title.includes(filter);
      const searchRes = Array.from({ length: data.length }, () => []);
      data.forEach((node, index) => {
        const matched = searchRes[index];
        this._searchNodes(filterFn, node, index, matched);
        if (matched.length > 0) {
          matched.sort((x, y) => x.length - y.length); // 根据长度升序
          const attrs = ["visible", "expanded"];
          if (matched.some(x => x.length === 1)) {
            attrs.push("searched");
          }
          this.setAttrs(node, attrs);
          this._showSearchNodes(
            node,
            matched.map(x => x.slice(1)).filter(x => x.length)
          );
        } else {
          this.setAttr(node, "visible", false);
        }
      });
    },
    _searchNodes(filterFn, node, index, matched, path = []) {
      const isMatched = filterFn(node);
      path = [...path, index];
      if (isMatched) {
        // 如果titile的内容是html,html内容也能被搜索到
        matched.push(path);
      }
      // this.$set(node, 'searched', searched)
      // this.$set(node, 'visible', false)
      const { children } = node;
      if (children && children.length) {
        // if (searched) this.$set(node, 'expanded', true) // 展开
        for (let [i, node] of children.entries()) {
          this._searchNodes(filterFn, node, i, matched, path);
        }
      }
    },
    _getDefVal(attr) {
      return this.$defVal[attr] || false;
    },
    _dedupe(arr) {
      return [...new Set(arr)];
    },
    _showSearchNodes(node, matched) {
      matched = matched.map(path => [...path]);
      const setAttrs = this.setAttrs;
      const dedupe = this._dedupe;
      let isSame = true;
      while (isSame && matched.length > 0) {
        const { children } = node;
        // 将长度为1的匹配路径设置为'searched'
        const newMatched = [];
        const searchedPaths = matched.filter(x => {
          const len = x.length;
          if (len > 1) {
            newMatched.push(x);
          }
          return len === 1;
        });
        searchedPaths.forEach(path => {
          setAttrs(children[path[0]], ["visible", "expanded", "searched"]);
        });
        const samePaths = dedupe(matched.map(item => item[0]));
        const len = samePaths.length;
        if (len !== children.length) {
          children.forEach((childNode, i) => {
            if (!samePaths.includes(i)) {
              this.setAttr(childNode, "visible", false);
            }
          });
        }
        if (newMatched.length > 0) {
          if (len === 1) {
            matched = newMatched.map(x => x.slice(1));
            node = children[samePaths[0]];
            setAttrs(node, ["visible", "expanded"]);
          } else {
            samePaths.forEach(pathIndex => {
              let childNode = children[pathIndex];
              setAttrs(childNode, ["visible", "expanded"]);
              this._showSearchNodes(
                childNode,
                matched
                  .filter(x => x[0] === pathIndex && x.length > 1)
                  .map(x => x.slice(1))
              );
            });
            isSame = false;
          }
        } else {
          isSame = false;
        }
      }
    },
    _modifyAllNode(node, attrsObj = { visible: true, searched: false }) {
      for (let [key, val] of Object.entries(attrsObj)) {
        this.setAttr(node, key, val);
      }
      const { children } = node;
      if (children && children.length > 0) {
        children.forEach(node => this._modifyAllNode(node, attrsObj));
      }
    }
  }
};
</script>
<style>
.halo-tree li span:hover {
  background-color: transparent;
  /* padding: 6px 0; */
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0;
}
.halo-tree .expand-enter-active {
  transition: all 3s ease;
  height: 50px;
  overflow: hidden;
}
.halo-tree .expand-leave-active {
  transition: all 3s ease;
  height: 0px;
  overflow: hidden;
}
.halo-tree .expand-enter,
.halo-tree .expand-leave {
  height: 0;
  opacity: 0;
}
.halo-tree {
  font-size: 14px;
  -webkit-transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out,
    0.3s padding-bottom ease-in-out;
  transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out,
    0.3s padding-bottom ease-in-out;
}
.halo-tree ul {
  box-sizing: border-box;
}
.halo-tree ul,
.halo-tree li {
  list-style-type: none;
  text-align: left;
}
.halo-tree .inputCheck {
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
.halo-tree .inputCheck.notAllNodes:before {
  content: "\2713";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #888888;
  z-index: 1;
  color: #ffffff;
}
.halo-tree .inputCheck.box-checked:after {
  content: "\2713";
  display: block;
  position: absolute;
  z-index: 1;
  width: 100%;
  text-align: center;
}
.halo-tree .box-halfchecked {
  background-color: #888888;
}
.halo-tree .box-halfchecked:after {
  content: "\2713";
  display: block;
  position: absolute;
  z-index: 1;
  width: 100%;
  text-align: center;
  color: #ffffff;
}
.halo-tree .check {
  display: block;
  position: absolute;
  font-size: 14px;
  width: 16px;
  height: 16px;
  left: -5px;
  top: -4px;
  border: 1px solid #000000;
  opacity: 0;
  cursor: pointer;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  z-index: 2;
}
.halo-tree .chkDisabled {
  background-color: #f5f5f5;
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
  content: "";
  left: -8px;
  position: absolute;
  right: auto;
  border-width: 1px;
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
  width: 28px;
}
.halo-tree li:last-child::before {
  height: 26px;
}
.halo-tree > li.first-node:before {
  top: 17px;
}
.halo-tree > li.second-node:before {
  top: 4px;
}
.halo-tree > li.first-node.only-node::before {
  border-left: none;
}
.halo-tree > li.only-node:after {
  border-top: none;
}
.halo-tree > ul {
  padding-left: 0;
}
.halo-tree ul {
  padding-left: 17px;
  padding-top: 10px;
}
.halo-tree .tree-expand {
  display: inline-block;
  width: 14px;
  height: 14px;
  text-align: center;
  line-height: 13px;
  border: 1px solid #888888;
  border-radius: 2px;
  background: #ffffff;
  font-style: normal;
}
.halo-tree .tree-open {
  line-height: 13px;
}
.halo-tree .tree-close:after {
  content: "+";
}
.halo-tree .tree-open:after {
  content: "\2013";
}
.halo-tree .tree-empty:after {
  content: "";
}
.halo-tree .tree-node-el {
  background-color: #ffffff;
  padding-left: 2px;
  position: relative;
  z-index: 3;
}
.halo-tree li.leaf {
  padding-left: 15px;
}
.halo-tree li.leaf:after {
  content: "";
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
  -webkit-box-shadow: 0 2px 2px rgba(16, 142, 233, 0.2);
  box-shadow: 0 2px 2px rgba(16, 142, 233, 0.2);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.halo-tree .node-title {
  padding: 3px 3px;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 2px;
}
.halo-tree .node-title:hover {
  background-color: #ccc;
}
.halo-tree .node-title-disabled {
  padding: 3px 3px;
  border-radius: 3px;
  background-color: #f5f5f5;
  opacity: 1;
  cursor: not-allowed;
  margin: 0 2px;
}
.halo-tree .node-title-disabled:hover {
  background-color: #f5f5f5;
}
.halo-tree .node-selected {
  border: 1px solid #dddddd;
  background-color: #dddddd;
}
.halo-tree .node-title.node-searched {
  border: 1px solid #ff8247;
}
</style>