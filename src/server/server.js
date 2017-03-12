import express from 'express';
import path from 'path';
// var pg = require('pg');
import cors from 'cors';
import logger from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import App from './components/App';
import { StaticRouter } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';

// get json manifest file details so we can load the correct bundles
var manifest = require(path.resolve(__dirname,'assets','chunk-manifest.json'));
let match = manifest[0].match(/^\d+\.([\w]{2,})\.js$/i);
let hash = match[1];

// set up express app
let app = express();

// set the port
app.set('port', (process.env.PORT || 1337));

// allow cross origin resource sharing
app.use(cors());
app.use(compression());

// parse incoming requests data with body-parser
// check out https://github.com/expressjs/body-parser for more details
app.use(bodyParser.json({strict: false}));
app.use(bodyParser.urlencoded({ extended: false }));

// create static server
app.use(express.static(path.resolve(__dirname, 'assets')));

// use ejs as view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// server side render the App


// // require the routes in our routes/index.js file
// if (process.env.PORT) {
//   require('./server/routes')(app);
// };
// routes for React App

  // server side render the App
  app.get('*', (request, response) => {
    let context = {};
    
    // testing preloading state in server render
    let todos = [{
      id: 0,
      text: "test",
      completed: false
    }];
    let injectedState = {todos};
    let store = store = createStore(reducers, injectedState);
    let body = ReactDOMServer.renderToString(
      <Provider store={store}><StaticRouter location={request.url} context={context}>
        <App/>
      </StaticRouter></Provider>
    );
    let preloadedState = store.getState();
    let route = request.params.path;
    let bundle = `bundle.${hash}.js`;
    let vendor = `vendor.${hash}.js`;

    preloadedState = JSON.stringify(preloadedState).replace(/</g, '\\u003c');
    response.render('pages/index', {route, body, preloadedState, bundle, vendor});
  });

// tell server to listen on port defined above
app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});


