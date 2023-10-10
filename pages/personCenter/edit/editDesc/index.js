import {
	user
} from "../..";
import {
	updateDesc
} from "../../../../api/user";

/**
 *  保存用户简介
 */
export function saveDesc() {
	updateDesc(user.value.desc).then(() => {
		uni.showToast({
			icon: 'none',
			title: '保存成功'
		})
		uni.navigateBack()
	})
}