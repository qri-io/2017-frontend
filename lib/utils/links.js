export function addActiveToLink (linkList, pathname, defaultLinkName) {
  var active
  var newLinkList = linkList.map(link => {
    if (link.link !== '' && pathname.endsWith(link.link)) {
      active = true
      link['active'] = true
      return link
    }
    return link
  })
  if (!active) {
    newLinkList = newLinkList.map(link => {
      if (link.name === defaultLinkName) {
        link['active'] = true
        return link
      }
      return link
    })
  }
  return newLinkList
}

export function datasetLinks (dataset, fromRegistry, isLocal) {
  const keys = Object.keys(dataset)
  var linkList = [
    {
      name: 'Overview',
      link: 'overview'
    }
  ]
  if (keys.includes('viz') && dataset.viz.scriptPath) {
    linkList.push(
      {
        name: 'Viz',
        link: 'viz'
      }
    )
  }
  if (!fromRegistry) {
    linkList.push(
      {
        name: 'Body',
        link: 'body'
      }
    )
  }
  if (keys.includes('meta')) {
    linkList.push(
      {
        name: 'Meta',
        link: 'meta'
      }
    )
  }
  if (keys.includes('structure')) {
    linkList.push(
      {
        name: 'Structure',
        link: 'structure'
      }
    )
  }
  if (keys.includes('transform') && dataset.transform.scriptPath) {
    linkList.push(
      {
        name: 'Transform',
        link: 'transform'
      }
    )
  }
  if (!fromRegistry) {
    linkList.push(
      {
        name: 'History',
        link: 'history'
      }
    )
  }
  return linkList
}
