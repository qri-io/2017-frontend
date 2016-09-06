

export default function validateMigration(migration) {
	var errors = {
		dataset : undefined,
		author : undefined,
		description: undefined,
	}

	// // validate author
	// if m.Author == nil {
	// 	return ErrAuthorRequired
	// } else if exists, err := ModelExists(db, TypeUser, m.Author.Id); err != nil {
	// 	return err
	// } else if !exists {
	// 	return ErrInvalidAuthor
	// }

	// // validate dataset
	// if m.Dataset == nil {
	// 	return ErrDatasetRequired
	// } else if !validUuid(m.Dataset.Id) {
	// 	return ErrInvalidDataset
	// } else if exists, err := ModelExists(db, TypeDataset, m.Dataset.Id); err != nil {
	// 	return err
	// } else if !exists {
	// 	return ErrInvalidDataset
	// }

	// if m.Sql.String() == "" && len(m.Steps) == 0 {
	// 	return ErrSqlOrStepsRequired
	// } else if m.Sql != "" && len(m.Steps) > 0 {
	// 	return ErrSqlOrStepsRequired
	// }

	// if m.Sql.String() != "" {
	// 	// make sure statement can be turned into a proper migration statement if it exists
	// 	_, _, err := ql.NewMigrationStatement(m.Sql.String())
	// 	if err != nil {
	// 		return err
	// 	}
	// }


	errors.isValid = Object.keys(errors).every((key) => (errors[key] == undefined))
	return errors;
}