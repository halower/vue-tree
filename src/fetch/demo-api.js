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
    return this.get(this.demo.test, {}).then(res => {
      return res.data
    })
  }
}
export default new DemoApiController()
