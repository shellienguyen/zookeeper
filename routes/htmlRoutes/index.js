const path = require( "path" );
const router = require( "express" ).Router();

/*
Unlike most GET and POST routes that deal with creating or return JSON data,
this GET route has just one job to do, and that is to respond with an HTML
page to display in the browser, so instead of using res.json() we use
res.sendFile().

The "/" route brings us back to the root route of the server, the route
used to create a homepage for a server.

Using the path module to ensure that we're finding the corret location of 
the HTML code we want to display in the browser.

sendFile() locates and reads the file's content, then send it back to the client
*/
router.get( "/", ( req, res ) => {
   res.sendFile( path.join( __dirname, "../../public/index.html" ));
});

router.get( "/animals", (req, res ) => {
   res.sendFile( path.join( __dirname, "../../public/animals.html" ));
});

router.get( "/zookeepers", ( req, res ) => {
   res.sendFile( path.join( __dirname, "../../public/zookeepers.html" ));
});

router.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../../public/index.html'));
 });
 
module.exports = router;