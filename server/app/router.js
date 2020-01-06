"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    //首页
    router.get("/api/carousel", controller.home.getCarousel);
    router.get("/api/navigator", controller.home.getNavigator);
    router.get("/api/home_classify", controller.home.classify);
    router.get("/api/home_products", controller.home.products);
    //商品详情
    router.get("/api/product_detail", controller.home.detail);
    //登录、用户信息
    router.get("/api/user/send_msg_code", controller.user.send_msg_code);
    router.post("/api/user/login", controller.user.login);
    router.get("/api/user/info", controller.user.info);
    //地址
    router.post("/api/user/address", controller.user.address);
    router.post("/api/user/edit_address", controller.user.edit_address);
    router.post("/api/user/remove_address", controller.user.remove_address);
    router.get("/api/user/address_list", controller.user.address_list);
    //分类
    router.get("/api/classify/menu", controller.classify.menu);
    router.get("/api/classify/products", controller.classify.products);
    //购物车
    router.get("/api/shopcart/list", controller.shopcart.list);
    router.post("/api/shopcart/add", controller.shopcart.add);
    router.post("/api/shopcart/update", controller.shopcart.update);
    //订单
    router.post("/api/order/add", controller.order.add);

    //管理员
    router.post("/api/admin/login", controller.admin.login);
    router.get("/api/admin/info", controller.admin.info);
    router.get("/api/carousel/list", controller.carousel.list);
    //上传图片,增加轮播图
    router.post("/api/upload", controller.carousel.upload);
    router.post("/api/carousel/add", controller.carousel.add);
    //商品管理
    router.get("/api/product/list", controller.product.list);
    //
    router.get("*", controller.render.render);
};
