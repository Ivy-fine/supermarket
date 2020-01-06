"use strict";
const jwt = require("jsonwebtoken");
const Controller = require("egg").Controller;

function getToken(ctx, user) {
    const token = jwt.sign({ ...user }, "fjn", {
        expiresIn: 1000 * 60
    });
    ctx.cookies.set("token", token, {
        httpOnly: false
    });
}
class UserController extends Controller {
    async send_msg_code() {
        const { ctx } = this;
        const { phone } = ctx.request.query;
        const msg_code = await this.ctx.service.user.send_msg_code(phone);
        ctx.session.msg_code = msg_code;
        ctx.session.phone = phone;
        ctx.body = {
            code: 1,
            msg: `验证码[${msg_code}已发送到[${phone}]]`
        };
    }
    async login() {
        const { ctx } = this;
        const { msg_code, phone } = ctx.request.body;
        if (msg_code === ctx.session.msg_code && phone === ctx.session.phone) {
            const user = await ctx.service.user.findUser(phone);
            if (user.length > 0) {
                getToken(ctx, user);
                ctx.body = {
                    code: 1,
                    msg: "login success"
                };
            } else {
                await ctx.service.user.insertUser(phone);
                const user = await ctx.service.user.findUser(phone);
                getToken(ctx, user);
                ctx.body = {
                    code: 1,
                    msg: "login&registry success"
                };
            }
        } else {
            ctx.throw(422, "验证码错误");
        }
    }
    async info() {
        const info = this.ctx.info;
        this.ctx.body = {
            code: 1,
            data: info
        };
    }
    async address() {
        const info = this.ctx.info;
        const result = await this.ctx.service.user.address({
            ...this.ctx.request.body,
            user_id: info.id
        });
        this.ctx.body = {
            code: 1,
            msg: "添加地址成功"
        };
    }
    async address_list() {
        const { id } = this.ctx.request.query;
        const data = await this.ctx.service.user.address_list(id);
        this.ctx.body = {
            code: 1,
            data
        };
    }
    async edit_address() {
        try {
            await this.ctx.service.user.edit_address(this.ctx.request.body);
            this.ctx.body = {
                code: 1,
                msg: "修改成功"
            };
        } catch (e) {
            this.ctx.throw(e, e.message);
        }
    }
    async remove_address() {
        const { id } = this.ctx.request.body;
        await this.ctx.service.user.remove_address(id);
        this.ctx.body = {
            code: 1,
            msg: "删除成功"
        };
    }
}

module.exports = UserController;
