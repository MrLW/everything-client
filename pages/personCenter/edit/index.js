import {
	ref,
	computed
} from 'vue'
import {
	user
} from '..'
import {
	updateSex
} from '../../../api/user'
export const sexList = ref(['女', '男'])

export function showEditDescPage() {
	uni.navigateTo({
		url: "/pages/personCenter/edit/editDesc/editDesc"
	})
}
export function showEditUsernamePage() {
	uni.navigateTo({
		url: "/pages/personCenter/edit/editName/editName"
	})
}

export function showEditEidPage() {
	uni.navigateTo({
		url: "/pages/personCenter/edit/editEid/editEid"
	})
}

export function updateUserSex(e) {
	updateSex(e.detail.value).then(() => {
		uni.showToast({
			icon: 'none',
			title: '修改成功'
		})
		user.value.sex = e.detail.value;
	}).catch(err => console.error(err))
}

export const sexText = computed(() => sexList.value.find(item => item.value == user.value.sex).text)