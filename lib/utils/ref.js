export function makeRef (peername = '', name = '', profileID = '', path = '') {
  var ref = ''
  if (peername && name) {
    ref += `${peername}/${name}`
  }
  if (profileID || path) {
    ref += '@'
    if (profileID) {
      ref += profileID
    }
    if (path) {
      if (path[0] !== '/') {
        ref += '/'
      }
      ref += path
    }
  }
  return ref
}
