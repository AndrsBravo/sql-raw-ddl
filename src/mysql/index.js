const setConfiguration = require("./default.config");
const createDbObjectsService = require("./services/createDataBaseObjects.service");
const readFilesService = require("./services/readFiles.service");
const scanDirService = require("./services/scanDir.service");

/**
 * @typedef {MySqlConnectionOptions}
 * @property {String} host 
 * @property {Number} port 
 * @property {String} user DataBase User
 * @property {String} password
 * @property {String} [database]
*/

/**
 *@typedef {Object} MysqlDdlConfiguration
 *@property {MySqlConnectionOptions} mysql
 *@property {String} [path] `.sql` files location, if omitted will scan all project.
 */

/**@type {MysqlDdlConfiguration} */
let configuration;

const migrate = () => {

    const sqlFiles = scanDirService(configuration);
    const dbStructure = readFilesService(sqlFiles)
    createDbObjectsService(dbStructure)


}



/**
 * Create a migration instance
 * @param {MysqlDdlConfiguration} config 
 */
const mysqlDdlConfig = (config) => {

    configuration = setConfiguration(config)
    return migrate

}

module.exports = mysqlDdlConfig