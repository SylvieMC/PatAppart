const express = require('express');
const ModelIndex = require('./models');
const RouteManager = require('./routes');
const cors = require('cors');


ModelIndex
.openDatabase()
.then(_startServer)
.catch((err) => {
  console.error(err);
});

function _startServer() {

  const app = express();

  var whitelist = ['http://localhost:4200', 'http://127.0.0.1:4200']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {s
      callback(new Error('Not allowed by CORS'))
    }
  }
}

  app.use(cors(corsOptions));

  RouteManager.attach(app);

  app.listen(8080, function() {
    console.log('Server started on 8080...');
  })
  ;
}
