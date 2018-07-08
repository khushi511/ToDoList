export const updateState = (self, obj) => {
	let newObj = Object.assign({}, self.state, obj)
	self.setState(newObj);
}
