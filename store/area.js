import {
	defineStore
} from 'pinia'
import {
	reactive
} from 'vue'
import {
	getAreaInfo
} from '../api/area';


export const useAreaStore = defineStore('area', () => {

	const provinceList = reactive([])

	function getProvinceList() {
		return getAreaInfo().then(res => provinceList.splice(0, provinceList.length, ...res))
	}

	return {
		provinceList,
		getProvinceList,
	}
})