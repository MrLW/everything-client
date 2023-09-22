import env from '@/utils/env';

function service(options = {}) {
	options.url = `${env.baseUrl}${options.url}`;
	// 判断本地是否存在token，如果存在则带上请求头
	// let token = uni.getStorageSync('token')
	// options.header = {
	// 	'content-type': 'application/json',
	// 	// 'Authorization': `Bearer ${token || false}`	// 这里是token(可自行修改)
	// 	"Authorization":token
	// };
	// resolved是返回成功数据，rejected返回错误数据
	return new Promise((resolved, rejected) => {
		options.success = (res) => {
			// 如果请求回来的状态码不是200则执行以下操作
			if (res.statusCode != 500) {
				resolved(res.data)
			} else {
				// 非成功状态码弹窗
				uni.showToast({
					icon: 'none',
					duration: 3000,
					title: `${res.data.msg}`
				});
				// 这里可以做一些状态码判断以及操作
				// 返回错误信息
				// 退回到登录页面
				// uni.reLaunch({
				// 	url:"/pages/login/login"
				// })
				rejected(res)
				
			}
		};
		options.fail = (err) => {
			// 请求失败弹窗
			uni.showToast({
				icon: 'none',
				duration: 3000,
				title: '服务器错误,请稍后再试'
			});
			rejected(err);
		};
		uni.request(options);
	});
}


export default service;
