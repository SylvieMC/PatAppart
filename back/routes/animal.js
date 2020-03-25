const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const AnimalController = controllers.AnimalController;
const jwt = require('jsonwebtoken');

const animalRouter = express.Router();
animalRouter.use(bodyParser.json());

/**
 * Create an animal.
 */
animalRouter.post('/', function(req, res) {
  const nom = req.body.nom;
  const type_animal = req.body.type_animal;
  const race = req.body.race;
  const description = req.body.description;
  const date_de_naissance = req.body.date_de_naissance;
  const photo_url = req.body.photo_url;
  const logement_id = req.body.logement_id;
  const utilisateur_id = req.body.utilisateur_id;
  if(nom === undefined || type_animal === undefined) {
    res.status(400).end();
    return;
  }
  const animal = AnimalController.addAnimal(nom, type_animal, race, description, date_de_naissance, photo_url,utilisateur_id, logement_id)
  .then((animal) =>{
    console.log(animal);
    res.status(201).json(animal);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })

});

/**
 * Get all animals
 */
animalRouter.get('/',function(req,res){
  AnimalController.getAllAnimal()
    .then((animalsResponse) =>{
      res.status(200).json(animalsResponse);
    })
    .catch((err) =>{
      console.error(err);
      res.status(500).end();
    })
});

/**
 * Get animal by Id
 */

animalRouter.get('/:idAnimal' , function(req,res){

  const idAnimal = req.params.idAnimal;

  if(idAnimal === undefined) {
    res.status(400).end();
    return;
  }

  AnimalController
  .getAnimalById(idAnimal)
  .then((animal) =>{
    res.status(200).json(animal);
  })
  .catch((err)=>{
    console.error(err);
  });
});

animalRouter.delete('/:idAnimal' , function(req,res){
  jwt.verify(req.token, 'secretkey', (err) =>{
    if(err){
      res.status(403).end('Accès refusé');
      return;
    }
    else{
      const id = req.params.idAnimal;
      if(id ===undefined ){
        res.status(403).end();
        return;
      }
      AnimalController.deleteAnimal(id);
      res.status(200).end();
    }
  });
});

module.exports = animalRouter;
