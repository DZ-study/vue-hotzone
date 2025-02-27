import _ from '../utils'

export default {
  beforeMount: function (el, binding, vnode) {
    el.addEventListener('mousedown', handleMouseDown)
    const context = binding.instance

    function handleMouseDown (e) {
      let pointer = e.target.dataset.pointer

      if (!pointer) {
        return
      }

      e && e.stopPropagation()

      let zone = el.parentNode
      let setting = context.setting
      let container = _.getOffset(zone.parentNode)
      let itemInfo = {
        width: _.getOffset(zone).width || 0,
        height: _.getOffset(zone).height || 0,
        top: setting.topPer * container.height || 0,
        left: setting.leftPer * container.width || 0
      }
      let preX = _.getPageX(e)
      let preY = _.getPageY(e)
      let flag

      // Hide the info displayed by hover
      context.handlehideZone(true)

      window.addEventListener('mousemove', handleChange)
      window.addEventListener('mouseup', handleMouseUp)

      function handleChange (e) {
        e && e.preventDefault()
        flag = true

        let moveX = _.getPageX(e) - preX
        let moveY = _.getPageY(e) - preY

        preX = _.getPageX(e)
        preY = _.getPageY(e)

        // Handling the situation when different dragging points are selected
        let styleInfo = _[pointer](itemInfo, moveX, moveY)

        // Boundary value processing
        itemInfo = _.dealEdgeValue(itemInfo, styleInfo, container)

        Object.assign(zone.style, {
          top: `${itemInfo.top}px`,
          left: `${itemInfo.left}px`,
          width: `${itemInfo.width}px`,
          height: `${itemInfo.height}px`
        })
      }

      function handleMouseUp () {
        if (flag) {
          flag = false
          let perInfo = {
            topPer: _.decimalPoint(itemInfo.top / container.height),
            leftPer: _.decimalPoint(itemInfo.left / container.width),
            widthPer: _.decimalPoint(itemInfo.width / container.width),
            heightPer: _.decimalPoint(itemInfo.height / container.height)
          }
          context.changeInfo(perInfo)

          // 兼容数据无变更情况下导致 computed 不更新，数据仍为 px 时 resize 出现的问题
          Object.assign(zone.style, {
            top: `${itemInfo.top}px`,
            left: `${itemInfo.left}px`,
            width: `${itemInfo.width}px`,
            height: `${itemInfo.height}px`
          })
        }
        // Show the info
        context.handlehideZone(false)

        window.removeEventListener('mousemove', handleChange)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }

    el.$destroy = () => el.removeEventListener('mousedown', handleMouseDown)
  },
  unmounted: function (el) {
    el.$destroy()
  }
}
