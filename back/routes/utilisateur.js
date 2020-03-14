const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const UtilisateurController = controllers.UtilisateurController;
const jwt = require('jsonwebtoken');

const utilisateurtRouter = express.Router();
utilisateurtRouter.use(bodyParser.json());

/**
 * Create a Logement.
 */
utilisateurtRouter.post('/', function(req, res) {
  const login = req.body.login;
  const email = req.body.email;
  const mot_de_passe = req.body.mot_de_passe;
  const description = req.body.description;
  const date_de_naissance = req.body.date_de_naissance;
  if(login === undefined || mot_de_passe === undefined) {
    res.status(400).end();
    return;
  }
  const logement = UtilisateurController.addLogement(adresse, description, code_postal, departement, date_debut, date_fin, photo_url)
  .then((logement) =>{
    console.log(logement);
    res.status(201).json(logement);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })

});

/**
 * Get all Logements
 */
utilisateurtRouter.get('/',function(req,res){
  UtilisateurController.getAllLogement()
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

utilisateurtRouter.get('/:idLogement' , function(req,res){

  const idLogement = req.params.idLogement;

  if(idLogement === undefined) {
    res.status(400).end();
    return;
  }

  UtilisateurController.getAllLogement()
  .getLogementById(idLogement)
  .then((products) =>{
    res.status(200).json(products);
  })
  .catch((err)=>{
    console.error(err);
  });

});
/**
 * get Logement by code postal
 */
utilisateurtRouter.get('/codepostal/:codepostal' , function(req,res){

  const codepostal = req.params.codepostal;
  if(codepostal === undefined ){
    res.status(403).end();
    return;
  }

  UtilisateurController.findByCodePostal(req.params.codepostal)
  .then((logement) => {
    res.status(200).json(logement);
  })
  .catch((err) =>{
    console.error(err);
    res.status(500).end();
  })
});

/*menuRouter.post('/addProduct/:idProduct/:idMenu' , function(req,res){
  jwt.verify(req.token, 'secretkey', (err) =>{
    if(err){
      res.status(403).end('Accès refusé');
      return;
        }else{
      const idProduct = parseInt(req.params.idProduct);
      const idMenu = parseInt(req.params.idMenu);

      if(idProduct === undefined || idMenu === undefined ){
          res.status(403).end();
        return;
      }

      MenuController.addProduct(idMenu,idProduct)
      .then((product)=>{
        res.status(201).json(product);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      })
    }
  });
});


menuRouter.delete('/deleteProduit/:idMenu/:idProduct' , function(req,res){
  jwt.verify(req.token, 'secretkey', (err) =>{
    if(err){
      res.status(403).end('Accès refusé');
      return;
    }
    else{
      const idProduct = parseInt(req.params.idProduct);
      const idMenu = parseInt(req.params.idMenu);

      if(idProduct === undefined || idMenu === undefined ){
          res.status(403).end();
        return;
      }

      MenuController.deleteProduct(idMenu,idProduct);
      res.status(200).end();
    }
  });
});*/


utilisateurtRouter.delete('/deleteLogement/:idLogement' , function(req,res){
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
      UtilisateurController.deleteLogement(id);
      res.status(200).end();
    }
  });
});

module.exports = utilisateurtRouter;
