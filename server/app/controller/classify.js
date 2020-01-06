"use strict";

const Controller = require("egg").Controller;

function arrayToTree(data, parentkey) {
    let dataJson = {};
    let newData = [];
    data.forEach(item => {
        dataJson[item.id] = item;
    });
    data.forEach(item => {
        if (item[parentkey] === 0) {
            newData.push(item);
        } else {
            const parent = dataJson[item[parentkey]];
            if (parent.children) {
                parent.children.push(item);
            } else {
                parent.children = [item];
            }
        }
    });
    return newData;
}
//type类型id,data类型树状数据
function getProducts(data, type, has = false) {
    let ids = [];
    if (!data) return [];
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.id === type * 1) {
            if (item.children) {
                ids = ids.concat(getProducts(item.children, type * 1, true));
            } else {
                ids.push(item.id);
            }
            break;
        } else {
            if (has && !item.children) {
                ids.push(item.id);
            } else if (has && item.children) {
                ids = ids.concat(getProducts(item.children, type * 1, true));
            } else {
                ids = ids.concat(getProducts(item.children, type * 1, false));
            }
        }
    }
    return ids;
}
class ClassifyController extends Controller {
    async menu() {
        const { ctx } = this;
        const classify = await ctx.service.classify.classify();
        const data = arrayToTree(classify, "parent_id");
        ctx.body = {
            code: 1,
            data
        };
    }
    async products() {
        const { ctx } = this;
        const { type } = ctx.request.query;
        const classify = await ctx.service.classify.classify();
        const ids = getProducts(arrayToTree(classify, "parent_id"), type);
        const data = await ctx.service.classify.products({
            ids,
            ...ctx.request.query
        });
        ctx.body = {
            code: 1,
            data
        };
    }
}

module.exports = ClassifyController;
