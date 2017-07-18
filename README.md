# vue2-tree

# README
这是功能定制版本， 异步加载数据

loading 提示

注意适用方式
generateKey and loadingChild 方法


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


-----
### 贡献者名单

 - lily7129
 - ddtramp
 
### develop logs
- 2017-5-2: 支持下拉树, add combotree
- 2017-5-26: 添加父节点半选状态框 
- 2017-6-08: 修复火狐复选事件的bug 
- 2017-6-21: 修复动态渲染
- 2017-7-15 : 支持异步加载数据，修复IE9-11的bug
### QQ交流群:255965810
### How to install the plugin
```
 npm install vue2-tree or cnpm install vue2-tree (国内)
```
### How to run demo
```
npm install
npm run dev 
```
### 在线Demo
 [点击进入线上效果](https://halower.github.io/vue2-tree/)
### 效果图
 ![效果图](http://files.cnblogs.com/files/rohelm/jdfw.gif)
### 示例
```html
<template>
    <div id="app" style="width:300px; margin: auto auto;">
        <ZTree
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
    import { ZTree } from './../dist/vue2-tree.min'
    import './../dist/vue2-tree.min.css'

    Vue.use(ZTree)
    

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
        showCheckbox: true,  //是否支持多选,
        halfCheckedStatus: true,//控制父框是否需要半钩状态,
        
        lazy: true,     // 是否是异步加载数据
        load: this.loadingChild, // 异步加载数据方法
        showSearch: false, // 是否显示搜索
        
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

