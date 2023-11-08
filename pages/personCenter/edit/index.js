import {
	ref,
	computed
} from 'vue'
import {
	user
} from '..'

import * as userApi from '../../../api/user'
import {
	toast
} from '../../../utils'
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
	userApi.updateSex(e.detail.value).then(() => {
		uni.showToast({
			icon: 'none',
			title: '修改成功'
		})
		user.value.sex = e.detail.value;
	}).catch(err => console.error(err))
}

export function updateUserBirthday(e) {
	userApi.updateBirthday(e.detail.value).then(() => {
		toast('修改成功')
		user.value.birthday = e.detail.value;
	})
}

export const sexText = computed(() => sexList.value.find(item => item.value == user.value.sex).text)