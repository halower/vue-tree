# vue2-lazy-tree

first of all, i highly recommended to see the demo 

and u will find out how to use this plugin

i must say, this doc is terrible, but the function is really good

## features

* normal tree

* lazy loading 

* loading tip

* dynamic add node 

* custom tree icon, use [iconfont](http://iconfont.cn/)

* custom icon style. color

* ie9,10,11,spartan

notice: 

  generateKey && loadingChild method


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification  publish to npm
npm run build


-----

### How to install the plugin

      npm install vue2-lazy-tree or cnpm install vue2-lazy-tree (国内)

### How to use in u production

    import { ZTree } from 'vue2-lazy-tree'
    import './../dist/vue2-tree.min.css'
    Vue.use(ZTree)
    
### Demo
    
    npm install & npm run dev
        
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
        
        iconClass: {                        // custom icon class, Default
            close: 'icon-youjiantou',
            open: 'icon-xiajiantou',
            add: 'icon-add'
        },
        iconStyle: {                        // custom icon style, sometimes u just need to set colr
            color: '#108ee9'                // default #000
        },
        
        dynamicAdd: true,
        // function  handle display add button
        // return true or false, default true
        // [Function] param: { node } 
        dynamicAddFilter: (node) => {
            if (node.type === 1 || node.type === 2) {
                return true
            }
            return false
        },
        // function handle add node; the new node must have `dynamicAdd : true` property
        // the tree component rely on this show editor
        // param { node }
        // return Promise
        dynamicAddNode: [Function],
        // function handle save node; when successfull saved, the new node must del `dynamicAdd` property
        // the tree component rely on this save node
        // param { node, $event }
        // return Promise
        dynamicSaveNode: [Function],
        // function handle leaf icon
        // param { node }
        // return { String } , iconfont class name, default ''
        leafIcon: [Function],
        
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


----

package is copy from [https://github.com/halower/vue2-tree](https://github.com/halower/vue2-tree)

and when some new feature is test ok, i will pull a new request to halower 

### QQ group:255965810

## Update History

* Add how to use it in the production env       25072017
