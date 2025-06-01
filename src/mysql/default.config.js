const path = require("path")

/**@type {MysqlDdlConfiguration} */
const defaultConfig = {
    path: path.resolve(process.cwd(), "./src"),
    mysql: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: ""
    }
};

/** @param {MysqlDdlConfiguration} configuration  */
const setConfiguration = (configuration) => {

    return { ...defaultConfig, ...configuration }

}

module.exports = setConfiguration