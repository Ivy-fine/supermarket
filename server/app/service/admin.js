"use strict";

const Service = require("egg").Service;

class AdminService extends Service {
    async findUser(username, password) {
        return this.app.mysql.select("admin", {
            where: { username, password }
        });
    }
}

module.exports = AdminService;
