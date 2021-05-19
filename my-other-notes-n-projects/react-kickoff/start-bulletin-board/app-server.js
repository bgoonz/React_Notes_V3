var express = require('express');
var app = express();

app.use(express.static('./public'))
    .use(express.static('./node_modules/bootstrap/dist'))
    .listen(3000);

console.log('Bulletin Board App Running on "http://localhost:3000"');