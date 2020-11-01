import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
        meta: { navShow: true, }
    },
    {
        path: "/about",
        name: "About",
        meta: { navShow: true },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/user_info",
        name: "UserInfo",
        meta: { navShow: false },
        component: () =>
            import ( /* webpackChunkName: "user_info" */ "../views/UserInfo.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;