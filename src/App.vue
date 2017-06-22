<template>
  <div id="app" style="width:300px;">
    <tree ref ='tree' :treeData="treeData" :options="options"/>
  </div>
</template>
<script>
import Tree from './components/tree/tree.vue'
let that = null
export default {
  name: 'app',
  data () {
    that = this
    return {
      options: {
        showCheckbox: true,
        halfCheckedStatus: true,//控制父框是否需要半钩状态
        search: {
          useInitial: true,
          useEnglish: false,
          customFilter: null
        }
      },
      treeData: []
    }
  },
  mounted: function(resolve){
    this.loadTreeData(resolve);
  },
  methods: {
    loadTreeData: function(resolve) {
      return new Promise((resolve) => {
        setTimeout(() => {
            that.treeData = [
        {
          id: 1,
          label: '一级节点',
          open: true,
          checked: false,
          nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
          parentId: null,
          visible: true,
          searched: false,
          children: [
            {
              id: 2,
              label: '二级节点-1',
              checked: false,
              nodeSelectNotAll: false,
              parentId: 1,
              searched: false,
              visible: true
            },
            {
              label: '二级节点-2',
              open: true,
              checked: false,
              nodeSelectNotAll: false,
              id: 3,
              parentId: 1,
              visible: true,
              searched: false,
              children: [
                {
                  id: 4,
                  parentId: 3,
                  label: '三级节点-1',
                  visible: true,
                  searched: false,
                  checked: false,
                  nodeSelectNotAll: false
                },
                {
                  id: 5,
                  label: '三级节点-2',
                  parentId: 3,
                  searched: false,
                  visible: true,
                  checked: false,
                  nodeSelectNotAll: false
                }
              ]
            },
            {
              label: '二级节点-3',
              open: true,
              checked: false,
              nodeSelectNotAll: false,
              id: 6,
              parentId: 1,
              visible: true,
              searched: false,
              children: [
                {
                  id: 7,
                  parentId: 6,
                  label: '三级节点-4',
                  checked: false,
                  nodeSelectNotAll: false,
                  searched: false,
                  visible: true
                },
                {
                  id: 8,
                  label: '三级节点-5',
                  parentId: 6,
                  checked: false,
                  nodeSelectNotAll: false,
                  searched: false,
                  visible: true
                }
              ]
            }
          ]
        }
      ]
              resolve(that.treeData)
          }, 100)
      })
    }
  },
  components: {
    Tree
  }
}
</script>
