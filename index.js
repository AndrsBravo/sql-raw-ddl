const mysqlDdlConfig = require("./src/mysql/index")
const path = require("path")

const migrate = mysqlDdlConfig({
    path: path.resolve(__dirname, "./src/query"),
})

migrate();

