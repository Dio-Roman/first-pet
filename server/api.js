const express = require("express");
const router = express.Router();

const Thing = require("./cat");
const Prepare = require("./prepare");
const Test = require("./test");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thingSchema = new Schema({
  id: Number,
  name: String,
  isDone: Boolean
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

router.get('/prepare', (req, res) => {
  // res.send({method: 'GET'})
  // res.render('GET.txt')
  // console.log("ok1")
  Prepare.find({"type": "a"})   //ищешь по типу 
  .then(prepare => {
    res.send(prepare)
  })
});

router.get('/test', (req, res) => {
  // res.send({method: 'GET'})
  // res.render('GET.txt')
  // console.log("ok1")
  Test.find({})
  .then(thing => {
    res.send(thing)
  })
});

router.post('/cat', (req, res) => {
  // res.send({method: 'POST'})
  // console.log("ok1")  create
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
