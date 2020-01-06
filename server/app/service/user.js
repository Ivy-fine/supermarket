"use strict";

const Service = require("egg").Service;

class UserService extends Service {
    async send_msg_code() {
        let msg_code = "";
        function getStr() {
            return Math.floor(Math.random() * 9);
        }
        for (let i = 0; i < 6; i++) {
            msg_code += getStr();
        }
        return msg_code;
    }
    async findUser(phone) {
        const $sql = "select * from user where phone=" + phone;
        return this.app.mysql.query($sql);
    }
    async insertUser(phone) {
        const $sql = `insert into user (phone) value ('${phone}')`;
        return this.app.mysql.query($sql);
    }
    async address({ name, telephone, address, detail, user_id }) {
        const $sql = `insert into address (name,telephone,address,detail,user_id) value (?,?,?,?,?)`;
        const $params = [name, telephone, address, detail, user_id];
        return this.app.mysql.query($sql, $params);
    }
    async address_list(id) {
        const $sql = `select * from address where user_id=${id}`;
        return this.app.mysql.query($sql);
    }
    async edit_address({ name, telephone, address, detail, id }) {
        const $sql = `update address set name=?,telephone=?,address=?,detail=? where id=${id}`;
        const $params = [name, telephone, address, detail];
        return this.app.mysql.query($sql, $params);
    }
    async remove_address(id) {
        const $sql = `delete from address where id=${id}`;
        return this.app.mysql.query($sql);
    }
}

module.exports = UserService;
