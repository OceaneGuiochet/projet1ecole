import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia"
import { useUserStore } from "@/stores/authStore"
import './assets/main.css'


const app = createApp(App)

app.use(router)
app.use(createPinia())

const userStore = useUserStore()
userStore.init()

app.mount('#app')
