const fs = require("fs")
/**
 * 
 * @param {String} file 
 * @returns {[String,Error]}
 */
function readFileCommand(file) {

    try {
        const data = fs.readFileSync(file, { encoding: "utf-8" })
        return [data, error = null]
    }
    catch (e) {

        return [data = null, e]
    }


}

module.exports = readFileCommand