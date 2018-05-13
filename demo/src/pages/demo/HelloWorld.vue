<template>
 <div>
    <div style="text-align: left"><h1>Custom template</h1></div>
      <div style="text-align: left">
      <input type="text" v-model="searchword" placeholder="searchword"/>
    <button type="button" @click="search">search node</button>
    </div>
    <v-tree ref='tree1' :canDeleteRoot="true" :data='treeData1' :draggable='true' :tpl='tpl' :halfcheck='true'/>
   <div style="text-align: left"> <h1>Default</h1></div>
    <v-tree ref="tree2" :data='treeData2' :multiple='false' @node-check='nodechekced' @async-load-nodes='asyncLoad2'/>
 </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      searchword: '',
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
      }]
    }
  },
  methods: {
    nodechekced (node, v) {
      alert('that a node-check envent ...' + node.title + v)
    },
    tpl (node, ctx) {
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      if (node.searched) titleClass += ' node-searched'
      return <span>
        <button style='color:blue; background-color:pink' onClick={() => this.$refs.tree1.addNode(node, {title: 'sync loading'})}>+</button>
      <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => {
        ctx.parent.nodeClick(ctx.props.node)
        console.log(ctx.parent.getSelectedNodes())
      }}></span>
      <button style='color:green; background-color:pink' onClick={() => this.asyncLoad1(node)}>async loading</button>
      <button style='color:red; background-color:pink' onClick={() => this.$refs.tree1.delNode(node.parent, node)}>delete</button>
      </span>
    },
    async asyncLoad1 (node) {
      this.$set(node, 'loading', true)
      let pro = new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, ['async node1', 'async node2'])
      })
      this.$refs.tree1.addNodes(node, await pro)
      this.$set(node, 'loading', false)
    },
    async asyncLoad2 (node) {
      this.$set(node, 'loading', true)
      let pro = await new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, [{title: 'test1', async: true}, {title: 'test2', async: true}, {title: 'test3'}])
      })

      pro.forEach((el) => {
        if (!node.hasOwnProperty('children')) {
          this.$set(node, 'children', [])
        }
        node.children.push(el)
      })
      this.$set(node, 'loading', false)
    },
    search () {
      this.$refs.tree1.searchNodes(this.searchword)
    }
  }
}
</script>