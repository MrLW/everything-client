import {
	onMounted,
	reactive,
	ref
} from 'vue';
import {
	getMensesList
} from '../../api/event';


export const mensesList = reactive([])

export const getAllMenses = () => {
	getMensesList().then(data => {
		mensesList.splice(0, mensesList.length, ...data);
	})
}