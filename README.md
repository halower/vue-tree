### develop logs
- 2017-5-2: 支持下拉树, add combotree
- 2017-5-26: 添加父节点半选状态框 by  lily7129 
### QQ交流群:255965810

### How to run demo
```
npm install
npm run dev
```
### 效果图
 ![效果图](http://files.cnblogs.com/files/rohelm/jdfw.gif)
### 示例
```html
<template>
  <div style="width:300px;">
    <tree ref ='tree' :treeData="treeData" :options="options" @node-click='handleNode'/>
  </div>
</template>
<script>
import Tree from '../components/tree/tree.vue'
export default {
  name: 'test',
  data () {
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
      treeData: [
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
    }
  },
  components: {
    Tree
  }
}
</script>
```
### 属性
| 参数      | 说明    | 类型      | 可选值 | 默认值  |
|---------- |-------- |---------- |---------- |---------- |
|options     | 配置项 | Object | — | — |
| treeData | 指定节点对象数组 | Array[Object] | — | — |

```
     options: {
        showCheckbox: true,  //是否支持多选
        search: {
          useInitial: true, //是否支持拼音首字母搜索
          useEnglish: false, //是否是英文搜索
          customFilter: null // 自定义节点过滤函数
        }

    /* 节点元素 */
    {
      id: 1, //节点标志
      label: '一级节点', //节点名称
      open: true, // 是否打开节点
      checked: false, //是否被选中
      parentId: null, //父级节点Id
      visible: true, //是否可见
      searched: false, //是否是搜索值,
      nodeSelectNotAll: false,//表示父框可以半钩状态
      children: [] //子节点
    }
```
### 方法
| 方法名      | 说明    | 参数      |
|---------- |-------- |---------- |
| getSelectedNodeIds  | 若节点可被选择则返回目前被选中的节点Id所组成的数组 | 被选中的节点Id所组成的数组 |
| getSelectedNodes  | 若节点可被选择则返回目前被选中的节点组成的数组 | 被选中的节点所组成的数组 |

### 事件
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| node-click  | 节点被点击时的回调 | 共1个参数，节点组件本身。 |

