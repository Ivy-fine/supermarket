"use strict";

const Service = require("egg").Service;

class ClassifyService extends Service {
    async classify() {
        return this.app.mysql.select("classify");
    }
    async products({ ids, page, pageSize, price, sales }) {
        let orders = [];
        if (price) orders.push(["price", price]);
        if (sales) orders.push(["sales", sales]);
        if (!price && !sales)
            orders = [
                ["price", "asc"],
                ["sales", "desc"]
            ];
        return this.app.mysql.select("product", {
            where: {
                classify_id: ids
            },
            limit: pageSize * 1,
            offset: page * pageSize,
            orders: orders
        });
    }
}

module.exports = ClassifyService;
