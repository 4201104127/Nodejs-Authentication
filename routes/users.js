const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const verifyToken = require('./../middlewares/verifyToken');

router.get('/:eventId/:skip', (request, response) => {
  User.find({event: request.params.eventId}).skip(request.params.skip).limit(10).exec(function (err, users) {
    if (err) console.log(err);
    else response.send(users);
  });
});

router.delete('/:id', (request, response)=> {
  User.deleteOne({_id: request.params.id}).exec(function (err, user) {
    if (err) console.log(err);
    else response.send(user)
  });
});

router.post('/:id', verifyToken, (request, response) => {
  User.updateOne({_id: id}, {$set: {
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    work_location: request.body.work_location,
    hobbies: request.body.hobbies
  }}).exec(function (err, user) {
    if (err) console.log(err);
    else response.send(user)
  });
});

router.get('/:email', (request, response) => {
  User.find({email: request.params.email}).exec(function (err, users) {
    if (err) console.log(err);
    else response.send(users);
  });
});

module.exports = router;
