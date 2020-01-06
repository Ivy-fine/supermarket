"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
    async getCarousel() {
        const { ctx } = this;
        const data = await this.ctx.service.home.getCarousel();
        ctx.body = {
            code: 1,
            data
        };
    }
    async getNavigator() {
        const { ctx } = this;
        const data = await this.ctx.service.home.getNavigator();
        ctx.body = {
            code: 1,
            data
        };
    }
    async classify() {
        const data = await this.ctx.service.home.classify();
        this.ctx.body = {
            code: 1,
            data
        };
    }
    async products() {
        const { type, page, pageSize } = this.ctx.request.query;
        const data = await this.ctx.service.home.products(type, page, pageSize);
        this.ctx.body = {
            code: 1,
            data
        };
    }
    async detail() {
        const { ctx } = this;
        const { id } = ctx.request.query;
        const data = await ctx.service.home.detail(id);
        ctx.body = {
            code: 1,
            data
        };
    }
}

module.exports = HomeController;
