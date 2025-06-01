const isDataBaseOrSchemaCommand = require("./testDbOrSchema.command");

const EXTRACT_DB_NAME_REG_EXP = /(?:(?<=if\s+not\s+exists\s+`?)[\w]+(?=`?\s*\n*)|((?<=(?:database|schema)(?!\s+if\s+not\s+exists\s+)\s+`?))[\w]+(?=`?\s*\n*))/i
/**
 * 
 * @param {String} data 
 * @param {String} file 
 */
function nameDataBaseCommand(data, file) {
    if (isDataBaseOrSchemaCommand(data))
        this.db = { name: data.match(EXTRACT_DB_NAME_REG_EXP)[0], path: file }
}

module.exports = nameDataBaseCommand