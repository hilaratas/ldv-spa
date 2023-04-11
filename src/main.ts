import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const firebaseConfig = {
  apiKey: "AIzaSyCC4MZtebMMxm4ACI-OIIh58vOVgFtn9Zo",
  authDomain: "nrachkova-vue3-ldv.firebaseapp.com",
  databaseURL: "https://nrachkova-vue3-ldv-default-rtdb.firebaseio.com",
  projectId: "nrachkova-vue3-ldv",
  storageBucket: "nrachkova-vue3-ldv.appspot.com",
  messagingSenderId: "747858080340",
  appId: "1:747858080340:web:89dbdd72c6f6c973aaf3c1"
};

createApp(App).use(store).use(router).mount('#app')
