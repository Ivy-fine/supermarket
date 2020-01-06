"use strict";

const Service = require("egg").Service;

class ShopService extends Service {
    async list(id) {
        const $sql = `
            select 
                s.*,
                p.name,
                p.cover,
                p.price
            from 
                shopcart s 
                left join product p on s.product_id = p.id 
            where s.user_id=${id}
        `;
        return this.app.mysql.query($sql);
    }
    async getItem(user_id, product_id) {
        return this.app.mysql.get("shopcart", { user_id, product_id });
    }
    async add({ num, product_id, user_id }) {
        const productItem = await this.getItem(user_id, product_id);
        if (productItem) {
            return this.update({
                id: productItem.id,
                num: productItem.num + num * 1
            });
        } else {
            return this.app.mysql.insert("shopcart", {
                num,
                product_id,
                user_id
            });
        }
    }
    async update({ id, ...rest }) {
        if (rest.num === 0) {
            return this.app.mysql.delete("shopcart", { id });
        }
        return this.app.mysql.update("shopcart", { id, ...rest });
    }
}

module.exports = ShopService;
