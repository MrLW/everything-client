import App from './App'


// 监听原生事件
window.addEventListener('keydown', (event) => {
	const metaKey = event.metaKey;
	const key = event.key;
	if (key == 'r' && metaKey) {
		// 重新创建socket
		event.preventDefault()
		connect()
	}
})



// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif
// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import {
	connect
} from './socket/index';
import {
	createPinia
} from 'pinia'
const pinia = createPinia()
export function createApp() {
	const app = createSSRApp(App)
	app.use(pinia)
	return {
		app
	}
}
// #endif