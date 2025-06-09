import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import "@/assets/css/common.css"
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "@/assets/icon/iconfont"
import "@/assets/icon/iconfont.css"
import VueLazyload from 'vue-lazyload';
const pinia = createPinia()
import LoadingGif from "@/assets/images/loading.gif"
import ErrorJpg from "@/assets/images/error.jpg"


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
app.use(router)
// app.use(ElementPlus)
app.use(VueLazyload, {
  preLoad: 1.3,
  loading: LoadingGif,
  attempt: 1,
  error: ErrorJpg,
  observer: true,
  filter: {
    webp: 'image/webp',
    svg: 'image/svg+xml',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
  },
})
app.mount('#app')
