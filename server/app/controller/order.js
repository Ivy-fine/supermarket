"use strict";

const Controller = require("egg").Controller;

class OrderController extends Controller {
    async add() {
        const { ctx } = this;
        try {
            const info = ctx.info;
            await this.ctx.service.order.add({
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
}

module.exports = OrderController;
