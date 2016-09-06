

export default function validateChange(change) {
	var errors = {}

	
	// if c.Author == nil {
	// 	return ErrAuthorRequired
	// }
	// if exists, err := UserExists(db, c.Author.GetId()); err != nil || !exists {
	// 	return ErrInvalidAuthor
	// }

	// if c.Dataset == nil {
	// 	return ErrDatasetRequired
	// }
	// if exists, err := DatasetExists(db, c.Dataset.Id); err != nil || !exists {
	// 	return ErrInvalidDataset
	// }

	// if c.Type != ChangeTypeInsert && c.Type != ChangeTypeModify && c.Type != ChangeTypeDelete {
	// 	return ErrInvalidChangeType
	// }

	// c.TableName = strings.TrimSpace(c.TableName)
	// // TODO - Check to make sure the table being referenced is part of the dataset
	// if c.TableName == "" {
	// 	return ErrTableNameRequired
	// } else if has, err := c.Dataset.HasTable(db, c.TableName); err != nil {
	// 	return err
	// } else if !has {
	// 	return ErrInvalidTableName
	// }

	// if c.Sql == "" && c.File == nil {
	// 	return ErrDataSourceRequired
	// }

	// if c.Sql != "" && c.File != nil || c.File != nil && c.Sql != "" {
	// 	logger.Println(c.Sql, c.filePath())
	// 	return ErrInvalidDataSource
	// }

	// if c.File == nil && c.Type == ChangeTypeInsert {
	// 	return ErrInsertsRequireFile
	// }

	// if c.Executed != 0 && c.Declined != 0 {
	// 	return ErrExecutedAndDeclined
	// }

	// c.Description = strings.TrimSpace(c.Description)

	errors.isValid = Object.keys(errors).every((key) => (errors[key] == undefined))
	return errors;
}