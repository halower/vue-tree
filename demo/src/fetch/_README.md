## 业务服务相关文件夹说明 (directives)
- 功能
> 将繁琐的数据处理和关联性的逻辑操作从页面中剥离,降低服务与页面的耦合
- 用法
1. 引入服务基类并继承它
2. 方法中的url路径需要使用到`/config/req.conf.js` 的模块,由于已经使用代理处理过，因此只需要使用`this.业务模块名.请求地址`的模式即可以获取真实请求路径
```
import BaseApiController from '@/config/baseapi'

/**
 * @class 演示业务功能
 */
class DemoApiController extends BaseApiController {
    /*
    * @method 这里我们只做演示
    */
    test () {
       // 假设这里有很复杂的前端逻辑
      return this.get([this.demo.test], {}).then(res => {
       return res.data
     })
    } 
 }
export default new DemoApiController()
```
- 依赖文件:
>  `req.conf.js`