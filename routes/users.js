const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const Event = require('./../models/event');
const verifyToken = require('./../middlewares/verifyToken');

router.get('/get/:eventId/:skip?/:limit?', (request, response) => {
  Event.distinct('email', { event: request.params.eventId }).exec(function (err, emails) {
    if (err) console.log(err);
    else {
      User.find({email: {$in: emails}}, {password: 0}).skip(request.params.skip || 0).limit(request.params.limit || 10).exec(function (err, users) {
        if (err) console.log(err);
        else response.send(users);
      })
    }
  });
});

router.delete('/delete/:id', (request, response) => {
  User.deleteOne({ _id: request.params.id }).exec(function (err, user) {
    if (err) console.log(err);
    else response.send(user)
  });
});

router.post('/update/:id', verifyToken, (request, response) => {
  User.updateOne({ _id: request.params.id }, {
    $set: {
      firstname: request.body.firstname,
      lastname: request.body.lastname
    }
  }).exec(function (err, user) {
    if (err) console.log(err);
    else response.send(user)
  });
});

router.post('/event', verifyToken, (request, response) => {
  Event.distinct('event', { email: request.body.email }).exec(function (err, event) {
    if (err) console.log(err);
    else {
      User.findOne({ email: request.body.email },{ 
        work_location: 0, hobbies: 0, password: 0, event: 0
      }).exec(function (err, info) {
        if (err) console.log(err);
        else {
          var result = JSON.parse(JSON.stringify(info));;
          result.list_event = event;
          response.send(result);
        }
      })
    }
  });
});

module.exports = router;
