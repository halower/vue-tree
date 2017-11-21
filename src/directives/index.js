export default {
  install (Vue, options) {
    /**
     * @directive 图片未加载前显示随机背景
     */
    Vue.directive('img', {
      inserted: function (el, binding) {
        let color = Math.floor(Math.random() * 1000000)
        el.style.backgroundColor = '#' + color
        let img = new Image()
        img.src = binding.value
        img.onload = function () {
          let factSrc = binding.value
          el.style.backgroundImage = 'url(' + factSrc + ')'
        }
      }
    })

     /**
     * @directive 拖拽
     */
    Vue.directive('drag', {
      inserted: function (el, binding) {
        el.style.cursor = binding.value && binding.value.cursor ? binding.value.cursor : 'default'
        var moveEl = binding.value && binding.value.moveElId ? document.getElementById(binding.value.moveElId) : el
        moveEl.style.position = 'absolute'
        if (getComputedStyle(moveEl.parentNode, null).position === 'static') {
          moveEl.parentNode.style.position = 'relative'
        }
        var mouseDownFn = function (e) {
          if (binding.modifiers.shaow) {
            var newNode = moveEl.cloneNode(true)
            moveEl.style.opacity = '0.5'
            moveEl.parentNode.appendChild(newNode)
          }
          var disX, disY
          if (!binding.modifiers.dragY) disX = e.clientX - moveEl.offsetLeft
          if (!binding.modifiers.dragX) disY = e.clientY - moveEl.offsetTop
          var mouseMoveFn = function (e) {
            e.preventDefault()
            var left = e.clientX - disX
            var top = e.clientY - disY
            // dragOutX
            var limitWidth = binding.value && binding.value.dragOutX ? moveEl.offsetWidth - binding.value.dragOutX : 0
            // dragOutY
            if (binding.value && binding.value.dragOutY) {
              var limitHeigth = moveEl.offsetHeight - binding.value.dragOutY
              var limitHeigthTop = el.offsetHeight - binding.value.dragOutY
            } else {
              limitHeigth = 0
              limitHeigthTop = 0
            }
            if (left < 0 - limitWidth) {
              left = 0 - limitWidth
            } else if (left > moveEl.parentNode.clientWidth - moveEl.offsetWidth + limitWidth) {
              left = moveEl.parentNode.clientWidth - moveEl.offsetWidth + limitWidth
            }
            if (top < 0 - limitHeigthTop) {
              top = 0 - limitHeigthTop
            } else if (top > moveEl.parentNode.clientHeight - moveEl.offsetHeight + limitHeigth) {
              top = moveEl.parentNode.clientHeight - moveEl.offsetHeight + limitHeigth
            }
            moveEl.style.left = left + 'px'
            moveEl.style.top = top + 'px'
            if (binding.value && binding.value.ondrag) {
              if (typeof binding.value.ondrag !== 'function') {
                console.error('ondrag: should be a function')
              }
              binding.value.ondrag(e, { left: left, top: top })
            }
          }
          // mousemove
          document.addEventListener('mousemove', mouseMoveFn)
          var mouseUpFn = function () {
            if (newNode) {
              moveEl.style.opacity = '1'
              newNode.parentNode.removeChild(newNode)
            }
            document.removeEventListener('mousemove', mouseMoveFn)
            document.removeEventListener('mouseup', mouseUpFn)
          }
          //  mouseup
          document.addEventListener('mouseup', mouseUpFn)
        }
        // mousedown
        el.addEventListener('mousedown', mouseDownFn)
      }
    })
  }
}
