import {
	user
} from "../..";
import {
	updateDesc,
	updateUsername
} from "../../../../api/user";

/**
 *  保存用户简介
 */
export function saveUsername() {
	updateUsername(user.value.username).then(() => {
		uni.showToast({
			icon: 'none',
			title: '保存成功'
		})
		uni.navigateBack()
	})
}