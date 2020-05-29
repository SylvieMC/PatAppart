const ModelIndex = require('../models');
const Animal = ModelIndex.Animal;

const AnimalController = function() {};

AnimalController.addAnimal = function(nom, type_animal, race, description, date_de_naissance, photo_url, utilisateur_id, logement_id){
  return Animal.create({
    nom: nom,
    type_animal: type_animal,
    race: race,
    description: description,
    date_de_naissance: date_de_naissance,
    photo_url: photo_url,
    utilisateur_id: utilisateur_id,
    logement_id: logement_id
  })
};

AnimalController.deleteAnimal = function(idAnimal){
  return Animal.destroy({
    where:{
      id: idAnimal
    }
  })
  .then(() => {
      console.log("La fiche de cet animal à été supprimé.");
    })
    .catch((err) => {
      console.error(err);
    })
};

AnimalController.updateAnimal = function(idAnimal, newNom, newTypeAnimal, newRace, newDescription, newDateDeNaissance, newPhotoUrl) {


  return Animal.update({
    nom: newNom,
    type_animal: newTypeAnimal,
    race: newRace,
    description: newDescription,
    date_de_naissance: newDateDeNaissance,
    photo_url: newPhotoUrl
  },
  {
    where:
    {
      id: idAnimal
    }
  });


};

AnimalController.getAnimalById = function(AnimalId){
  return Animal.find({
    where: {
      id: AnimalId
    }
  })
  .then((Animal) => {
    console.log('Animal trouvé');
    return Animal;
  })
  .catch((error) => {
    console.error(err);
  });
};

AnimalController.getAllAnimal = function(){
  return Animal.findAll()
  .catch((err) => {
    console.error(err);
  });
};

module.exports = AnimalController;
