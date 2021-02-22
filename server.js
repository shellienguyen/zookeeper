const { animals } = require( './data/animals' );
const express = require( "express" );
const PORT = process.env.PORT || 3001;

//Instantiate the server
const app = express();

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

// Listen for requests
app.listen( PORT, () => {
   console.log( `API server now on port ${PORT}!` );
});