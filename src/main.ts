import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import "@/assets/css/common.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "@/assets/icon/iconfont"
import "@/assets/icon/iconfont.css"
import { createPinia } from 'pinia'

const pinia = createPinia()



const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
