[![npm](https://img.shields.io/npm/v/vue-tree-halower.svg )](https://www.npmjs.com/package/vue-tree-halower)
[![npm](https://img.shields.io/npm/dt/vue-tree-halower.svg)](https://www.npmjs.com/package/vue-tree-halower)
[![GitHub stars](https://img.shields.io/github/stars/halower/vue-tree.svg?style=social&label=Stars&style=for-the-badge)](https://github.com/halower/vue-tree/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/halower/vue-tree.svg?style=social&label=Fork&style=for-the-badge)](https://github.com/halower/vue-tree/network)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

`文档写得很简单，欢迎大家在使用的过程中完善文档，以更好的为其它人提供帮助。`
# Version: 2.x  ([English Document](https://github.com/halower/vue2-tree/blob/master/README.md))
```QQ Group: 255965810``` <br/>
`如果看老版本请点击这里` [version 1.0](https://github.com/halower/vue2-tree/tree/1.x)
# Online Demo
[https://halower.github.io/vue-tree](http://120.77.84.4/)


# SelectTree API
最新的发布版本已经支持下拉树功能, 在基本属性和事件(与 [Tree API](https://github.com/halower/vue-tree/blob/master/README_CN.md#tree-api-%E6%96%87%E6%A1%A3)一致)不变的前提下扩展了如下 

| 参数      | 说明    | 类型      | 可选值 | 默认值  |
|---------- |-------- |---------- |---------- |---------- |
|searchable     | 是否需要搜索功能 | Boolean | Y | true |
|pleasechoosetext     | 下拉框默认提示本文 | String | Y | please choose... |
|searchtext     | 搜索框框默认提示本文 | String | Y | search... |
|searchFilter | 自定义搜索下拉树过滤函数 | Function | Y | node => mode.title.indexOf(this.searchworld) > -1 |

### 效果图（这里不做Demo，其它效果和OnlineDemo一样）
![效果图](https://github.com/halower/vue-tree/blob/master/screenshots/selectTree.png)
### 如何使用
使用选择树组件请先阅读[Tree API](https://github.com/halower/vue-tree/blob/master/README_CN.md#tree-api-%E6%96%87%E6%A1%A3) 文档

```
import { VTree, VSelectTree } from 'vue-tree-halower'
Vue.use (VTree)
Vue.use (VSelectTree)
 -------------------
<v-select-tree :data='treeData' v-model="['node-1-2']"/>
```
# Tree API 文档
###  Node 属性
| 参数      | 说明    | 类型      | 可选值 | 默认值  |
|---------- |-------- |---------- |---------- |---------- |
|id     | 当这个属性为空，title属性将作为key | String | Y | — |
|title     | 节点名称 | String | N | — |
|expanded |  节点是否展开 | Boolean | Y | false |
|checked |  节点复选框是否选中 | Boolean | Y | false |
|halfcheck |  节点是否为半选（下级被选中） | Boolean | Y | false |
|visible |  节点是否可见 | Boolean | Y | true |
|selected |  节点是否被选中 | Boolean | Y | false |
|children |  子节点 | Array[Object] | Y | — |
|async | 是否异步加载子节点 | Boolean | Y | false |
|loading | 开启加载效果 | Boolean | Y | false |
|nocheck | 多复选框开启时指定某一节点不渲染复选框 | Boolean | Y | false |
|chkDisabled | 禁用某一结点的复选框的功能 | Boolean | Y | false |
|hasExpanded | 某一结点是否已经展开过(之前错误拼写成了hasExpended) | Boolean | Y | false |
|parent | 获取父节点(当allowGetParentNode=true时,增加parent方法,若父节点不存在时,会返回null)) | Function | - | undefined |
|selDisabled | 禁用某一结点的select的功能 | Boolean | Y | false |
###  Tree 属性
| 参数      | 说明    | 类型      | 可选值 | 默认值  |
|---------- |-------- |---------- |---------- |---------- |
|data     | 树数据源 | Array[Object] | N | — |
|multiple |  开启复选模式 | Boolean | Y | false |
|tpl |  自定义模板 | JSX | Y | false |
|halfcheck |  开启半选模式 | Boolean | Y | 全选 |
|scoped |  隔离节点选中状态 | Boolean | Y | false |
|draggable | 是否支持拖拽 | Boolean | Y | false |
|dragAfterExpanded | 拖拽后展开   | Boolean | Y | true |
|canDeleteRoot |  是否可以删除根节点 | Boolean | Y | false |
|maxLevel |  最大层级数 | Number | Y | 1024 |
|topMustExpand |  首层是否必须可展开 | Boolean | Y | true |
|allowGetParentNode |  是否允许节点获取父节点 | Boolean | Y | false |
|radio | selected 只允许单选 | Boolean | Y | false |
|selectAlone | select事件不影响checkbox | Boolean | Y | false |

### 方法
| 方法名      | 说明    | 参数      |
|---------- |-------- |---------- |
| getSelectedNodes  | 返回目前被选中的节点所组成的数组,isOriginal:默认false, ignoreInvisibleNode:默认false| isOriginal: Boolean,ignoreInvisibleNode: Boolean |
| getCheckedNodes  | 返回目前复选框选中的节点组成的数组 | isOriginal: Boolean,ignoreInvisibleNode: Boolean |
| getNodes | options: 可以包含一些过滤属性对象如{selected: true}，如果为空，请使用 {}; data: 数组,内容为[node,...],默认为传入的data数据;isOriginal:获取的数据是否保持原样,默认为false,会去掉`children``hasExpanded``parent`属性,ignoreInvisibleNode:忽略不可见节点,默认false|options: Object, data: Array,isOriginal: Boolean,ignoreInvisibleNode: Boolean|
| searchNodes | filter:function/string (如果是函数则最终会返回一个boolean类型);data:默认为this.data |filter:Function || String, data: Array|
| nodeSelected | 选中节点方法 |node: Object|
| addNode | 增加节点 |parentNode: Object(不能为空), node: Object|
| addNodes | 增加多个节点 |parentNode: Object(不能为空), nodes: Array|

### 事件
| 事件名      | 说明    | 参数      |
|---------- |-------- |---------- |
| node-click  | 单击节点触发的事件 | node: Object |
| node-select  | 选择节点后触发的事件(和node-click是一样的)；position: 位置信息level：层级 | node: Object, selected: boolean, position: {level, index}|
| node-check | 点击checkbox触发事件 | node: Object, checked: boolean, position: {level, index} |
| node-mouse-over | 鼠标滑过节点触发事件 | node: Object, index: Number, parentNode: node, position: {level, index} |
| async-load-nodes | 用于实现异步加载 | node: Object |
| drag-node-end | 节点拖拽结束后触发事件 | {dragNode: Object, targetNode: Object} |
| del-node | 删除节点后触发事件 | { parentNode: Object || null, delNode: Object } |
| node-expand | expand触发事件 | node: Object, expand: boolean, position: {level, index} |

### 如何使用

Step1: install plugins （Vue Cli3 不需要,请查看demo）
```
npm install babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props babel-preset-env --save-dev

npm install vue-tree-halower  --save
```
```
Step2: In your .babelrc （Vue Cli3 不需要,请查看demo）
```
{
  "presets": ["env"],
  "plugins": ["transform-vue-jsx"]
}

Step3： In your main.js
```
import 'vue-tree-halower/dist/halower-tree.min.css' // 你可以自定义树的样式
import VTree from 'vue-tree-halower'

Vue.use(VTree)

```

### Demo

`Html`
```
  <div class="tree">
    <input class="tree-search-input" type="text" v-model.lazy="searchword" placeholder="search..."/>
    <button class=" tree-search-btn" type="button" @click="search">GO</button>
    <v-tree ref='tree' :data='treeData' :multiple="true" :tpl='tpl' :halfcheck='true' />
  </div>
```
`JS`
```
export default {
  name: 'DemoTree',
  data () {
    return {
      lang: 'zh',
      searchword: '',
      treeData: [{
        title: '一级节点',
        expanded: true,
        children: [{
          title: '二级节点1',
          expanded: true,
          children: [{
            title: '三级节点1-1'
          }, {
            title: '三级节点1-2'
          }, {
            title: '三级节点1-3'
          }]
        }, {
          title: '二级节点2',
          children: [{
            title: "<span style='color: red'>三级节点2-1</span>"
          }, {
            title: "<span style='color: red'>三级节点2-2</span>"
          }]
        }]
      }]
    }
  },
  methods: {
    // tpl (node, ctx, parent, index, props) {
    tpl (...args) {
      let {0: node, 2: parent, 3: index} = args
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      if (node.searched) titleClass += ' node-searched'
      return <span>
        <button class="treebtn1" onClick={() => this.$refs.tree.addNode(node, {title: 'sync node'})}>+</button>
         <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => {
           this.$refs.tree.nodeSelected(node)
         }}></span>
      <button class="treebtn2" onClick={() => this.asyncLoad(node)}>async</button>
      <button class="treebtn3" onClick={() => this.$refs.tree.delNode(node, parent, index)}>delete</button>
      </span>
    },
    async asyncLoad (node) {
      this.$set(node, 'loading', true)
      let pro = new Promise(resolve => {
        setTimeout(resolve, 2000, ['async node1', 'async node2'])
      })
      this.$refs.tree1.addNodes(node, await pro)
      this.$set(node, 'loading', false)
    },
    search () {
      this.$refs.tree.searchNodes(this.searchword)
    }
  }
}
```
### 如果你觉得这个项目帮助到了你，你可以帮作者买一杯果汁表示鼓励
<img src="https://github.com/halower/vue2-tree/blob/master/src/assets/hello.png" width=256 height=256 />
