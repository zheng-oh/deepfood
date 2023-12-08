import App from './App'
import * as Pinia from 'pinia';
import uviewPlus from '@/uni_modules/uview-plus'

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(Pinia.createPinia());
	app.use(uviewPlus)

	return {
		app,
		Pinia
	}
}
// #endif
