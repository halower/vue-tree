<template>
 <div>
    <input type="text" v-model="searchword" placeholder="searchword"/>
    <button type="button" @click="search">手动搜索</button>
    <v-tree ref='tree' @node-click='nodeClick' :data='treeData' :draggable='true' :multiple='true' :tpl='tpl' :halfcheck='true'/>
 </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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
      this.$refs.tree.addNodes(node, await this.$api.demo.getChild())
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
</script>