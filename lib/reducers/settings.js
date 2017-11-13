import { PROFILE_LOAD_SUCCESS, SETTINGS_SET_PANEL_INDEX } from '../constants/settings'

const initialState = {
  panelIndex: 0,
  profile: undefined
}

export default function settingsReducer (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOAD_SUCCESS:
      return Object.assign({}, state, { profile: action.response.entities.profile.user })
    case SETTINGS_SET_PANEL_INDEX:
      return Object.assign({}, state, { panelIndex: action.value })
  }

  return state
}
