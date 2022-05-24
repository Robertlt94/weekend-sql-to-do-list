$( document ).ready( onReady );

// on ready, run function onReady

function onReady(){
    console.log( 'Client.js is up!' );
    getTaskMaster();
    // when the completed button is clicked in the taskOut list, run taskCompleted
    $( '#taskOut' ).on( 'click', '.completedButton', taskCompleted );
    $( '#taskOut' ).on( 'click', '.deleteButton', deleteTask );
    $( '#submitTaskButton' ).on( 'click', newTask )
}

// GET task route
function getTaskMaster(){
    console.log( 'in getTaskMaster' );
    // AJAX GET call to /taskMaster
    $.ajax({
        method: 'GET',
        url: '/taskMaster'
    }).then( function( response ){
        // test if it pulls response from route
        console.log( response );
        // append to DOM
        let el = $( '#taskOut' );
        el.empty();
        for( i=0; i<response.length; i++ ){
            // // turn yellow if completed
            // if ( response[i].completed === true ){
            //     turnYellow();
            //     return el.append( `<li class="oneTask">
            //         <h3>Task: </h3>${ response[i].task_description } 
            //         <h3>Completed: </h3> &#1004;
            //         <h3>Date Completed By: </h3>${ response[i].date_completed } <br>
            //         <button class="removeButton" data-id="${ response[i].id }">Delete?</button>` )
            // } else {
            //     return 
            el.append( `<li class="oneTask">
                <h3>Task: </h3>${ response[i].task_description } 
                <h3>Completed: </h3>${ response[i].completed }
                <h3>Date Completed By: </h3>${ response[i].date_completed } <br>
                <button class="completedButton" data-id="${ response[i].id }">Complete</button> <br>
                <button class="deleteButton" data-id="${ response[i].id }">Delete</button>
                </li>` )
            turnYellow();
            }
    }).catch( function( err ){
        console.log( err );
        alert( 'GET Route Error' )
    })
}

// DELETE task route
function deleteTask(){
    console.log( 'in taskCompleted: ', $( this ).data( 'id' ) );
    //insert sweetalert prompt
    sweetAlert({
        title: "Are you sure?",
        text: "This will be... gone... FOREVER!",
        icon: "warning",
        buttons: true,
        danerMode: true,
    }).then( ( willDelete )=>{
        if ( willDelete ){
            sweetAlert( "Gone! It's gone forever! <(T.T)>" ), {
                icon: "success",
            }
            // delete AJAX route
            $.ajax({
                method: 'DELETE',
                url: `/taskMaster?id=${ $( this ).data( 'id' ) }`
            }).then( function( response ){
                console.log( response );
                getTaskMaster();
            }).catch( function( err ){
                console.log( err );
                res.sendStatus( 500 );
            })
        } else {
            sweetAlert( "Thank you for showing this task some mercy!")
        }
    })
}

// UPDATE boolean function
function taskCompleted(){
    console.log( 'in taskCompleted: ', $( this ).data( 'id' ) );
    let today = new Date();
    let dd = String( today.getDate() ).padStart(2, '0');
    let mm = String( today.getMonth() + 1 ).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    sweetAlert( "Yay!", `Task Completed on: ${ today }`, {
        button: "Great Job!",
    });
    // put AJAX route
    $.ajax({
        method: 'PUT',
        url: `/taskMaster?id=${ $( this ).data( 'id' ) }`
    }).then( function ( response ){
        console.log( response );
        getTaskMaster();
    }).catch( function( err ){
        console.log( err );
        res.sendStatus( 500 );
    })    
}

// POST task route
function newTask(){
    console.log( 'More Work!' )
    // record user input into an object
    let taskToSend = {
        task_description: $( '#taskDescriptionIn' ).val(),
        completed: false,
        date_completed: ''
    }
    console.log( 'Sending: ', taskToSend );
    $.ajax({
        method: 'POST',
        url: `/taskMaster`,
        data: taskToSend
    }).then( function( response ){
        console.log( 'back from /taskMaster POST: ', response );
        // display on the DOM
        getTaskMaster();
        //empty input field;
        $( '#taskDescriptionIn' ).val( '' );
    }).catch( function( err ){
        console.log( err );
        alert( 'POST route Error' );
    })

}

function turnYellow() {
    $( this ).parent().css( { 'background-color':'yellow' } );
}