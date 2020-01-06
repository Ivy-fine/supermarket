"use strict";

const Controller = require("egg").Controller;

class ShopcartController extends Controller {
    async list() {
        const info = this.ctx.info;
        const data = await this.ctx.service.shopcart.list(info.id);
        this.ctx.body = {
            code: 1,
            data
        };
    }
    async add() {
        const { ctx } = this;
        try {
            const info = ctx.info;
            await this.ctx.service.shopcart.add({
                ...ctx.request.body,
                user_id: info.id
            });
            ctx.body = {
                code: 1,
                msg: "添加成功"
            };
        } catch (e) {
            ctx.throw(422, "添加失败");
        }
    }
    async update() {
        const { ctx } = this;
        try {
            await ctx.service.shopcart.update(ctx.request.body);
            ctx.body = {
                code: 1,
                msg: "更新成功"
            };
        } catch (e) {
            ctx.throw(422, "更新失败");
        }
    }
}

module.exports = ShopcartController;
