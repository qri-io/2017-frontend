export function selectProfile (state) {
  return state.settings && state.settings.profile
}

export function selectPanelIndex (state) {
  return state.settings && state.settings.panelIndex
}

export function selectTheme (state) {
  return state.settings && state.settings.theme
}

export function selectSettings (state) {
  return state.settings
}

export function selectLocalProfile (state) {
  return state.locals.profile && state.locals.profile.user
}
