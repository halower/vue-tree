# vue2-lazy-tree

# README

lazy loading tree data

loading tip

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
package is copy from [https://github.com/halower/vue2-tree](https://github.com/halower/vue2-tree)

and when some new feature is test ok, i will pull a new request to halower 

### QQ group:255965810

### How to install the plugin

      npm install vue2-lazy-tree or cnpm install vue2-lazy-tree (国内)

### Demo
    
    you need to run 
    
    npm install & npm run dev
    
and with the http serve at /data 
     
     cd data/
     http-server -p 8082 --cors
    
 
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

