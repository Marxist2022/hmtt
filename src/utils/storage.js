// 为了方便项目中使用本地储存时候写的时候，简化操作，封装获取 设置删除 全部删除工具函数
/***
 *@param {*} key
 *@returns
 */
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}

/** *
 *  设置
 *@param {*} key
 *@param {*} value
 */
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}

/** *
 *  根据key删除存储中其中一个
 *@param {*} key
 *
 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}

/** *
 *  删除所有本地存储
 *
 */
export function clearItem () {
  window.localStorage.clearItem()
}
