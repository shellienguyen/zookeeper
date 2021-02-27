const $animalForm = document.querySelector('#animal-form');
const $zookeeperForm = document.querySelector( "#zookeeper-form" );

const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };

  fetch( "/api/animals", {
    method: "POST",
    headers: {
      /*
      Inform the request that this is going to be JSON data, so we can add
      stringified JSON data for the animalObject to the body property of the
      request.  Without these, we would never receive req.body on the server!
      The request is coming from the server, hence don't have to specify the
      full URL.
      */
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify( animalObject )
  })
    .then( response => {
      if ( response.ok ) {
        return response.json();
      };
      alert( `Error: ${response.statusText}` );
    })
    .then( postResponse => {
      alert( "Thank you for adding an animal!" );
    });
};

const handleZookeeperFormSubmit = event => {
  event.preventDefault();
  console.log( 'handleZookeeperFormSubmit:' );

  // Get zookeeper data and organize it
  const name = $zookeeperForm.querySelector( '[ name = "zookeeper-name" ]' ).value;
  const age = parseInt( $zookeeperForm.querySelector( '[ name = "age" ]' ).value );
  const favoriteAnimal = $zookeeperForm.querySelector( '[ name = "favorite-animal" ]' ).value;

  const zookeeperObj = { name, age, favoriteAnimal };
  console.log( zookeeperObj );
  
  fetch( 'api/zookeepers', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( zookeeperObj )
  })
    .then( response => {
      if ( response.ok ) {
        return response.json();
      };

      alert( 'Error: ' + response.statusText );
    })
    .then( postResponse => {
      alert( 'Thank you for adding a zookeeper!' );
    });
};

$animalForm.addEventListener( 'submit', handleAnimalFormSubmit );
$zookeeperForm.addEventListener( 'submit', handleZookeeperFormSubmit );
