import Validate, { requiredField } from './index'

export default function validateDataset (dataset = {}) {
  const errors = {
    // handle : Validate(dataset.handle).required().handle().message(),
    name: Validate(dataset.name).required().handle().message(),
    // currently we don't validate the owner, as it'll be automatically set by the server
    // to the requesting session user
    // added back to satisfy linter
    owner: requiredField(ownerError(dataset.owner))
  }
  errors.isValid = Object.keys(errors).every((key) => (errors[key] === undefined))
  return errors
}

function ownerError (owner) {
  if (!owner) {
    return 'owner required'
  }
  if (typeof owner === 'object' && !owner.id) {
    return 'owner id is required'
  }
  return undefined
}
