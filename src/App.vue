<template>
    <div>
        <h1>
            coming soon, new tree
        </h1>
        <app-tree :model="treeData"></app-tree>
    </div>
</template>
<script>
var data = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        }
      ]
    }
  ]
}
import AppTree from '@/components/tree'
export default {
    name: "app",
    components: { AppTree },
    data() {
      return {
        treeData: data
      }
    }
}
</script>

