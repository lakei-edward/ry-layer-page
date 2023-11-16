export const isTypes = ['success', 'info', 'warning', 'error']

export function isUndef(v) {
  return v === undefined || v === null
}

export function judgeType(v) {
  return Object.prototype.toString.call(v).slice(8, -1)
}

export function isDef(v) {
  return v !== undefined && v !== null
}

export function isTrue(v) {
  return v === true
}

export function isFalse(v) {
  return v === false
}

export function isFunction(v) {
  return judgeType(v) === 'Function'
}

function isObject(target) {
  if (typeof target === 'object') {
    return true
  }
  return false
}

function isArray(target) {
  if (Array.isArray(target)) {
    return true
  }
  return false
}
export function deepClone(target) {
  const map = new Map()
  function clone(target) {
    if (isObject(target)) {
      let cloneTarget = isArray(target) ? [] : {}
      if (map.get(target)) {
        return map.get(target)
      }
      map.set(target, cloneTarget)
      for (const key in target) {
        cloneTarget[key] = clone(target[key])
      }
      return cloneTarget
    } else {
      return target
    }
  }
  return clone(target)
}
// 处理字典
export function handleDicts(object, dicts, flag = true) {
  if (flag) {
    for (const key in object) {
      if (object[key].mode && Array.isArray(object[key].mode.form)) {
        object[key].mode.form.forEach(async item => {
          if (judgeType(item.dict) === 'String') {
            item.dict = item.dict && dicts.type[item.dict]
          } else if (judgeType(item.dict) === 'Promise') {
            item.dict = await item.dict
          }
        })
      }
    }
  } else {
    if (Array.isArray(object.mode.form)) {
      object.mode.form.forEach(async item => {
        if (judgeType(item.dict) === 'String') {
          item.dict = item.dict && dicts.type[item.dict]
        } else if (judgeType(item.dict) === 'Promise') {
          item.dict = await item.dict
        }
      })
    }
  }
}
