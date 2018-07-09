export const updateState = (self, obj) => {
	let newObj = Object.assign({}, self.state, obj)
	self.setState(newObj);
}

//Validation
export const isEmptyOrNull = (state, propName, error, errorMessage) => {
	if(state && !state[propName]){
		error[propName] = errorMessage;
		return true
	}
	return false
}
