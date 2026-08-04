import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import ActivityListView from './views/ActivityListView.vue'
import RandomPickerView from './views/RandomPickerView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/activities', component: ActivityListView },
    { path: '/random', component: RandomPickerView },
  ],
})

createApp(App).use(router).mount('#app')
