export const isTypes = ["success", "info", "warning", "error"];

export function isUndef(v) {
  return v === undefined || v === null;
}

export function isDef(v) {
  return v !== undefined && v !== null;
}

export function isTrue(v) {
  return v === true;
}

export function isFalse(v) {
  return v === false;
}

function isObject(target) {
  if (typeof target === "object") {
    return true;
  }
  return false;
}

function isArray(target) {
  if (Array.isArray(target)) {
    return true;
  }
  return false;
}
export function deepClone(target) {
  const map = new Map();
  function clone(target) {
    if (isObject(target)) {
      let cloneTarget = isArray(target) ? [] : {};
      if (map.get(target)) {
        return map.get(target);
      }
      map.set(target, cloneTarget);
      for (const key in target) {
        cloneTarget[key] = clone(target[key]);
      }
      return cloneTarget;
    } else {
      return target;
    }
  }
  return clone(target);
}
