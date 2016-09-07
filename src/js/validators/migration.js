import Validate from './index'

export default function validateMigration(migration={}) {
	var errors = {
		dataset : Validate(migration.dataset).required().model().message(),
		author : Validate(migration.author).required().model().message(),
		sql : Validate(migration.sql).required().message(),
		description: undefined,
	}

	errors.isValid = Object.keys(errors).every((key) => (errors[key] == undefined))
	return errors;
}