const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const verifyToken = require('./../middlewares/verifyToken');

/* GET users listing. */
router.get('/:eventId', verifyToken, (request, response) => {
  User.find({event: request.params.event}).exec(function (err, users) {
      if (err) console.log(err);
      else response.send(users);
  });
});


module.exports = router;
