/**
 *  本地存储
 */
export function set(key, value) {
	if (typeof value == 'string' || typeof value == 'boolean' || typeof value == 'number') {
		uni.setStorageSync(key, value)
	} else {
		uni.setStorageSync(key, JSON.stringify(value))
	}
}

export function get(key) {
	const value = uni.getStorageSync(key);
	if (value.includes("\"")) {
		try {
			return JSON.parse(value)
		} catch (e) {
			return value;
		}
	}
	return value;
}