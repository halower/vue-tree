[![npm](https://img.shields.io/npm/v/vue-tree-halower.svg )](https://www.npmjs.com/package/vue-tree-halower)
[![npm](https://img.shields.io/npm/dw/vue-tree-halower.svg)](https://www.npmjs.com/package/vue-tree-halower)
[![GitHub stars](https://img.shields.io/github/stars/halower/vue-tree.svg?style=social&label=Stars&style=for-the-badge)](https://github.com/halower/vue-tree/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/halower/vue-tree.svg?style=social&label=Fork&style=for-the-badge)](https://github.com/halower/vue-tree/network)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

# Version: 2.x  ([English Document](https://github.com/halower/vue2-tree/blob/master/README.md))
```QQ Group: 255965810``` <br/>
`如果看老版本请点击这里` [version 1.0](https://github.com/halower/vue2-tree/tree/1.x)
## API 文档

###  Node 属性
| 参数      | 说明    | 类型      | 可选值 | 默认值  |
|---------- |-------- |---------- |---------- |---------- |
|title     | 节点名称 | String | N | — |
|expanded |  节点是否展开 | Boolean | Y | false |
|checked |  节点复选框是否选中 | Boolean | Y | false |
|halfcheck |  节点是否为半选（下级被选中） | Boolean | Y | false |
|visible |  节点是否可见 | Boolean | Y | false |
|selected |  节点是否被选中 | Boolean | Y | false |
|children |  子节点 | Array[Object] | Y | — |
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

### 方法
| 方法名      | 说明    | 参数      |
|---------- |-------- |---------- |
| getSelectedNodes  | 返回目前被选中的节点所组成的数组 | - |
| getCheckedNodes  |返回目前复选框选中的节点组成的数组 | - |
| getNodes | options: 可以包含一些过滤属性对象如{selected: true}，如果为空，请使用 {} |options|
| searchNodes | filter:function/string (如果是函数则最终会返回一个boolean类型) |node: 每个节点对象|

### 事件
| 事件名      | 说明    | 参数      |
|---------- |-------- |---------- |
| node-click  | 单击节点触发的事件 | node: 当前节点 |

### 如何使用

Step1: install plugins
```
npm install\
  babel-plugin-syntax-jsx\
  babel-plugin-transform-vue-jsx\
  babel-helper-vue-jsx-merge-props\
  babel-preset-env\
  --save-dev

npm install vue-tree-halower  --save
```
Step2： In your main.js
```
import 'vue-tree-halower/dist/halower-tree.min.css' // 你可以自定义树的样式
import VTree from 'vue-tree-halower '

Vue.use(VTree)
```
Step3: In your .babelrc
```
{
  "presets": ["env"],
  "plugins": ["transform-vue-jsx"]
}
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
      this.$refs.tree.addNodes(node, await this.$api.demo.getChild())
    },
    search () {
      this.$refs.tree.searchNodes(this.searchword)
    }
  }
}
```
### 如果你觉得这个项目帮助到了你，你可以帮作者买一杯果汁表示鼓励
<img src="https://github.com/halower/vue2-tree/blob/master/src/assets/hello.png" width=256 height=256 />
