const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('./../models/user');
const registerValidator = require('./../validations/auth');

router.post('/registerA', async (request, response) => {
    const { error } = registerValidator.registerValidatorA(request.body);

    if (error) return response.status(422).send(error.details[0].message);

    const checkEmailExist = await User.findOne({ email: request.body.email });

    if (checkEmailExist) return response.status(422).send('Email is exist');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(request.body.password, salt);

    const user = new User({
        type: 'A',
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        work_location: request.body.work_location,
        email: request.body.email,
        password: hashPassword,
    });

    try {
        const newUser = await user.save();
        await response.send(newUser);
    } catch (err) {
        response.status(400).send(err);
    }
});

router.post('/registerB', async (request, response) => {
    const { error } = registerValidator.registerValidatorB(request.body);

    if (error) return response.status(422).send(error.details[0].message);

    const checkEmailExist = await User.findOne({ email: request.body.email });

    if (checkEmailExist) return response.status(422).send('Email is exist');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(request.body.password, salt);

    const user = new User({
        type: 'B',
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        hobbies: request.body.work_location,
        email: request.body.email,
        password: hashPassword,
    });

    try {
        const newUser = await user.save();
        await response.send(newUser);
    } catch (err) {
        response.status(400).send(err);
    }
});

router.post('/login', async (request, response) => {
    const user = await User.findOne({email: request.body.email});
    if (!user) return response.status(422).send('Email or Password is not correct');

    const checkPassword = await bcrypt.compare(request.body.password, user.password);

    if (!checkPassword) return response.status(422).send('Email or Password is not correct');
    
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
    response.header('auth-token', token).send(token);
})

module.exports = router;