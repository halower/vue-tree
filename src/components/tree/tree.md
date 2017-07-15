::: demo
```html
<template>
    <div id="app" style="width:300px; margin: auto auto;">
        <tree
                ref='tree'
                :treeData="treeData"
                :options="options"
                @node-click="itemClick"

        />
    </div>
</template>
<script>
    import Vue from 'vue';
    import axios from 'axios';
    import Tree from './components/tree/tree.vue';
    let that = null
    export default {
        name: 'app',
        data () {
            that = this;
            return {
                options: {
                    showCheckbox: false,
                    halfCheckedStatus: false,//控制父框是否需要半钩状态

                    lazy: true,
                    load: this.loadingChild,

                    showSearch: false,
                    search: {
                        useInitial: true,
                        useEnglish: false,
                        customFilter: null
                    }
                },
                treeData: []
            }
        },
        mounted: function () {
            this.loadTreeData();
        },
        methods: {
            /**
             * generate key 0-1-2-3
             * this is very important function for now module
             * @param treeData
             * @param parentKey
             * @returns {Array}
             */
            generateKey (treeData = [], parentKey) {
                treeData = treeData.map((item, i) => {
                    item.key = parentKey + '-' + i.toString();
                    return item;
                })
                return treeData;
            },
            loadTreeData: function () {
                let treeData = [
                    {
                        id: 1,
                        label: '一级节点',
                        open: false,
                        checked: false,
                        nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
                        parentId: null,
                        visible: true,
                        searched: false
                    },
                    {
                        id: 2,
                        label: '一级节点',
                        open: false,
                        checked: false,
                        nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
                        parentId: null,
                        visible: true,
                        searched: false
                    }
                ];

                this.treeData = this.generateKey(treeData, 0);
            },
            async loadingChild (node, index) {
                try {
                    let tem;
                    let postions = node.key.split('-');
                    // load json file you need another server
                    let data = await axios.get(' http://172.16.0.104:8082/child.json');

                    for (let [index, item] of postions.entries()) {
                        switch (index) {
                            case 0:
                                break;
                            case 1:
                                tem = this.treeData[item];
                                break;
                            default:
                                tem = tem.children[item];
                        }
                    }
                    // set Children
                    Vue.set(tem, 'children', this.generateKey(data.data, node.key) );

                    Promise.resolve(data);
                } catch (e) {
                    Promise.reject(e);
                }
            },
            itemClick (node) {
                console.log(node.key);
            }
        },
        components: {
            Tree
        }
    }
</script>
```
### props
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| options | 树数据 | Object | — | — |
| treeData | 指定节点对象数组 | Array[Object] | — | — |

```
     options: {
        showCheckbox: true,  //是否支持多选
        
        lazy: true,     // 是否是异步加载数据
        load: this.loadingChild, // 异步加载数据方法
        showSearch: false, // 是否显示搜索
        
        search: {
          useInitial: true, //是否支持首字母搜索
          useEnglish: false, //是否是因为搜索
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
      searched: false, //是否是搜索值
      children: [] //子节点
    }
```
### 方法
`Tree` 拥有如下方法，返回目前被选中的节点数组：
| 方法名 | 说明 | 参数 |
|------|--------|------|
| getSelectedNodeIds | 若节点可被选择（即 `multiple` 为 `true`），<br>则返回目前被选中的节点Id所组成的数组 | — |
| getSelectedNodes | 若节点可被选择（即 `multiple` 为 `true`），<br>则返回目前被选中的节点所组成的数组 | — |


### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| node-click  | 节点被点击时的回调 | 共1个参数，节点组件本身。 |

