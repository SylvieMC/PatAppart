require ("dotenv").config();

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
  const port = process.env.PORT;
  var whitelist = ['http://localhost:4200', 'http://127.0.0.1:4200', 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://localhost:9999', 'http://127.0.0.1:9999', undefined, 'https://patappart.sylvie-cassim.com', 'http://patappart.sylvie-cassim.com']
var corsOptions = {
  origin: function (origin, callback) {
    console.log('origin: ', origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

  app.use(cors(corsOptions));

  RouteManager.attach(app);

  app.listen(port, function() {
    console.log('Server started on port...');
  })
  ;
}
