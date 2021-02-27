const router = require( "express" ).Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require( "../../lib/animals" );
const { animals } = require( "../../data/animals" );

/*
Create route for front-end to request data from.
The first argument is a string that describes the route the client will fetch from.
The second argument is a callback that will execute every time the route is accessed
  with a GET request.
res is short for response; req is short for request.
*/
router.get( "/animals", ( req, res ) => {
   let results = animals;
   console.log( "req.query:" );
   console.log( req.query );

   if ( req.query ) {
      results = filterByQuery( req.query, results );
   };

   // Send this string back to the client
   res.json( results );
});

router.get( "/animals/:id", ( req, res ) => {
   const result = findById( req.params.id, animals );

   if ( result ) {
      res.json( result );
   }
   else {
      res.send( 404 );
   };
});

router.post( "/animals", ( req, res ) => {
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
});

module.exports = router;