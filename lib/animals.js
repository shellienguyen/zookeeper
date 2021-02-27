const fs = require( "fs" );
const path = require( "path" );

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
 };
  
   if ( query.diet ) {
      filteredResults = filteredResults.filter( animal => animal.diet === query.diet );
   };

   if ( query.species ) {
      filteredResults = filteredResults.filter( animal => animal.species === query.species );
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
   console.log( "body:" );
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
      path.join( __dirname, "../data/animals.json" ),

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

module.exports = {
   filterByQuery,
   findById,
   createNewAnimal,
   validateAnimal
};