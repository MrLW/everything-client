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

export const goPage = function(moduleItem) {
	uni.navigateTo({
		url: moduleItem.path
	}).catch(() => uni.showToast({
		title: "开发中",
		icon: 'none'
	}))
}

/**
 *  进入到瞬间详情
 */
export const getMomentDetailPage = (id) => {
	uni.navigateTo({
		url: "/pages/loveDetail/momentDetail/momentDetail?id=" + id
	})
}

// 进入聊天页面
export function goFriendChat(friendId, username) {
	uni.navigateTo({
		url: "/pages/loveDetail/chat/chat?friendId=" + friendId + '&title=' + username
	})
}