const RouteManager = function() { };

RouteManager.attach = function(app) {
  app.use('/logements' , require('./logement'));
  app.use('/utilisateurs' , require('./utilisateur'));
  app.use('/animals' , require('./animal'));
};

module.exports = RouteManager;
