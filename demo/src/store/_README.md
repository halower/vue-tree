## 状态相关管理文件夹 (store)
- 功能
> 统一管理项目状态,在复杂的交互项目中可以启用该模块，可以减少事件的不便性

- 使用方法
> 
1. `mutation-types.js` 在这里进行mutation命名的统一管理
```
 export const CHANGE_NAME = 'CHANGE_NAME' // 测试更改模块名称
```
在各个模块中可以使用如下方式引用，使用 ` [types.CHANGE_NAME]` 方式获取

```
import * as types from '@/store/mutation-types' 
```

2. 在`modules`文件夹中编写对应的模块，可以引用`fetch`文件夹中的服务在actions中处理业务
3. 写完模块状态管理后，在`index.js`中引入相应模块
```
 modules: {
    test
  }
```
4. 页面使用
```
<template>
 <div>
    <h2>当前模块：demo2</h2>
    <h1></h1>
    <button @click="changeName('测试')">改变模块名称</button>
 </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapGetters } = createNamespacedHelpers("test");

export default {
  name: "HelloWorld",
  computed: {
    ...mapState(['name']),
    ...mapGetters(['greet'])
  },
  methods: {
    ...mapActions(['changeName'])
  }
};
</script>
```
5. 说明
 - 模块中需要使用 `namespaced: true` 标记
 - 根节点状态可以直接在 `index.js` 编写
 - 能不用this.$store 最好不要使用，保持页面整洁

6. `eventbus.js` 主要用于简单的非父子组件交互通信使用
> 使用方法
```
this.$eventbus.on(event: string | Array<string>, fn: Function)
this.$eventbus.emit(event: string, data: Object)
```