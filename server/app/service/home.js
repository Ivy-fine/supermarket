"use strict";

const Service = require("egg").Service;

class HomeService extends Service {
    async getCarousel() {
        const $sql = "select * from carousel where statu=1";
        return this.app.mysql.query($sql);
    }
    async getNavigator() {
        const $sql = "select * from navigator";
        return this.app.mysql.query($sql);
    }
    async productsId(id) {
        const productsId = await this.app.mysql.get("home_classify", { id });
        return productsId.products;
    }
    async classify() {
        return this.app.mysql.select("home_classify");
    }
    async products(type, page, pageSize) {
        const productsId = await this.productsId(type);
        return this.app.mysql.select("product", {
            where: {
                id: productsId.split(",")
            },
            limit: pageSize * 1,
            offset: page * pageSize
        });
    }
    async detail(id) {
        return this.app.mysql.get("product", { id });
    }
}

module.exports = HomeService;
