"use strict";
const jwt = require("jsonwebtoken");

const authenticationList = [
    "/api/user/info",
    "/api/user/address",
    "/api/shopcart/list",
    "/api/shopcart/add",
    "/api/order/add",
    "/api/admin/info"
];

module.exports = () => {
    return async (ctx, next) => {
        try {
            if (authenticationList.indexOf(ctx.request.path) !== -1) {
                const token =
                    ctx.cookies.get("token") || ctx.cookies.get("adminToken");
                const info = jwt.verify(token, "fjn");
                ctx.info = info[0];
                await next();
            } else {
                await next();
            }
        } catch (e) {
            console.log(e);
            ctx.throw(401, "登陆状态无效");
        }
    };
};
