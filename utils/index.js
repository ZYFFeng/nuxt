/**
 *
 *
 * @param {function} fn
 * @param {number} [interval=300]
 * @description 节流函数
 */
export const throttle = (fn, interval = 300) => {
  let canRun = true
  return function () {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
        fn.apply(this, arguments)
        canRun = true
    }, interval)
  }
}
/**
 *
 *
 * @param {Object} obj
 * @description 删除对象中值为falsy(虚值)的属性
 */
export const delUndefined = (obj) => {
  let copyObj = JSON.parse(JSON.stringify(obj))
  for (let key in copyObj) {
    if (!copyObj[key]) {
      delete copyObj[key]
    }
  }
  return copyObj
}
/**
 *
 *
 * @param {Objects} ...objs
 * @description 合并对象
 */
export const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k) ? [].concat(acc[k]).concat(obj[k]) : obj[k]
        return acc
      }, {}),
    {}
  )