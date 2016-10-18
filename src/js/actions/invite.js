import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'

import { newLocalModel, updateLocalModel, editModel, clearLocalModel } from './locals'
import { setMessage, resetMessage, removeModel } from './app'

const INVITE_NEW = 'INVITE_NEW';
export function newInvite(attributes={}) {
	attributes = Object.assign({
		marketing : true,
		email : "",
	}, attributes);
	return newLocalModel(Schemas.INVITE, INVITE_NEW, attributes)
}

const INVITE_UPDATE = 'INVITE_UPDATE';
export function updateInvite(dataset) {
	return updateLocalModel(Schemas.INVITE, INVITE_UPDATE, dataset)
}

export const INVITE_REQUEST = 'INVITE_REQUEST'
export const INVITE_SUCCESS = 'INVITE_SUCCESS'
export const INVITE_FAILURE = 'INVITE_FAILURE'

export function saveInvite(invite) {
	const uriEmail = encodeURIComponent(invite.email)
	return (dispatch, getState) => {
		return dispatch({
			[CALL_API] : {
				types : [INVITE_REQUEST, INVITE_SUCCESS, INVITE_FAILURE],
				method : 'POST',
				endpoint : `/invites?email=${uriEmail}&marketing=${invite.marketing}`,
				schema : Schemas.INVITE,
				data : invite
			},
			silentError : true,
		}).then(action => {
			if (action.type === INVITE_SUCCESS) {
				setTimeout(() => {
					dispatch(resetMessage());
				}, 3800);

				return dispatch(setMessage(`Thanks! we'll email ${invite.email} soon!`));
			}
		})
	}
}