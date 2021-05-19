var express = require('express');
var app = express();

app.use(express.static('./public')).listen(3000);

console.log('Random Members app running at "http://localhost:3000"');