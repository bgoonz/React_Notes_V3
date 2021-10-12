// Call this via CLI with $ node app.js /PathTo/Your.csv
var parse = require( 'csv-parse' );
var fs = require( 'fs' );

process.argv.forEach( function ( val, index, array ) {
  /*
    Position 0 == node, poistion 1 == app.js (full path) thats why we check we
    need to check for args from index 2 onwards
  */
  if ( index > 1 ) {
    var filePath = array[ index ]; // Get the file
    fs.readFile( filePath, function ( err, data ) { // Read the contents of the file
      if ( err ) {
        console.error( "** ERROR ** ", err );
      } else {
        // Finally parse the data
        parse( data.toString(), {
          comment: '#'
        }, processFile );
      }
    } );
  }
} );

function processFile( err, data ) {
  if ( err ) console.error( "** ERROR ** ", err );
  else console.log( data ); // Dump the CSV to the console window
}
