import Validate from './index'

export default function validateInvite(invite={}) {
	var errors = {
		// invitename : Validate(invite.invitename).required().handle().message(),
		// name : Validate(invite.name).required().message(),
		email : Validate(invite.email).required().email().message(),
		// description : Validate(invite.description).message()
	}

	errors.isValid = Object.keys(errors).every((key) => (errors[key] == undefined))
	return errors;
}