import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.config.productionTip = false

app.mount('#app')
