
export default function validateQuery(query) {
	let errors = {

	}

	// // q.Address = NewAddress(strings.TrimSpace(q.Address.String()))
	// // if !validAddress(q.Address) && q.Address.String() != "" {
	// // 	return ErrAddressInvalid
	// // }

	// q.Statement = ql.NewStatement(strings.TrimSpace(q.Statement.String()))
	// if q.Statement.String() == "" {
	// 	return ErrSqlRequired
	// }
	// if !q.Statement.IsReadonly() || !q.Statement.ContainsSelect() {
	// 	return ErrStatementInvalid
	// }

	// // if q.Author == nil {
	// // 	return ErrAuthorRequired
	// // }

	errors.isValid = Object.keys(errors).every((key) => (errors[key] == undefined))
	return errors;
}