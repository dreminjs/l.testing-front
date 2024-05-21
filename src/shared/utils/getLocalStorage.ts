const getLocalStorage = (key: string) => {
	if (typeof localStorage !== 'undefined') {
		const ls = localStorage.getItem(key)
		if (ls && ls !== 'undefined') {
			return JSON.parse(ls)
		}
	}
	return null
}
export default getLocalStorage
