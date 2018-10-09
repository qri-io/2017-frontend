// kinda like the golang reflect package, these funcs give introspection into
// data structures

export function isEmpty (v) {
  if (v === undefined) { return true }

  switch (v.constructor) {
    case Object:
      return isEmptyObj(v)
    case Array:
      return v.length === 0
  }
  return !v
}

export function isEmptyObj (obj = {}) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
