const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const LogementController = controllers.LogementController;
const jwt = require('jsonwebtoken');

const logementRouter = express.Router();
logementRouter.use(bodyParser.json());


logementRouter.post('/', function(req, res) {
  const addresse = req.body.addresse;
  const description = req.body.description;
  if(addresse === undefined || description === undefined) {
    res.status(400).end();
    return;
  }
  const menu = LogementController.add(addresse, description)
  .then((menu) =>{
    res.status(201).json(menu);
  })
  .catch((err) => {
    res.status(500).end();
  })

});

logementRouter.get('/Logement/:idLogement' , function(req,res){
  const id = req.params.idLogement;
  if(id === undefined ){
    res.status(403).end();
    return;
  }
  LogementController.getMenuById(id)
  .then((menu) =>{
    res.status(201).json(menu);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});


logementRouter.get('/all',function(req,res){
    LogementController.getAll()
    .then((menus) =>{
      res.status(201).json(menus);
    })
    .catch((err) =>{
      console.error(err);
      res.status(500).end();
    })
});

logementRouter.get('/allLogement/:idLogement' , function(req,res){

  const idLogement = req.params.idLogement;

  if(idLogement === undefined) {
    res.status(400).end();
    return;
  }

  LogementController.getLogement(idLogement)
  .then((products) =>{
    res.status(200).json(products);
  })
  .catch((err)=>{
    console.error(err);
  });

});

logementRouter.get('/name/:name' , function(req,res){

  const name = req.params.name;
  if(name === undefined ){
    res.status(403).end();
    return;
  }

  LogementController.getByName(req.params.name)
  .then((menu) => {
    res.status(201).json(menu);
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
