import { selectPeerById } from './peers'

export function selectSessionPeer (state) {
  return state.session
}

export function selectSessionPeername (state) {
  const sessionPeer = state.session
  const peer = selectPeerById(state, sessionPeer)
  return peer ? peer.peername : undefined
}
