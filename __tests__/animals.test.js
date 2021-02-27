const fs = require( "fs" );
const {
   filterByQuery,
   findById,
   createNewAnimal,
   validateAnimal,
} = require( "../lib/animals.js" );
const { animals } = require( "../data/animals" );

jest.mock( "fs" );

test( "Creates an animal object", () => {
   const animal = createNewAnimal( { name: "Darlene", id: "jhgdja3ng2" }, animals );

   expect( animal.name ).toBe( "Darlene" );
   expect( animal.id ).toBe( "jhgdja3ng2" );
});

test( "Filters by query", () => {
   const startingAnimals = [
   {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: [ "quirky", "rash" ],
   },
   {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: [ "impish", "sassy", "brave" ],
   },];

   const updateAnimals = filterByQuery({ species: "gorilla" }, startingAnimals );

   expect( updateAnimals.length).toEqual( 1 );
});

test( "Finds by id", () => {
   const startingAnimals = [
      {
         id: "3",
         name: "Erica",
         species: "gorilla",
         diet: "omnivore",
         personalityTraits: [ "quirky", "rash" ],
      },
      {
         id: "4",
         name: "Noel",
         species: "bear",
         diet: "carnivore",
         personalityTraits: [ "impish", "sassy", "brave" ],
      },
   ];

   const result = findById( "3", startingAnimals );

   expect( result.name ).toBe( "Erica" );
});

test( "Validates personality traits", () => {
   const animal = {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: [ "quirky", "rash", ],
   };

   const invalidAnimal = {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
   };

   const result = validateAnimal( animal );
   const result2 = validateAnimal( invalidAnimal );

   expect( result ).toBe( true );
   expect( result2 ).toBe( false );
});