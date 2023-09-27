import {
	defineConfig
} from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

import Components from 'unplugin-vue-components/vite';
import {
	VantResolver
} from '@vant/auto-import-resolver';

export default defineConfig({
	plugins: [
		uni(),
		Components({
			// resolvers: [VantResolver()],
		}),
	],
});