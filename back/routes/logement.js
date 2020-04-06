const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const LogementController = controllers.LogementController;
const jwt = require('jsonwebtoken');

const logementRouter = express.Router();
logementRouter.use(bodyParser.json());

/**
 * Create a Logement.
 */
logementRouter.post('/', function(req, res) {
  const token = req.headers["authorization"]; // Recupération du token dans le header
  jwt.verify(token, 'secretkey', (err) =>{
    if(err){ // If token n'est pas valide
      res.status(403).end('Accès refusé');
      return;
    }
    else{
      const adresse = req.body.adresse;
      const description = req.body.description;
      const code_postal = req.body.code_postal;
      const departement = req.body.departement;
      const date_debut = req.body.date_debut;
      const date_fin = req.body.date_fin;
      const photo_url = req.body.photo_url;
      const utilisateur_id = req.body.utilisateur_id;
      if(adresse === undefined || description === undefined) {
        res.status(400).end();
        return;
      }
      const logement = LogementController.addLogement(adresse, description, code_postal, departement, date_debut, date_fin, photo_url, utilisateur_id)
      .then((logement) =>{
        console.log(logement);
        res.status(201).json(logement);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      })
      }
  });
});

/**
 * Get all Logements
 */
logementRouter.get('/',function(req,res){
    LogementController.getAllLogement()
    .then((logements) =>{
      res.status(200).json(logements);
    })
    .catch((err) =>{
      console.error(err);
      res.status(500).end();
    })
});

/**
 * Get Logement by Id
 */

logementRouter.get('/:idLogement' , function(req,res){

  const idLogement = req.params.idLogement;

  if(idLogement === undefined) {
    res.status(400).end();
    return;
  }

  LogementController.getLogementById(idLogement)
  .then((logement) =>{
    res.status(200).json(logement);
  })
  .catch((err)=>{
    console.error(err);
  });

});
/**
 * get Logement by code postal
 */
logementRouter.get('/codepostal/:codepostal' , function(req,res){

  const codepostal = req.params.codepostal;
  if(codepostal === undefined ){
    res.status(403).end();
    return;
  }

  LogementController.findByCodePostal(req.params.codepostal)
  .then((logement) => {
    res.status(200).json(logement);
  })
  .catch((err) =>{
    console.error(err);
    res.status(500).end();
  })
});

logementRouter.delete('/deleteLogement/:idLogement' , function(req,res){
  jwt.verify(req.token, 'secretkey', (err) =>{
    if(err){
      res.status(403).end('Accès refusé');
      return;
    }
    else{
      const id = req.params.idLogement;
      if(id ===undefined ){
        res.status(403).end();
        return;
      }
      LogementController.deleteLogement(id);
      res.status(200).end();
    }
  });
});

module.exports = logementRouter;
