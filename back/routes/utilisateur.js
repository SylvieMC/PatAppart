const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const UtilisateurController = controllers.UtilisateurController;
const jwt = require('jsonwebtoken');

const utilisateurRouter = express.Router();
utilisateurRouter.use(bodyParser.json());

/**
 * Create an Utilisateur.
 */
utilisateurRouter.post('/', function(req, res) {
  const login = req.body.login;
  const email = req.body.email;
  const mot_de_passe = req.body.mot_de_passe;
  const description = req.body.description;
  const date_de_naissance = req.body.date_de_naissance;
  if(login === undefined || mot_de_passe === undefined) {
    res.status(400).end();
    return;
  }
  const utilisateur = UtilisateurController.addUtilisateur(login, email, mot_de_passe, description, date_de_naissance)
  .then((utilisateur) =>{
    console.log(utilisateur);
    res.status(201).json(utilisateur);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })

});

/**
 * Get all Utilisateurs
 */
utilisateurRouter.get('/',function(req,res){
  UtilisateurController.getAllUtilisateur()
    .then((utilisateursResponse) =>{
      res.status(200).json(utilisateursResponse);
    })
    .catch((err) =>{
      console.error(err);
      res.status(500).end();
    })
});

/**
 * Get Utilisateur by Id
 */

utilisateurRouter.get('/:idUtilisateur' , function(req,res){

  const idUtilisateur = req.params.idUtilisateur;

  if(idUtilisateur === undefined) {
    res.status(400).end();
    return;
  }

  UtilisateurController
  .getUtilisateurById(idUtilisateur)
  .then((utilisateur) =>{
    res.status(200).json(utilisateur);
  })
  .catch((err)=>{
    console.error(err);
  });
});

utilisateurRouter.delete('/:idUtilisateur' , function(req,res){
  jwt.verify(req.token, 'secretkey', (err) =>{
    if(err){
      res.status(403).end('Accès refusé');
      return;
    }
    else{
      const id = req.params.idUtilisateur;
      if(id ===undefined ){
        res.status(403).end();
        return;
      }
      UtilisateurController.deleteUtilisateur(id);
      res.status(200).end();
    }
  });
});

module.exports = utilisateurRouter;
