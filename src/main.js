import {
    createApp
} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
    .use(store)
    .use(router)
    .use(Vant)
    .use(VueAxios, axios)
    .mount("#app");