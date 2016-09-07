
export function pathForAddress(address) {
	return "/" + address.replace(".", "/", -1)
}