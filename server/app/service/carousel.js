"use strict";

const Service = require("egg").Service;
const fs = require("fs");
const path = require("path");
class CarouselService extends Service {
    async list({ page, pageSize }) {
        const res = await this.app.mysql.query("select count(*) from carousel");
        const count = res[0]["count(*)"];
        const data = await this.app.mysql.select("carousel", {
            limit: pageSize * 1,
            offset: pageSize * page
        });
        return {
            data,
            count
        };
    }
    async upload({ filename, filepath }) {
        const filedata = fs.readFileSync(filepath);
        const writepath = path.join(
            process.cwd(),
            "app/public/images",
            filename
        );
        const err = fs.writeFileSync(writepath, filedata);
        return {
            err,
            url: "images/" + filename
        };
    }
    async add({ imgUrl, title, link, startTime, endTime }) {
        return this.app.mysql.insert("carousel", {
            imgUrl: `http://169.254.191.166:7001/public/${imgUrl}`,
            title,
            link,
            startTime,
            endTime
        });
    }
}

module.exports = CarouselService;
