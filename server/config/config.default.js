/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {});

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + "_1573603209918_9659";

    // add your middleware config here
    config.middleware = ["error", "authorization"];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
        mysql: {
            // database configuration
            client: {
                // host
                host: "localhost",
                // port
                port: "3309",
                // username
                user: "root",
                // password
                password: "123456",
                // database
                database: "supermarket"
            },
            // load into app, default is open
            app: true,
            // load into agent, default is close
            agent: false
        },
        session: {
            key: "SESSION_ID",
            maxAge: 1000 * 60,
            httpOnly: true,
            encrypt: true
        },
        security: {
            csrf: {
                enable: false
            }
        },
        multipart: {
            mode: "file"
        }
    };

    return {
        ...config,
        ...userConfig
    };
};
