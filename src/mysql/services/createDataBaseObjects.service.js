const readFileCommand = require("../commands/readFile.command");
const repository = require("../repository/execute.repository")

"ts-checks"

/**
 * 
 * @param {Migration} migration 
 * @param {import("..").MysqlDdlConfiguration} configuration
 */
const createDbObjectsService = async (migration, configuration) => {

    console.group("MIGRATING:");

    console.group("-", "Open Connection");
    const [sqlResponse, error] = await repository.testConnection(migration.db.name)

    if (error) {
        console.error(":", error.errno, error.sqlMessage || error.message);
        console.error(":", "While trying to 'open db connection'");
        return
    }

    if (sqlResponse.result.length)
        console.log(":", "Data Base already created", sqlResponse.result);

    if (!sqlResponse.db)
        console.log(":", "The connection does not have a defined db ");

    console.groupEnd()
    console.group("-", "Reading database query from file: ", migration.db.path.substring(1 + migration.db.path.lastIndexOf("\/")));
    const [dbQuery, err] = readFileCommand(migration.db.path)
    if (err) {
        console.group(String.fromCodePoint(0x274c), err.code)
        console.error(":", err.message)
        console.groupEnd()
        repository.disconnect()
        return
    }


    console.log(":", "File read successfully!");
    console.log(":", "Creating data base");
    const [cDbResult, cDbError] = await repository.execute(dbQuery)

    if (cDbError) {
        console.group(String.fromCodePoint(0x274c), cDbError.errno);
        console.error(cDbError.sqlMessage);
        console.groupEnd()
    }

    if (cDbResult) {
        console.log(":", "Data base created successfully!");
        //  console.log(cDbResult);

    }
    console.groupEnd();

    if (1 > migration.tables.length) return


    console.group("-", `Migrating ${migration.tables.length} tables`);

    //Setting DB_OPTIONS params
    console.group("-", "Setting DB Options");
    const [optionsResult, orErr] = await repository.execute(`SET FOREIGN_KEY_CHECKS=0;`)

    if (orErr) {
        console.error(":", orErr.errno, orErr.sqlMessage);
        return;
    }

    console.log(":", "Db options settled successfully!");
    console.groupEnd()

    console.group("-", "Choosing current db ", migration.db.name)

    const [choResult, choErr] = await repository.execute(`USE ${migration.db.name};`)

    if (choErr) {
        console.error(":", choErr.errno, choErr.sqlResponse || choErr.message);
        console.error("-", "While choosing current db ", migration.db.name)

        console.groupEnd()
        return
    }

    console.groupEnd()

    /*
        for (const table of migration.tables) {
    
            console.group("-", "Creating data table: ", table.name);
    
            console.group(":", "Reading sql query file:");
            const [tableQuery, err] = readFileCommand(table.path)
    
            if (err) {
                console.error(":", err.code, ":");
                console.error(":", err.message, ":");
                console.error(":", `Error while trying to read file \n'${table.path.substring(1 + table.path.lastIndexOf("/"))}'`);
                console.groupEnd()
                console.groupEnd()
                continue
            }
    
            console.log(":", "File read successfully!");
            console.groupEnd()
    
            console.group(":", "Executing create query on data base");
    
            const [createResult, createErr] = await repository.execute(tableQuery)
    
            if (createErr) {
                console.error(":", `${createErr.errno} ${createErr.sqlMessage}`);
                console.error(":", `While trying to create '${table.name}' table on data base`);
                console.groupEnd()
                console.groupEnd()
                break
            }
    
            console.log(":", `Table '${table.name}' has been successfully created on data base!`);
            console.groupEnd();
            console.groupEnd();
        };
    */
    console.group("-", "Setting DB Options back");
    const [optionsResult1, orErr1] = await repository.execute(`SET FOREIGN_KEY_CHECKS=1;`)

    if (orErr1) {

        console.error(":", `${orErr1.errno} ${orErr1.sqlMessage}`);
        console.error(":", `While trying to set options back on data base`);
        console.groupEnd()
        return

    }
    console.log(":", "DB Options settled back successfully!");

    console.groupEnd()

}

module.exports = createDbObjectsService