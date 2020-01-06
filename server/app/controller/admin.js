"use strict";
const jwt = require("jsonwebtoken");
const Controller = require("egg").Controller;

function getToken(ctx, user) {
    const token = jwt.sign({ ...user }, "fjn", {
        expiresIn: 1000 * 60
    });
    ctx.cookies.set("adminToken", token, {
        httpOnly: false
    });
}
class AdminController extends Controller {
    async login() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;
        const admin = await ctx.service.admin.findUser(username, password);
        if (admin) {
            getToken(ctx, admin);
            ctx.body = {
                code: 1,
                msg: "login success"
            };
        } else {
            ctx.body = {
                code: 0,
                msg: "用户名或密码错误"
            };
        }
    }
    async info() {
        const info = this.ctx.info;
        this.ctx.body = {
            code: 1,
            data: info
        };
    }
}

module.exports = AdminController;
