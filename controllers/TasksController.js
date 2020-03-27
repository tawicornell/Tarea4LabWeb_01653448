const Task = require('../models/Task');


const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support enc


exports.done = (req, res) => {
  let id = req.params.id;
  Task.find(id)
  .then((task) => {
    return Task.markAsDone(task);
  })
  .then((result) => {
    res.redirect('/');
  });
}

exports.delete = (req, res) => {
  let id = req.params.id;
  Task.find(id)
  .then((task) => {
    
   // console.log("deleteado<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    return Task.delete(id);
   
  })
  .then((result) => {
    res.redirect('/');
  });
}

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    // if the request is expecting an ajax or json response
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      Task.find(id).then((task) => res.json(task));
    } else {
      res.redirect('/');
    }
  });
}




//************ */
exports.new = (req, res) =>{
  res.setHeader('Content-type', 'text/plain');
  const nombre = req.body.nombre;
  const rating = req.body.rating;


  // abrir archivo
  let file = fs.readFileSync('./peliculas.json', 'UTF-8');

  // convertirlo a un arreglo
  const json = JSON.parse(file);

  // insertar un nuevo elemento
  json.peliculas.push({"nombre": nombre, "rating": parseInt(rating)});

  // guardar json en el archivo
  file = fs.writeFileSync('./peliculas.json', JSON.stringify(json));

 // res.send('Datos guardados con éxito');

}


exports.readAll = (req, res) =>{

  
  Task.all()
    .then((data) => {
   res.json(data); 
    });

}


exports.nukeAll = (req, res) =>{

  
  Task.nuke()
    .then((data) => {
      res.redirect('/');
    });

}
