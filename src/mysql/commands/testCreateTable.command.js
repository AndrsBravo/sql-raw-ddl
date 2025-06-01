
const CREATE_TABLE_REG_EXP = /^\s*CREATE\s+(TEMPORARY)*\s*TABLE/i

const isCreateTableCommand = (data) => {

    return CREATE_TABLE_REG_EXP.test(data)

}

module.exports = isCreateTableCommand

