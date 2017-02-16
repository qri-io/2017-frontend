import Validate from './index'

export default function validateUser(user={}) {
	var errors = {
		username : Validate(user.username).required().handle().message(),
		name : Validate(user.name).required().message(),
		email : Validate(user.email).required().email().message(),
		description : Validate(user.description).message()
	}

	errors.isValid = Object.keys(errors).every((key) => (errors[key] == undefined))
	return errors;
}