"use strict";

const Service = require("egg").Service;

class OrderService extends Service {
    async list(id) {}
    async add({ address_id, user_id, list_id, ...rest }) {
        return this.app.mysql.insert("order", {
            address_id,
            user_id,
            list_id,
            ...rest
        });
    }
    async update({ id, ...rest }) {
        return this.app.mysql.update("order", { id, ...rest });
    }
}

module.exports = OrderService;
