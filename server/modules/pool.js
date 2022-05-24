const pg = require( 'pg' );
const pool = new pg.Pool({
    // hosted locally, for now.
    host: "localhost",
    // name of db in postico
    database: "weekend-to-do-app",
    // default pool port
    port: 5432,
    // max connections
    max: 20,
    // connection timeout
    idleTimeoutMillis: 30000
});

module.exports = pool;