"use strict";

const Controller = require("egg").Controller;

class CarouselController extends Controller {
    async list() {
        const { ctx } = this;
        try {
            const res = await this.ctx.service.carousel.list(ctx.request.query);
            ctx.body = {
                code: 1,
                msg: "查询成功",
                data: res.data,
                count: res.count
            };
        } catch (e) {
            ctx.throw(422, "查询失败");
        }
    }
    async add() {
        const { ctx } = this;
        try {
            await this.ctx.service.carousel.add(ctx.request.body);
            ctx.body = {
                code: 1,
                msg: "添加成功"
            };
        } catch (e) {
            ctx.throw(422, "添加失败");
        }
    }
    async upload() {
        // console.log(this.ctx.request.files[0]);
        const result = await this.ctx.service.carousel.upload(
            this.ctx.request.files[0]
        );
        if (!result.err) {
            this.ctx.body = {
                code: 1,
                msg: "上传成功",
                url: result.url
            };
        } else {
            this.ctx.body = {
                code: 0,
                msg: "上传失败"
            };
        }
    }
}

module.exports = CarouselController;
