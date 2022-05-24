// require express
const express = require( 'express' );
// create an express app
const app = express();
// call upon bodyParser
const bodyParser = require( 'body-parser' );
const taskMaster = require( './modules/taskMaster' );


// uses
app.use( express.static( 'server/public' ) )
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( '/taskMaster', taskMaster );


// globals
const port = 5001


// spin up server
app.listen( port, ()=>{
    console.log( 'server up on port: ', 5001 );
})