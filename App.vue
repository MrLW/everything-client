<script>
	import {
		connect
	} from './socket'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			connect()
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './static/iconfont.scss';
</style>