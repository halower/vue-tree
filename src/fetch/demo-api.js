import BaseApiController from '@/config/baseapi'

/**
 * @class 演示业务功能
 */
class DemoApiController extends BaseApiController {
    /*
    * @method 这里我们只做演示
    */
  async getChild () {
    // 假设这里有很复杂的前端逻辑
    let data = await this.get(this.demo.test)
    return data
  }
}
export default new DemoApiController()
