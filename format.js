const format = function(str) {
	return str
		.normalize("NFD")
		.replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
		.normalize()
		.replace(/\s+/g, "_").toLowerCase()
}

export default format
