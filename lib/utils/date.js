
export function relDate (datetime) {
  if (!datetime) {
    return ''
  }

  // Make a fuzzy time
  const now = new Date()
  const date = new Date(datetime)

  var delta = Math.round((now.valueOf() - date.valueOf()) / 1000)

  let minute = 60; let hour = minute * 60; let day = hour * 24
  let week = day * 7

  var fuzzy = delta.toFixed(0)

  if (delta < 30) {
    fuzzy = 'now'
  } else if (delta < minute) {
    fuzzy = delta + ' seconds ago'
  } else if (delta < 2 * minute) {
    fuzzy = 'a minute ago'
  } else if (delta < hour) {
    fuzzy = Math.floor(delta / minute) + ' minutes ago'
  } else if (Math.floor(delta / hour) === 1) {
    fuzzy = '1 hour ago'
  } else if (delta < day) {
    fuzzy = Math.floor(delta / hour) + ' hours ago'
  } else if (delta < day * 2) {
    fuzzy = 'yesterday'
  } else if (delta < week) {
    fuzzy = 'a week ago'
  } else if (delta < week / 3) {
    fuzzy = `${Math.round(delta / week)} weeks ago`
  } else if (delta < day * 30) {
    fuzzy = 'a month ago'
  } else if (delta / (day * 30) < 12) {
    fuzzy = `${Math.round(delta / (day * 30))} months ago`
  } else {
    fuzzy = `${Math.round(delta / (day * 365))} years ago`
  }
  return fuzzy
}
