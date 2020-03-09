const ModelIndex = require('../models');
const Utilisateur = ModelIndex.Utilisateur;

const UtilisateurController = function() {};

UtilisateurController.addUtilisateur = function(login, mot_de_passe, email, description, date_de_naissance){
  return Utilisateur.create({
    login: login,
    mot_de_passe: mot_de_passe,
    email: email,
    description: description,
    date_de_naissance: date_de_naissance
  })
};

UtilisateurController.deleteUtilisateur = function(idUtilisateur){
  return Utilisateur.destroy({
    where:{
      id: idUtilisateur
    }
  })
  .then(() => {
      console.log("L'utilisateur à été supprimé.");
    })
    .catch((err) => {
      console.error(err);
    })
};

UtilisateurController.updateUtilisateur = function(idUtilisateur, newLogin, newPassword, newEmail, newDescription, newDateDeNaissance) {
  const Utilisateur = Utilisateur.find({
    where:{
      id: idUtilisateur
    }
  });

  if(Utilisateur === undefined){
    return;
  }

  Utilisateur.updateAttributes({
    login: newLogin,
    password: newPassword,
    email: newEmail,
    description: newDescription,
    date_de_naissance: newDateDeNaissance
  });

  return Utilisateur;
};

UtilisateurController.getUtilisateurById = function(UtilisateurId){
  return Utilisateur.find({
    where: {
      id: UtilisateurId
    }
  })
  .then((Utilisateur) => {
    console.log('Utilisateur trouvé');
    return Utilisateur;
  })
  .catch((error) => {
    console.error(err);
  });
};

UtilisateurController.getAllUtilisateur = function(){
  return Utilisateur.findAll()
  .catch((err) => {
    console.error(err);
  });
};

module.exports = UtilisateurController;
