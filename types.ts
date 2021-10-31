interface Type<T> {
	new (...args: any[]): T;
}

function staticImplements<T>() {
	return (constructor: T) => {};
}
