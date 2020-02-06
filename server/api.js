const express = require("express");
const router = express.Router();

const Thing = require("./cat");
const Prepare = require("./prepare");
const Test = require("./test");
const ListCatName = require("./listCatName");

// import '../src/config/emptyData.json'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thingSchema = new Schema({
  id: Number,
  name: String,
  isDone: Boolean
});

// подгрузить на сайт список всех коллекций-котов
router.get('/listcatname', (req, res) => {
  // res.send({method: 'GET'})
  // res.render('GET.txt')
  // console.log("ok1")
  ListCatName.find({})
  .then(list => {
    res.send(list)
  })
});

// ---отправить нового кота в общий список---
router.post('/listcatname', (req, res) => {
  // res.send({method: 'POST'})
  // console.log("ok1")  create
  ListCatName.create(req.body)
  .then(list => {
    // res.send(list);
    res.redirect('/')
    // console.log(list)
  })
});

// что введешь в URL - в ту коллекцию и запрос
// router.get('/:cat/b', (req, res) => {          //после слэша -  thing
//   // res.send({method: 'GET'})
//   // res.render('GET.txt')
//   // console.log("ok1")
//   mongoose.model(`${req.params.cat}`, thingSchema).find({"type": "b"})          //сюда тоже {"type":   "thing" }
//   .then(thing => {
//     res.send(thing)
//   })
// });

// router.get('/cat', (req, res) => {
//   // res.send({method: 'GET'})
//   // res.render('GET.txt')
//   // console.log("ok1")
//   Thing.find({})     //ищешь всё
//   .then(data => {
//     res.send(data)
//   })
// });

// router.get('/prepare', (req, res) => {
  // res.send({method: 'GET'})
  // res.render('GET.txt')
  // console.log("ok1")
//   Prepare.find({"type": "a"})   //ищешь по типу 
//   .then(prepare => {
//     res.send(prepare)
//   })
// });

//  получить все вещи в коллекции things (/things?type) и процедуры по типу
router.get('/:type', (req, res) => {
  // res.send({method: 'GET'})
  // res.render('GET.txt')
  // console.log("ok1", req.params.type)
  Thing.find({type: `${req.params.type}`})
  .then(thing => {
    res.send(thing)
  })
});

// router.get('/:type', (req, res) => {
//   // res.send({method: 'GET'})
//   // res.render('GET.txt')
//   console.log("ok1", req.params.type)
//   Thing.find({type: `prepare`})
//   .then(thing => {
//     res.send(thing)
//   })
// });

// на things in Mongo:  можно массив отсылать и будут 
// отдельные документы в коллекции
router.post('/things', (req, res) => {
  // res.send({method: 'POST'})
  // console.log("ok1")  create
  // Thing.create(JSON.stringify(test))
  Thing.create(req.body)
  .then(thing => {
    res.send(thing)
  })
});

router.post('/testnew', (req, res) => {
  // res.send({method: 'POST'})
  // console.log("ok1")  create
  Test.create(req.body)
  .then(test => {
    res.send(test)
  })
});


//  менять чекбокс по id в вещах и возвращает обновленный массив
router.put('/:things', (req, res) => {
  // res.send({method: 'PUT'})
  console.log(req.body)
  Thing.findByIdAndUpdate({_id: req.body._id}, req.body)
  .then(() => {
    Thing.find({type: req.params.things})
    // Thing.findOne({_id: req.body._id})
    .then(thing => {
      res.send(thing)
    })
  })
});

router.put('/cat/:id', (req, res) => {
  // res.send({method: 'PUT'})
  // console.log("ok1")
  Prepare.findByIdAndUpdate({_id: req.params.id}, req.body)
  .then(() => {
    Prepare.findOne({_id: req.params.id})
    .then(thing => {
      res.send(thing)
    })
  })
});

router.put('/prepare/:id', (req, res) => {
  // res.send({method: 'PUT'})
  // console.log("ok1")
  Thing.findByIdAndUpdate({_id: req.params.id}, req.body)
  .then(() => {
    Thing.findOne({_id: req.params.id})
    .then(thing => {
      res.send(thing)
    })
  })
});

router.delete('/cat/:id', (req, res) => {
  // res.rensendder({method: 'DELETE'})
  // console.log("ok1")
  Thing.deleteOne({_id: req.params.id})
  .then(thing => {
    res.send(thing)
  })
});

module.exports = router;
