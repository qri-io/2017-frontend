
export function dimensions (device, view) {
  let width = 300
  let height = 400
  switch (device.size) {
    case 'xs':
      width = 300
      break
    case 'sm':
      width = 450
      break
    case 'md':
      width = 600
      break
    case 'lg':
      width = 900
      height = 400
      break
    case 'xl':
      width = 1100
      height = 500
      break
  }

  return { width, height }
}

export function wrapperStyle (device, view) {
  return { background: '#272727', border: 'none', borderRadius: 3 }
}

export function defaultColor (index) {
  return ['#49C797', '#E6DB74', '#B04BD8', '#E2542E', '#DFE2CE', '#49C3C7'][index]
}
