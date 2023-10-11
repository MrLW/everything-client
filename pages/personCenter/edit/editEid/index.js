import {
	user
} from "../..";
import {
	updateEid
} from "../../../../api/user";

/**
 *  保存用户简介
 */
export function saveEid() {
	updateEid(user.value.eid).then((res) => {
		uni.showToast({
			icon: 'none',
			title: '保存成功'
		})
		uni.navigateBack()
	})
}