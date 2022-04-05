import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css' // 让不同的浏览器在渲染网页元素的时候形式更统一
import "./style/base.css"
import "./style/iconfont.css"

createApp(App).use(store).use(router).mount('#app')
