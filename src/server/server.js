import express from 'express';
// var pg = require('pg');
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import App from './components/App';


// set up express app
let app = express();

// set the port
app.set('port', (process.env.PORT || 1337));

// allow cross origin resource sharing
app.use(cors());

// parse incoming requests data with body-parser
// check out https://github.com/expressjs/body-parser for more details
app.use(bodyParser.json({strict: false}));
app.use(bodyParser.urlencoded({ extended: false }));

// create static server
app.use(express.static(__dirname));

// use ejs as view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// server side render the App
let renderedApp = ReactDOMServer.renderToString(<App/>);

// render index page on GET request to '/'
app.get('/', (request, response) => {
  response.render('pages/index', {route: request.params.path, body: renderedApp});
});

// // require the routes in our routes/index.js file
// if (process.env.PORT) {
//   require('./server/routes')(app);
// };

// tell server to listen on port defined above
app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

/*// use basic pg on GET request to '/'
app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});
*/


