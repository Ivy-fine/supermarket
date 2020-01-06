export default {
  path: "/workbench",
  name: "workbench",
  component: () => import("@/layout/main"),
  children: [
    {
      path: "/workbench/home",
      name: "home",
      meta: {
        title: "首页管理",
        icon: "el-icon-menu"
      },
      component: () => import("@/views/workbench/home")
    },
    {
      path: "/workbench/product",
      name: "product",
      meta: {
        title: "商品管理",
        icon: "el-icon-document"
      },
      component: () => import("@/layout/main"),
      children: [
        {
          path: "/product/list",
          name: "list",
          meta: {
            title: "商品列表"
          },
          component: () => import("@/views/workbench/product/list")
        },
        {
          path: "/product/add",
          name: "add",
          component: () => import("@/views/workbench/product/add")
        },
        {
          path: "/product/classify",
          name: "classify",
          meta: {
            title: "分类管理"
          },
          component: () => import("@/views/workbench/product/classify")
        }
      ]
    }
  ]
};
