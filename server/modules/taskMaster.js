// call on express
const express = require( 'express' );
const router = express.Router();
const pool = require( './pool' );

// routes

// get route
router.get( '/', ( req, res )=>{
    console.log( '/taskMaster GET' );
    // res.send( 'taskMaster' );
    let queryString = `SELECT * FROM task_manager`;
    pool.query( queryString ).then( ( results )=>{
        res.send( results.rows );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})

// delete route
router.delete( '/', ( req, res )=>{
    console.log( '/taskMaster DELETE: ', req.query );
    let queryString = `DELETE FROM task_manager WHERE id=$1`;
    let values = [ req.query.id ];
    pool.query( queryString, values ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
    // res.send( 'POOF!' )
})

// put route
router.put( '/', ( req, res )=>{
    console.log( '/taskMaster PUT: ', req.query );
    let queryString = `UPDATE task_manager SET completed=true, date_completed=CURRENT_TIMESTAMP WHERE id=$1;`;
    let values = [ req.query.id ];
    pool.query( queryString, values ).then( ( result )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})

// post route
router.post( '/', ( req, res )=>{
    console.log( '/taskMaster POST: ', req.query );
    let queryString = `INSERT INTO task_manager (task_description, completed, date_completed ) VALUES ( $1, $2, $3);`
    let values = [ req.body.task_description, req.body.completed, req.body.date_completed ];
    pool.query( queryString, values ).then( ( result )=>{
        res.sendStatus( 201 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})

module.exports = router;