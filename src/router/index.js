import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
        meta: { navShow: true, auth: true }
    },
    {
        path: "/about",
        name: "About",
        meta: { navShow: true, auth: true },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/user/About.vue"),
    },
    {
        path: "/userinfo",
        name: "UserInfo",
        meta: { navShow: false, auth: true },
        component: () =>
            import ( /* webpackChunkName: "userinfo" */ "../views/user/UserInfo.vue")
    },
    {
        path: "/login",
        name: "Login",
        meta: { navShow: false, auth: false },
        component: () =>
            import ( /* webpackChunkName: "login" */ "../views/user/Login.vue"),
    },
    {
        path: "/regist",
        name: "Regist",
        meta: { navShow: false, auth: false },
        component: () =>
            import ( /* webpackChunkName: "regist" */ "../views/user/Regist.vue"),
    },
    {
        path: "/nickname",
        name: "nickname",
        meta: { navShow: false, auth: true },
        component: () =>
            import ( /* webpackChunkName: "nickname" */ "../views/user/Nickname.vue"),
    },
    {
        path: "/brief",
        name: "brief",
        meta: { navShow: false, auth: true },
        component: () =>
            import ( /* webpackChunkName: "brief" */ "../views/user/Brief.vue"),
    },
    {
        path: "/addmemory",
        name: "addMemory",
        meta: { navShow: true, auth: true },
        component: () =>
            import ( /* webpackChunkName: "addNote" */ "../views/AddMemory.vue"),
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
    // 判断要进入的路由是否需要认证
    if (to.meta.auth) {
        // 通过token令牌机制判断是否已经登录
        const token = localStorage.getItem('token');
        if (token) {
            next(); // 如果登录则放行，进入路由
        } else {
            // 跳转，并携带重定向地址
            next({
                path: '/login',
                query: {
                    redirect: to.path
                }
            });
        }
    } else {
        // 不需要验证的模块，直接放行
        next();
    }
});

export default router;