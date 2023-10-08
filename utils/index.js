export const classNameMap = {
	love: 'icon-Love00002',
	marry: 'icon-jiehunzhao',
	menses: 'icon-weishengjin',
	birthday: 'icon-shengri',
}

export const eventTypeMap = {
	marry: '结婚日',
	love: '恋爱日',
	birthday: '出生日',
	menses: '姨妈日'
}

export const diffHours = (date_1, date_2) => {
	// 计算两个日期之间的差值
	let totalHours, diffDate
	let myDate_1 = Date.parse(date_1)
	let myDate_2 = Date.parse(date_2)
	// 将两个日期都转换为毫秒格式，然后做差
	diffDate = Math.abs(myDate_1 - myDate_2) // 取相差毫秒数的绝对值

	totalHours = Math.floor(diffDate / (1000 * 3600)) // 向下取整

	return totalHours // 相差的天数
}


export const diffDays = (date_1, date_2) => {
	// 计算两个日期之间的差值
	let totalDays, diffDate
	let myDate_1 = Date.parse(date_1)
	let myDate_2 = Date.parse(date_2)
	// 将两个日期都转换为毫秒格式，然后做差
	diffDate = myDate_2 - myDate_1 // 取相差毫秒数的绝对值

	totalDays = Math.floor(diffDate / (1000 * 3600 * 24)) // 向下取整

	return totalDays // 相差的天数
}
/**
 * 计算两个日期的差,返回年月日时
 * @param {Object} startTime
 * @param {Object} diffTime
 */
export const diff = (date_1, date_2) => {
	let myDate_1 = Date.parse(date_1)
	let myDate_2 = Date.parse(date_2)
	// 将两个日期都转换为毫秒格式，然后做差
	let diffDate = myDate_2 - myDate_1 // 取相差毫秒数的绝对值
	const years = Math.floor(diffDate / (1000 * 3600 * 24 * 30 * 12))
	diffDate = diffDate % (1000 * 3600 * 24 * 30 * 12)
	const months = Math.floor(diffDate / (1000 * 3600 * 24 * 30))
	diffDate = diffDate % (1000 * 3600 * 24 * 30)

	const days = Math.floor(diffDate / (1000 * 3600 * 24))
	diffDate = diffDate % (1000 * 3600 * 24)
	const hours = Math.floor(diffDate / (1000 * 3600))
	return {
		years,
		months,
		days,
		hours
	}
}