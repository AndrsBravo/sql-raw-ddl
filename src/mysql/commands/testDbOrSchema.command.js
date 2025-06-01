const IS_DB_OR_SCHEMA_REGEXP = /^CREATE\s+(DATABASE|SCHEMA)/i

const isDataBaseOrSchemaCommand = (data) => {

    return IS_DB_OR_SCHEMA_REGEXP.test(data);

}

module.exports = isDataBaseOrSchemaCommand