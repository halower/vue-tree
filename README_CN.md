[![npm](https://img.shields.io/npm/v/vue-tree-halower.svg )](https://www.npmjs.com/package/vue-tree-halower)
[![npm](https://img.shields.io/npm/dm/vue-tree-halower.svg)](https://www.npmjs.com/package/vue-tree-halower)
[![GitHub stars](https://img.shields.io/github/stars/halower/vue-tree.svg?style=social&label=Stars&style=for-the-badge)](https://github.com/halower/vue-tree/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/halower/vue-tree.svg?style=social&label=Fork&style=for-the-badge)](https://github.com/halower/vue-tree/network)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

`文档写得很简单，欢迎大家在使用的过程中完善文档，以更好的为其它人提供帮助。`
# Version: 2.x  ([English Document](https://github.com/halower/vue2-tree/blob/master/README.md))
```QQ Group: 255965810``` <br/>
`如果看老版本请点击这里` [version 1.0](https://github.com/halower/vue2-tree/tree/1.x)
# Online Demo
[https://halower.github.io/vue-tree](http://120.77.84.4/)


## Last Version Update Log
1. 修复上一个版本（1.5.3）造成的单选模式下某些节点不能选中的bug
2. 完善domo 示例
### (Version 1.5.3)
1. 新增 ```canDeleteRoot```选项，用以支持是否可以删除根节点
2. 修复一级节点的```async```无效的bug
### (Version 1.5.2)
添加了一个 ```node-check``` 事件, 并移除了原有的```nodeChecked``` 事件，因为```nodeChecked``` 可能存在冒泡出发效果

# SelectTree API （2018-4-15 ）
最新的发布版本已经支持下拉树功能, 在基本属性和事件(与 [Tree API](https://github.com/halower/vue-tree/blob/master/README_CN.md#tree-api-%E6%96%87%E6%A1%A3)一致)不变的前提下扩展了如下 

| 参数      | 说明    | 类型      | 可选值 | 默认值  |
|---------- |-------- |---------- |---------- |---------- |
|searchable     | 是否需要搜索功能 | Boolean | Y | true |
|pleasechoosetext     | 下拉框默认提示本文 | String | Y | please choose... |
|serchtext     | 搜索框框默认提示本文 | String | Y | search... |
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

### 方法
| 方法名      | 说明    | 参数      |
|---------- |-------- |---------- |
| getSelectedNodes  | 返回目前被选中的节点所组成的数组 | - |
| getCheckedNodes  |返回目前复选框选中的节点组成的数组 | - |
| getNodes | options: 可以包含一些过滤属性对象如{selected: true}，如果为空，请使用 {} |options|
| searchNodes | filter:function/string (如果是函数则最终会返回一个boolean类型) |node: Object|

### 事件
| 事件名      | 说明    | 参数      |
|---------- |-------- |---------- |
| node-click  | 单击节点触发的事件 | node: Object |
| node-check | click the checkbox to trigger the event | node: Object, checked: boolean |
| node-mouse-over | 鼠标滑过节点触发事件 | node: Object |
| async-load-nodes | 用于实现异步加载 | node: Object |
| drag-node-end | 节点拖拽结束后触发事件 | {dragNode: Object, targetNode: Object} |

### 如何使用

Step1: install plugins
```
npm install babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props babel-preset-env --save-dev

npm install vue-tree-halower  --save
```
```
Step2: In your .babelrc
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
  <v-tree ref='tree' :data='treeData' :multiple='true' :tpl='tpl' :halfcheck='true'/>
     <input type="text" v-model="searchword" />
    <button type="button" @click="search">GO</button>
```
`JS`
```
export default {
  name: 'HelloWorld',
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
    tpl (node, ctx) {
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      if (node.searched) titleClass += ' node-searched'
      return <span>
        <button style='color:blue; background-color:pink' onClick={() => this.$refs.tree.addNode(node, {title: '同步节点'})}>+</button>
      <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => {
        ctx.parent.nodeSelected(ctx.props.node)
        console.log(ctx.parent.getSelectedNodes())
      }}></span>
      <button style='color:green; background-color:pink' onClick={() => this.asyncLoad(node)}>异步加载</button>
      <button style='color:red; background-color:pink' onClick={() => this.$refs.tree.delNode(node.parent, node)}>删除</button>
      </span>
    },
    async asyncLoad (node) {
      // method1:
      // this.$refs.tree.addNodes(node, await this.$api.demo.getChild()
      // method2:
      this.$set(node, 'loading', true)
      let data = await this.$api.demo.getChild())
      this.$set(node, 'children', data)
      this.$set(node, 'loading', false)
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
