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

UtilisateurController.updateUtilisateur = function(idUtilisateur, newLogin, newMotDePasse, newEmail, newDescription, newDateDeNaissance) {

  return Utilisateur.update({
    login: newLogin,
    mot_de_passe: newMotDePasse,
    email: newEmail,
    description: newDescription,
    date_de_naissance: newDateDeNaissance
  },
  {
    where:{
      id: idUtilisateur
    }
  });

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


UtilisateurController.login = function(email, mot_de_passe){

  return Utilisateur.find({
    where : {
      email : email,
      mot_de_passe : mot_de_passe
    }
  })
  .then((utilisateur)=>{
    if(utilisateur){
      return utilisateur;
    }
    else{
      return null;
    }
  })

};

module.exports = UtilisateurController;
