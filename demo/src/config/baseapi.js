import axios from 'axios'
import projconf from '@/config/service.conf'
import * as request from '@/config/req.conf'

export default class BaseApiController {
  constructor () {
    axios.defaults.timeout = 5000
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    axios.defaults.baseURL = projconf.baseURL
    this._req = request
    Object.keys(this._req).forEach(key => this._proxy(key))
  }

  _proxy (key) {
    let _ = this
    Object.defineProperty(_, key, {
      configurable: false,
      enumerable: true,
      get () {
        return _._req[key]
      },
      set (newVal) {
        _.data[key] = newVal
      }
    })
  }

  get (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {params})
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  post (url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
