const nameDataBaseCommand = require("../commands/nameDataBase.command")
const nameTableCommand = require("../commands/nameTable.command")
const readFileCommand = require("../commands/readFile.command")


/**
 * @typedef {Object} Migration
 * @property {Object<name:String,path:String>} db
 * @property {Array<Object<name:String,path:String>>} tables 
 */

/**@type {Migration}  */
const migration = {
    db: { name: "", path: "" },
    tables: []
}

/**
 * 
 * @param {String[]} files 
 * @returns {Migration}
 */
const readFilesService = (files) => {

    files.forEach(file => {

        const [data, error] = readFileCommand(file)

        if (error) return

        nameDataBaseCommand.apply(migration, [data, file])
        nameTableCommand.apply(migration, [data, file])

    });

    return migration;
}

module.exports = readFilesService