const ModelIndex = require('../models');
const Logement = ModelIndex.Logement;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const LogementController = function() {};

LogementController.addLogement = function(adresse, description, code_postal, departement, date_debut, date_fin, photo_url, utilisateur_id){

  return Logement.create({
    adresse: adresse,
    description: description,
    code_postal: code_postal,
    departement: departement,
    date_debut: date_debut,
    date_fin: date_fin,
    photo_url: photo_url,
    utilisateur_id: utilisateur_id
  })

};

LogementController.deleteLogement = function(idLogement){

  return Logement.destroy({
    where:{
      id: idLogement
    }
  })
  .then(() => {
      console.log("L'utilisateur à été supprimé.");
    })
    .catch((err) => {
      console.error(err);
    })

};

LogementController.updateLogement = function(idLogement, newDescription, newAdresse, newCodePostal, newDepartement, newDateDebut, newDateFin, newPhotoUrl) {

  const Logement = Logement.find({
    where:{
      id: idLogement
    }
  });

  if(Logement === undefined){
    return;
  }

  Logement.updateAttributes({
    description: newDescription,
    adresse: newAdresse,
    code_postal: newCodePostal,
    departement: newDepartement,
    date_debut: newDateDebut,
    date_fin: newDateFin,
    photo_url: newPhotoUrl
  });

  return Logement;

};

LogementController.getLogementById = function(LogementId){

  return Logement.findOne({
    where: {
      id: LogementId
    }
  })
  .then((Logement) => {
    console.log('Logement trouvé');
    return Logement;
  })
  .catch((error) => {
    console.error(err);
  });

};

LogementController.findByCodePostal = function(codepostal){

  return Logement.findOne({
    where: {
      code_postal: {
        [Op.like]: codepostal + '%'
      },
    }
  })
  .then((Logement) => {
    console.log('Logement trouvé');
    return Logement;
  })
  .catch((error) => {
    console.error(error);
  });

};

LogementController.getAllLogement = function(){

   console.log('ok');
  return Logement.findAll()
  .catch((err) => {
    console.error(err);
  });

};

module.exports = LogementController;
