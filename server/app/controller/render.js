"use strict";

const Controller = require("egg").Controller;
const fs = require("fs");
const path = require("path");
class RenderController extends Controller {
    async render() {
        const htmlpath = path.join(process.cwd(), "app/public/dist/index.html");
        const data = await fs.readFileSync(htmlpath, "utf-8");
        this.ctx.body = data;
    }
}

module.exports = RenderController;
