
export function groupDiffByPath (diff = []) {
  return diff.reduce((acc, a) => {
    let ch = acc
    a.path.split('/').slice(1).forEach((pathComponent) => {
      ch[pathComponent] || (ch[pathComponent] = { })
      ch = ch[pathComponent]
    })
    ch.change = a
    
    return acc
  }, { })
}
