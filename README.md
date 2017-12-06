# Version: 2.0  ([中文文档](https://github.com/halower/vue2-tree/blob/master/README_CN.md))
```QQ Group: 255965810``` <br/>
`we guess you may also see` [version 1.0](https://github.com/halower/vue2-tree/tree/1.x) 
### Node Property
| Parameters | Description | Type | Optional values | Default value |
|---------- |-------- |---------- |---------- |---------- |
|title | node name | String | N | -
|expanded | node Expansion | Boolean | Y | false |
|checked | whether the node check box is selected | Boolean | Y | false |
|halfcheck | whether the node is half optional (subordinate selected) | Boolean | Y | false |
|visible | is the node visible | Boolean | Y | false |
|selected | whether the node is selected | Boolean | Y | false |
|children | child nodes | Array[object] | Y | -

### Tree Property
| Parameters | Description | Type | Optional values | default value |
|---------- |-------- |---------- |---------- |---------- |
|data | tree Data Source | Array[object] | N | -
|multiple | turn on Check mode | Boolean | Y | false |
|tpl | custom templates | JSX | Y | false |
|halfcheck | turn on semi-select mode | Boolean | Y | select all |
|scoped | quarantine node Selected state | Boolean | Y | false |
|draggable | support drag? | Boolean | Y | false |
|dragafterexpanded | ro expand after dragging | Boolean | Y | true |

### method
| Method name | Description | Parameters |
|---------- |-------- |---------- |
| getSelectedNodes | returns an array of currently selected nodes | - |
| getCheckedNodes | returns the array of nodes selected by the current check box | - |
| getNodes |the options objects such as {selected:true}, if empty, use {} | options|
| searchNodes | filter:function/string (If it is a function, it will eventually return a Boolean type) |node: every node object|

### events
| Event name | Description | Parameters |
|---------- |-------- |---------- |
| node-click | click the node to trigger the event | node: current Node |

### How to use

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
import 'vue-tree-halower/dist/halower-tree.min.css' // you can customize the style of the tree
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
      searchword: '',
      treeData: [{
        title: 'First-level nodes',
        expanded: true,
        children: [{
          title: 'Level Two Node 1',
          expanded: true,
          children: [{
            title: 'Level Three node 1-1'
          }, {
            title: 'Level Three node 1-1'
          }, {
            title: 'Level Three node 1-1'
          }]
        }, {
          title: 'Level Two Node 2',
          children: [{
            title: "<span style='color: red'>Level Three node 2-1</span>"
          }, {
            title: "<span style='color: red'>Level Three node 2-2</span>"
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
        <button style='color:blue; background-color:pink' onClick={() => this.$refs.tree.addNode(node, {title: 'Synchronous loading'})}>+</button>
      <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => {
        ctx.parent.nodeSelected(ctx.props.node)
        console.log(ctx.parent.getSelectedNodes())
      }}></span>
      <button style='color:green; background-color:pink' onClick={() => this.asyncLoad(node)}>Asynchronous loading</button>
      <button style='color:red; background-color:pink' onClick={() => this.$refs.tree.delNode(node.parent, node)}>Delete</button>
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
