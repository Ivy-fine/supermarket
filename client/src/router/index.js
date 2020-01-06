import Vue from "vue";
import VueRouter from "vue-router";
import cookie from "@/utils/cookie";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/main/children/home")
      },
      {
        path: "/classify",
        name: "classify",
        component: () => import("@/views/main/children/classify")
      },
      {
        path: "/shopcart",
        name: "shopcart",
        meta: {
          requiresAuth: true // 需要登陆状态
        },
        component: () => import("@/views/main/children/shopcart")
      },
      {
        path: "/mine",
        name: "mine",
        meta: {
          requiresAuth: true // 需要登陆状态
        },
        component: () => import("@/views/main/children/mine")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login")
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () => import("@/views/detail")
  },
  {
    path: "/address",
    name: "address",
    meta: {
      noRequiresLoc: true // 不需要定位信息
    },
    component: () => import("@/views/address")
  },
  {
    path: "/selectAddress",
    name: "selectAddress",
    meta: {
      noRequiresLoc: true // 不需要定位信息
    },
    component: () => import("@/views/selectAddress")
  },
  {
    path: "/editAddress",
    name: "editAddress",
    meta: {
      noRequiresLoc: true, // 不需要定位信息
      requiresAuth: true, // 需要登陆状态
      keepAlive: true
    },
    component: () => import("@/views/editAddress")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search")
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/order")
  },
  {
    path: "/pay",
    name: "pay",
    component: () => import("@/views/pay")
  },
  {
    path: "/geolocation",
    name: "geolocation",
    meta: {
      noRequiresLoc: true // 不需要定位信息
    },
    component: () => import("@/views/geolocation")
  },
  {
    path: "/",
    redirect: "/home"
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (
    !to.meta.noRequiresLoc &&
    Object.keys(store.state.user.location).length <= 0
  ) {
    next({
      path: "/geolocation",
      query: { redirect: to.fullPath }
    });
  } else {
    if (to.meta.requiresAuth) {
      const token = cookie.getCookie("token");
      if (!token) {
        next({
          path: "/login",
          query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});
export default router;
