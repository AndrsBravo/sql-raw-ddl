const isCreateTableCommand = require("./testCreateTable.command")

const EXTRACT_TABLE_NAME_REG_EXP = /(?<=`*)[\w]+(?=`*\s*\()/

const createTableRegExp = /^\s*create\s+(temporary\s+)?table\s+(\s*if\s+not\s+exists\s+)?(?:[\w]+|`?[\w]+`?\s*\(|`?[\w]+`?\.`?[\w]+`?\s*\()/i
const fkRegExp = /(foreign\s+key)/i
const referencesRegExp = /(?<=references\s+`)[\w]+(?=`)/i


function nameTableCommand(data, file) {

    if (isCreateTableCommand(data))
        this.tables.push({ name: EXTRACT_TABLE_NAME_REG_EXP.exec(data)[0], path: file })

}

module.exports = nameTableCommand