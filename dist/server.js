'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _reactRouterDom = require('react-router-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// set up express app

// var pg = require('pg');
var app = (0, _express2.default)();

// set the port
app.set('port', process.env.PORT || 1337);

// allow cross origin resource sharing
app.use((0, _cors2.default)());

// parse incoming requests data with body-parser
// check out https://github.com/expressjs/body-parser for more details
app.use(_bodyParser2.default.json({ strict: false }));
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// create static server
app.use(_express2.default.static(_path2.default.resolve(__dirname, 'assets')));

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
app.get('*', function (request, response) {
  var context = {};

  // testing preloading state in server render
  var todos = [{
    id: 0,
    text: "test",
    completed: false
  }];
  var injectedState = { todos: todos };
  var store = store = (0, _redux.createStore)(_reducers2.default, injectedState);
  var body = _server2.default.renderToString(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: request.url, context: context },
      _react2.default.createElement(_App2.default, null)
    )
  ));
  var preloadedState = store.getState();
  var route = request.params.path;

  preloadedState = JSON.stringify(preloadedState).replace(/</g, '\\u003c');
  response.render('pages/index', { route: route, body: body, preloadedState: preloadedState });
});

// tell server to listen on port defined above
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});