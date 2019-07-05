[![npm](https://img.shields.io/npm/v/vue-tree-halower.svg )](https://www.npmjs.com/package/vue-tree-halower)
[![npm](https://img.shields.io/npm/dt/vue-tree-halower.svg)](https://www.npmjs.com/package/vue-tree-halower)
[![GitHub stars](https://img.shields.io/github/stars/halower/vue-tree.svg?style=social&label=Stars&style=for-the-badge)](https://github.com/halower/vue-tree/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/halower/vue-tree.svg?style=social&label=Fork&style=for-the-badge)](https://github.com/halower/vue-tree/network)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

`
The document is poorly written and you are welcome to refine your documentation in the process of using it to better help others.
`
# Version: 2.x  ([中文文档](https://github.com/halower/vue2-tree/blob/master/README_CN.md))
```QQ Group: 255965810``` <br/>
`we guess you may also see` [version 1.0](https://github.com/halower/vue2-tree/tree/1.x)
# Online Demo
[https://halower.github.io/vue-tree](http://120.77.84.4/)

# SelectTree API (2018-4-15)
 The latest release has the ability to support the dropdown tree, extending the following with the same basic attributes and events (consistent with the [Tree API](https://github.com/halower/vue-tree#tree-api-doc)) 
 
| Parameters | Description | Type | Optional value |Default value |
|---------- |-------- |---------- |---------- |---------- |
|searchable | Search Functionality Required | Boolean | Y |true |
|pleasechoosetext | Dropdown box default prompts this article | String | Y |Please choose ... |
|searchtext | Search box default prompts this article | String | Y |Search ... | 
|searchfilter | Custom search pull down tree filter function | Function | Y |Node => mode.title.indexOf (This.searchworld) > 1 | 
 ## Effect Chart (no demo here, other effects like Onlinedemo)
![](https://github.com/halower/vue-tree/blob/master/screenshots/selectTree.png)
### How to use
Please read the [Tree API](https://github.com/halower/vue-tree#tree-api-doc) documentation before using the selectTree
```
import { VTree, VSelectTree } from 'vue-tree-halower'
Vue.use (VTree)
Vue.use (VSelectTree)
 -------------------
<v-select-tree :data='treeData' v-model="['node-1-2']"/>
 ```
# Tree API Doc
### Node Property
| Parameters | Description | Type | Optional values | Default value |
|---------- |-------- |---------- |---------- |---------- |
|id | when this property is empty, the title property will be used as the key | String | Y | -|
|title | node name | String | N | -|
|children | child nodes | Array[object] | Y | -|
|async | whether to load child nodes asynchronously | Boolean | Y | false |
|expanded | node Expansion | Boolean | Y | false |
|halfcheck | whether the node is half optional (subordinate selected) | Boolean | Y | false |
|visible | is the node visible | Boolean | Y | true |
|selected | whether the node is selected | Boolean | Y | false |
|checked | whether the node check box is selected | Boolean | Y | false |
|nocheck | specifies that a node does not render check box when multiple checkboxes are open | Boolean | Y | false |
|loading | open load effect | Boolean | Y | false |
|chkDisabled | disable the function of a check box for a node | Boolean | Y | false |
|hasExpanded | node has expanded| Boolean | Y | false |
|parent | get parent node(when `allowGetParentNode=true`,the node will add `parent`method)) | Function | - | undefined |
|selDisabled | disable the select function of a node| Boolean | Y | false |

### Tree Property
| Parameters | Description | Type | Optional values | default value |
|---------- |-------- |---------- |---------- |---------- |
|data | tree Data Source | Array[object] | N | -|
|multiple | turn on Check mode | Boolean | Y | false |
|tpl | custom templates | JSX | Y | false |
|halfcheck | turn on semi-select mode | Boolean | Y | select all |
|scoped | quarantine node Selected state | Boolean | Y | false |
|draggable | support drag? | Boolean | Y | false |
|dragafterexpanded | ro expand after dragging | Boolean | Y | true |
|canDeleteRoot |  can delete the root node  | Boolean | Y | false |
|maxLevel |  node max level | Number | Y | 1024 |
|topMustExpand |  the top level must can expand | Boolean | Y | true |
|allowGetParentNode |  allow get the parent node | Boolean | Y | false |
|radio | the selected node only one | Boolean | Y | false |
|selectAlone | select is alone | Boolean | Y | false |

### method
| Method name | Description | Parameters |
|---------- |-------- |---------- |
| getSelectedNodes | returns an array of currently selected nodes,isOriginal:false, | isOriginal: Boolean, ignoreInvisibleNode: Boolean |
| getCheckedNodes | returns the array of nodes selected by the current check box | isOriginal: Boolean,ignoreInvisibleNode: Boolean |
| getNodes |the options objects such as {selected:true}, if empty, use {} | options: Object,data: Array, isOriginal: Boolean, ignoreInvisibleNode: Boolean|
| searchNodes | filter:function/string (if it is a function, it will eventually return a Boolean type) |node|
| nodeSelected | to select a node |node: Object|
| addNode | add a node |parentNode: Object, node: Object|
| addNodes | add some nodes |parentNode: Object, nodes: Array|

### events
| Event name | Description | Parameters |
|---------- |-------- |---------- |
| node-click | click the node to trigger the event | node: Object |
| node-select  | click the select to trigger the event | node: Object, selected: boolean, position: {level, index}|
| node-check | click the checkbox to trigger the event | node: Object, checked: boolean, position: {level, index} |
| node-mouse-over | over the node to trigger the event | node: Object, index: Number, parentNode: node, position: {level, index} |
| async-load-nodes | event used to implement asynchronous loading | node: Object |
| drag-node-end | drag node end trigger the event | {dragNode: Object, targetNode: Object} |
| del-node | after delete a node | { parentNode: Object || null, delNode: Object } |
| node-expand  | click the expand to trigger the event | node: Object, expand: boolean, position: {level, index}|

### How to use

Step1: install plugins  (Vue Cli3 not necessary, Demo based on VueCli3)
```
npm install babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props babel-preset-env --save-dev

npm install vue-tree-halower  --save
```
Step2: In your .babelrc (Vue Cli3 not necessary,Demo based on VueCli3)
```
{
  "presets": ["env"],
  "plugins": ["transform-vue-jsx"]
}
```
Step3： In your main.js
```
import 'vue-tree-halower/dist/halower-tree.min.css' // you can customize the style of the tree
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
  name: 'HelloWorld',
  data () {
    return {
      searchword: '',
      initSelected: ['node-1'],
      treeData1: [{
        title: 'node1',
        expanded: true,
        children: [{
          title: 'node 1-1',
          expanded: true,
          children: [{
            title: 'node 1-1-1'
          }, {
            title: 'node 1-1-2'
          }, {
            title: 'node 1-1-3'
          }]
        }, {
          title: 'node 1-2',
          children: [{
            title: "<span style='color: red'>node 1-2-1</span>"
          }, {
            title: "<span style='color: red'>node 1-2-2</span>"
          }]
        }]
      }],
      treeData2: [{
        title: 'node1',
        expanded: false,
        async: true
      }],

      treeData3: [{
        title: 'node1',
        expanded: true,
        children: [{
          title: 'node 1-1',
          expanded: true,
          children: [{
            title: 'node 1-1-1'
          }, {
            title: 'node 1-1-2'
          }, {
            title: 'node 1-1-3'
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
</script>
```
### 如果你觉得这个项目帮助到了你，你可以帮作者买一杯果汁表示鼓励
<img src="https://github.com/halower/vue2-tree/blob/master/src/assets/hello.png" width=256 height=256 />
