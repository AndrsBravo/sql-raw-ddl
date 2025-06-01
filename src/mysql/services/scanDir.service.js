
const fs = require("fs")
const path = require("path");
/**
 * 
 * @param {import("../default.config").MysqlDdlConfiguration} configuration 
 * @returns {String[]}
 */
const scanDirService = (configuration) => {

    let sqlFiles = [];
    const dir = configuration.path;

    const dirList = fs.readdirSync(dir, { withFileTypes: true });

    function findSqlFiles(dir, list) {

        list.forEach(item => {

            if (/\.sql$/.test(item.name)) sqlFiles.push(path.resolve(dir, item.name));
            if (item.isDirectory()) findSqlFiles(path.resolve(dir, item.name), fs.readdirSync(path.resolve(dir, item.name), { withFileTypes: true }));

        });

    }


    findSqlFiles(dir, dirList);

    return sqlFiles

}

module.exports = scanDirService