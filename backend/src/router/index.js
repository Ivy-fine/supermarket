import Vue from "vue";
import VueRouter from "vue-router";
import workbench from "./module/workbench";
import cookie from "@/utils/cookie";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login")
  },
  {
    path: "/",
    redirect: "/workbench/home"
  },
  {
    path: "/base",
    component: () => import("../layout/baseLayout"),
    children: [workbench]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    if (cookie.getCookie("adminToken")) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
export const asyncRouteMap = [workbench];
