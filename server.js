const { animals } = require( './data/animals' );
const express = require( "express" );
const fs = require( "fs" );
const path = require( "path" );
const PORT = process.env.PORT || 3001;

//Instantiate the server
const app = express();

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

function filterByQuery( query, animalsArray ) {
   let personalityTraitsArray = [];

   // Save the animalsArray as filteredResults here
   let filteredResults = animalsArray;

   if ( query.personalityTraits ) {
      // Save personalityTraits as a dedicated array.
      // If personalityTraits is a string, place it into a new array and save.
      if ( typeof query.personalityTraits === "string" ) {
         personalityTraitsArray = [ query.personalityTraits ];
      }
      else {
         personalityTraitsArray = query.personalityTraits;
      };
   };
  
   // Loop through each trait in the personalityTraits array:
   personalityTraitsArray.forEach( trait => {
      /*
      check the trait againt each animal in the filteredResults array.
      Remember, it is initially a copy of the animalsArray,
      but here, we are updating it for each trait in the .forEach() loop.
      For each trait being targeted by the filter, the filteredResults
      array will then contain only the entries that contain the trait,
      so at the end we'll have an array of animals that have every one
      of the traits when the .forEach() loop is finished.
      */
     filteredResults = filteredResults.filter( animal => animal.personalityTraits.indexOf( trait ) !== -1 );
   });

   if ( query.diet ) {
      filteredResults = filteredResults.filter( animal => animal.diet === query.diet );
   };

   if ( query.species ) {
      filteredResults = filteredResults.filter( animal = animal.species === query.species );
   };

   if ( query.name ) {
      filteredResults = filteredResults.filter( animal => animal.name === query.name );
   };

   return filteredResults;
};

function findById( id, animalsArray ) {
   const result = animalsArray.filter( animal => animal.id === id )[0];
   return result;
};

function createNewAnimal( body, animalsArray ) {
   console.log( body );
   
   const animal = body;
   animalsArray.push( animal );
   
   // fs.writeFileSync() is the synchronous version of fs.writeFile()
   // and doesn't require a callback function
   fs.writeFileSync(
      /*
      We want to write to our animals.json file in the data subdirectory,
      so we use the method path.join() to join the value of __dirname,
      which represents the directory of the file we execute the code in
      with the path to the animals.json file.
      */
      path.join( __dirname, "./data/animals.json" ),

      /*
      Need to save the JavaScript array data as JSON, use stringify to convert it.
      The null argument means we don't want to edit any of our existing data, if we
      did, we would pass something in there.  The 2 indicates we want to create white
      space between our values to make it more readable.  Leaving our the last two 
      arguments makes the animal.json hard to read.
      */
      JSON.stringify({ animals: animalsArray }, null, 2 )
   );

   return animal;
};

/*
Run the properties of the content from req.body through a series of validation
checks.  If any is falese, return false and not create the animal data.
*/
function validateAnimal( animal ) {
   if ( !animal.name || typeof animal.name !== "string" ) {
      return false;
   };

   if ( !animal.species || typeof animal.species !== "string" ) {
      return false;
   };

   if ( !animal.diet || typeof animal.diet !== "string" ) {
      return false;
   };

   if ( !animal.personalityTraits || !Array.isArray( animal.personalityTraits )) {
      return false;
   };

   return true;
};

// Create route for front-end to request data from
// The first argument is a string that describes the route the client will fetch from
// The second argument is a callback that will execute every time the route is accessed
//   with a GET request
// res is short for response; req is short for request
app.get( "/api/animals", ( req, res ) => {
   let results = animals;
   console.log( req.query );

   if ( req.query ) {
      results = filterByQuery( req.query, results );
   };

   // Send this string back to the client
   res.json( results );
});

app.get( "/api/animals/:id", ( req, res ) => {
   const result = findById( req.params.id, animals );

   if ( result ) {
      res.json( result );
   }
   else {
      res.send( 404 );
   };
});

app.post( "/api/animals", ( req, res ) => {
   // Set id based on what the next index of the array will be
   req.body.id = animals.length.toString();

   // If any data is req.body is incorrect, send 400 error back
   if ( !validateAnimal( req.body )) {
      res.status( 400 ).send( "The animal is not properly formatted." );
   }
   else {
      // Add animal to json file and animals array in this function
      const animal = createNewAnimal( req.body, animals );
      res.json( animal );
   };

   // req.body is where our incoming content will be
   console.log( animal );
   res.json( animal );
});

// Listen for requests
app.listen( PORT, () => {
   console.log( `API server now on port ${PORT}!` );
});