const ModelIndex = require('../models');
const Logement = ModelIndex.Logement;

const LogementController = function() {};

LogementController.addLogement = function(adresse, description, code_postal, departement, date_debut, date_fin, photo_url){
  return Logement.create({
    adresse: adresse,
    description: description,
    code_postal: code_postal,
    departement: departement,
    date_debut: date_debut,
    date_fin: date_fin,
    photo_url: photo_url
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

LogementController.updateLogement = function(idLogement, newLogementname, newPassword, newEmail) {
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
    addresse: newAddresse,
    code_postal: newCodePostal,
    departement: newDepartement,
    date_debut: newDateDebut,
    date_fin: newDateFin,
    photo_url: newPhotoUrl
  });

  return Logement;
};

LogementController.getLogementById = function(LogementId){
  return Logement.find({
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

LogementController.getAllLogement = function(){
  return Logement.findAll()
  .catch((err) => {
    console.error(err);
  });
};

module.exports = LogementController;
