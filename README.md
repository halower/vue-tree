[![npm](https://img.shields.io/npm/v/vue-tree-halower.svg )](https://www.npmjs.com/package/vue-tree-halower)
[![npm](https://img.shields.io/npm/dm/vue-tree-halower.svg)](https://www.npmjs.com/package/vue-tree-halower)
[![GitHub stars](https://img.shields.io/github/stars/halower/vue-tree.svg?style=social&label=Stars&style=for-the-badge)](https://github.com/halower/vue-tree/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/halower/vue-tree.svg?style=social&label=Fork&style=for-the-badge)](https://github.com/halower/vue-tree/network)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

`
The document is poorly written and you are welcome to refine your documentation in the process of using it to better help others.
`
## last Version Update Log
1. fix bugs that are not selected by some nodes in the radio mode caused by the previous version (1.5.3) 
2. perfect Domo Example
### (Version 1.5.3)
1. Add  ```canDeleteRoot``` option to support the removal of root nodes
2. Fix the ```async``` Invalid bug of the first level node
### (Version 1.5.2)
add a ```node-check``` event, ande remove ```nodeChecked``` event， because the ```nodeChecked``` event may be bubbling
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
|serchtext | Search box default prompts this article | String | Y |Search ... | 
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
### method
| Method name | Description | Parameters |
|---------- |-------- |---------- |
| getSelectedNodes | returns an array of currently selected nodes | - |
| getCheckedNodes | returns the array of nodes selected by the current check box | - |
| getNodes |the options objects such as {selected:true}, if empty, use {} | options|
| searchNodes | filter:function/string (if it is a function, it will eventually return a Boolean type) |node|

### events
| Event name | Description | Parameters |
|---------- |-------- |---------- |
| node-click | click the node to trigger the event | node: Object |
| node-check | click the checkbox to trigger the event | node: Object, checked: boolean |
| node-mouse-over | over the node to trigger the event | node: Object |
| async-load-nodes | event used to implement asynchronous loading | node: Object |
| drag-node-end | drag node end trigger the event | {dragNode: Object, targetNode: Object} |
### How to use

Step1: install plugins
```
npm install babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props babel-preset-env --save-dev

npm install vue-tree-halower  --save
```
Step2: In your .babelrc
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
  <v-tree ref='tree' :data='treeData' :multiple='true' :tpl='tpl' :halfcheck='true'/>
     <input type="text" v-model="searchword" />
    <button type="button" @click="search">GO</button>
```
`JS`
```
export default {
  name: 'vue-tree',
   data () {
    return {
      searchword: '',
      treeData: [{
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
      }]
    }
  },
  methods: {
    tpl (node, ctx) {
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      if (node.searched) titleClass += ' node-searched'
      return <span>
        <button style='color:blue; background-color:pink' onClick={() => this.$refs.tree.addNode(node, {title: 'sync loading'})}>+</button>
      <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => {
        ctx.parent.nodeSelected(ctx.props.node)
        console.log(ctx.parent.getSelectedNodes())
      }}></span>
      <button style='color:green; background-color:pink' onClick={() => this.asyncLoad(node)}>async loading</button>
      <button style='color:red; background-color:pink' onClick={() => this.$refs.tree.delNode(node.parent, node)}>delete</button>
      </span>
    },
    async asyncLoad (node) {
      // method1:
      this.$refs.tree.addNodes(node, await this.$api.demo.getChild()
      // method2:
      // this.$set(node, 'loading', true)
      // let data = await this.$api.demo.getChild()
      // this.$set(node, 'children', data)
      // this.$set(node, 'loading', false)
      // method3: use concat
    },
    search () {
      this.$refs.tree.searchNodes(this.searchword)
    }
  }
}
```
### 如果你觉得这个项目帮助到了你，你可以帮作者买一杯果汁表示鼓励
<img src="https://github.com/halower/vue2-tree/blob/master/src/assets/hello.png" width=256 height=256 />
