import Vue from 'vue'
const bus = new Vue()

const eventbus = {
  on (event, fn, once = false) {
    if (once) {
      bus.$once(event, fn)
      return false
    }
    bus.$on(event, fn)
  },
  emit (event, data) {
    bus.$emit(event, data)
  }
}

export default eventbus
