## 配置相关文件夹说明

### `req.conf.js`
- 功能:
> 集中管理各个业务模块的后端请求地址,便于排错和集中管理
- 用法：
>  每个模块都导出一个本模块的地址对象即可
 ```
  export const demo(模块名称) = {
    test: '/api/test' //只需要写相对路径路径
  }
 ```

### `service.conf.js`
- 功能: 按照项目的需求初始化一些服务的配置参数,例如请求`http://127.0.0.1/api/test`,则根路径(`baseUrl`)为`http://127.0.0.1`,这样在`req.conf.js`只需要写相对路径，其中```baseUrl```为必须参数
> 

### `apistore.js`
- 功能:
>   作为所有业务请求的入口,将所有的http相关的处理从页面组件中剥离,在服务模块中集中处理完复杂逻辑等操作，减少页面臃肿程度.
- 页面调用方法：(我们将所有的服务模块全部包装到this.$api中,以便识别服务)
``` 
 this.$api.user.adduser({name:'halower'}) 
 ```
- 依赖文件:
>  `req.conf.js`、 `fetch(文件夹)`

### `baseapi.js`
- 功能:
> 作为所有服务对象的基类,包含了请求地址代理,统一的请求入口(`get,post` ect.)

### `routestore.js`
- 功能:
> 集中的路由管理中心,将各个业务模块中的路由统一整理合并
- 用法：
1. 导入每个业务模块的路由单元 
```
import demo from '@/pages/demo/z-routes
```
2.  添加业务路由
```
routes = routes.concat(demo)
```
