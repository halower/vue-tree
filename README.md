# vue2-tree

first of all, i highly recommended to see the demo 

and u will find out how to use this plugin

i must say, this doc is terrible, but the function is really good

## features

* normal tree

* lazy loading 

* loading tip

* dynamic add node 

* custom tree icon, use [iconFont](http://iconfont.cn/)

* custom icon style. color

* ie9,10,11,spartan

__issues__

* checkbox status fix later

    showCheckbox: true,  
    halfCheckedStatus: true


notice: 

  loadingChild method
  
  import { ZTree, ComboZTree, generateKey, getParentNode } from 'vue2-lazy-tree'
  
  import ZTree from 'vue2-lazy-tree'
  

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification  publish to npm
npm run build
```

-----


=======
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
        labelKey: '',           { String } set the label field, default 'label'
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
        iconStyle: {                        // custom icon style, sometimes u just need to set color
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
        // return Promise(parent.children) must bu children Array
        dynamicAddNode: [Function],
        // function handle save node; when successfull saved, the new node must del `dynamicAdd` property
        // the tree component rely on this save node
        // param { node, $event }
        // return Promise(node) must be node Object return from server
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
      id: 1,                    // 节点标志
      label: '一级节点',         // 节点名称
      open: true,               // 是否打开节点
      checked: false,           // 是否被选中
      parentId: null,           // 父级节点Id
      visible: true,            // 是否可见
      searched: false,          // 是否是搜索值,
      nodeSelectNotAll: false,  // 表示父框可以半钩状态
      leaf: true,               // 是否是叶子节点， 如果是叶子结点， lazy=true 时，显示 leafIcon， 此节点不再异步加载数据
      children: []              // 子节点,

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

### iconfont

u can use build in iconfont class or u add it by u self [iconFont](http://iconfont.cn/)

how to find the build in class:

    // just go to the package folder, under node_modules/vue2-lazy-tree/
    src/components/tree/assets/iconfont/demo_fontclass.html
    

