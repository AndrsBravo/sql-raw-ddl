const connectionPool = require("../db.connection")

class Repository {

    /**@private
     * @type {PoolConnection}
     */
    #connection;

    async  #connect() {
        if (!this.#connection)
            this.#connection = await connectionPool.getConnection()
    }

    /**
     * 
     * @param {string} query 
     * @param  {...String} params 
     * @returns {[Object[],import("mysql2").QueryError]}
     */
    async execute(query) {

        try {

            await this.#connect()
            const [result] = await this.#connection.execute(query)
            return [result, null]

        } catch (e) {
            this.disconnect();
            return [null, e]
        }

    }

    /**
     * 
     * @param {string} query 
     * @param  {...String} params 
     * @returns {[Object[],Error]}
     */
    async testConnection(...params) {

        const query = "SELECT schema_name FROM information_schema.schemata WHERE schema_name = ?"

        try {

            await this.#connect();

            const [result] = await this.#connection.execute(query, params)
            return [{ result, db: this.#connection.config.database }, null]

        } catch (e) {

            this.disconnect();
            return [null, e]

        }



    }

    disconnect() {

        if (this.#connection) {
            this.#connection?.release()
            this.#connection?.destroy()
        }
        console.log(": Db Connection Finished!!");
    }

}

module.exports = new Repository()