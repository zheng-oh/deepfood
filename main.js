import App from './App'
import * as Pinia from 'pinia';
import uviewPlus from '@/uni_modules/uview-plus'
import share from '@/api/wxshare.js'

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(Pinia.createPinia());
	app.use(uviewPlus)
	app.mixin(share)

	return {
		app,
		Pinia,
		share
	}
}
// #endif
