const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const verifyToken = require('./../middlewares/verifyToken');

/* GET users listing. */
router.get('/', verifyToken, (request, response) => {
  User.find({}).exec(function (err, users) {
      response.send(users);
  });
});


module.exports = router;
