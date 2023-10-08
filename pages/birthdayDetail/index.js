import {
	ref,
	computed
} from 'vue'
import {
	diffDays,
	diffHours
} from '../../utils';

// 目标年龄
export const goalAge = ref(100);