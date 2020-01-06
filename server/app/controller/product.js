"use strict";
const Controller = require("egg").Controller;
class ProductController extends Controller {
    async list() {
        const { ctx } = this;
        const { page, pageSize } = ctx.request.query;
        const data = await ctx.service.product.list(page, pageSize);
        ctx.body = {
            code: 1,
            data
        };
    }
}

module.exports = ProductController;
