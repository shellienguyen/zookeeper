const path = require( "path" );
const express = require( "express" );
const PORT = process.env.PORT || 3001;
const logger = require( "morgan" );
const apiRoutes = require( "./routes/apiRoutes" );
const htmlRoutes = require( "./routes/htmlRoutes" );

//Instantiate the server
const app = express();

app.use( logger( "dev" ));

/*
Make the files in "public" static resources.  This means that all of the
front-end code can now be accessed without having a specific server endpoint
created for it.
*/
app.use( express.static( "public" ));

/***********************************************
Both of the below app.use middleware functions need to be set up every time we create a server
that's looking to accept POST data.
***********************************************/

/* 
Parse incoming string or array data
This method is built into Express.js.  It takes incoming POST data and converts it to key/value
pairings tht can be accessed in the req.body object.  The "extended: true" option informs our
server that there may be sub-array data nested in it as well, so it needs to look as deep into the
POST data as possible to parse all of the data correctly.
 */
app.use( express.urlencoded({ extended: true }));

/*
Parse incoming JSON data.
Takes incoming POST data in the form of JSON and parses it into the req.body JavaScript object.
*/
app.use( express.json());

app.use( "/api", apiRoutes );
app.use( "/", htmlRoutes );
 
// Listen for requests
app.listen( PORT, () => {
   console.log( `API server now on port ${PORT}!` );
});