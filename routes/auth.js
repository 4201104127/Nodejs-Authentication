const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('./../models/user');
const Event = require('./../models/event');
const registerValidator = require('./../validations/auth');

router.post('/registerA', async (request, response) => {
    const { error } = registerValidator.registerValidatorA(request.body);

    if (error) return response.status(422).send(error.details[0].message);

    const checkEmailExist = await User.findOne({ email: request.body.email });

    if (checkEmailExist) {
        const checkDub = await Event.findOne({ email: request.body.email, work_location: request.body.work_location });
        if (checkDub) return response.status(422).send('Existed');
        else {
            const event = new Event({
                event: 'A',
                email: request.body.email,
                work_location: request.body.work_location,
            })
            try {
                await event.save();
                await response.send('Updated');
            } catch (err) {
                response.status(400).send(err);
            }
        }
    }

    else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(request.body.password, salt);

        const user = new User({
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            email: request.body.email,
            password: hashPassword,
        });

        const event = new Event({
            event: 'A',
            email: request.body.email,
            work_location: request.body.work_location,
        })

        try {
            const newUser = await user.save();
            await event.save();
            await response.send(newUser);
        } catch (err) {
            response.status(400).send(err);
        }
    }
});

router.post('/registerB', async (request, response) => {
    const { error } = registerValidator.registerValidatorB(request.body);

    if (error) return response.status(422).send(error.details[0].message);

    const checkEmailExist = await User.findOne({ email: request.body.email });

    if (checkEmailExist) {
        const checkDub = await Event.findOne({ email: request.body.email, hobbies: request.body.hobbies });
        if (checkDub) return response.status(422).send('Existed');
        else {
            const event = new Event({
                event: 'B',
                email: request.body.email,
                hobbies: request.body.hobbies,
            })
            try {
                await event.save();
                await response.send('Updated');
            } catch (err) {
                response.status(400).send(err);
            }
        }
    }

    else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(request.body.password, salt);

        const user = new User({
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            email: request.body.email,
            password: hashPassword,
        });

        const event = new Event({
            event: 'B',
            email: request.body.email,
            hobbies: request.body.hobbies,
        })

        try {
            const newUser = await user.save();
            await event.save();
            await response.send(newUser);
        } catch (err) {
            response.status(400).send(err);
        }
    }
});

router.post('/login', async (request, response) => {
    const user = await User.findOne({ email: request.body.email });
    if (!user) return response.status(422).send('Email or Password is not correct');

    const checkPassword = await bcrypt.compare(request.body.password, user.password);

    if (!checkPassword) return response.status(422).send('Email or Password is not correct');
    const TOKEN_SECRET = "random";
    const token = jwt.sign({ _id: user._id }, TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
    response.header('auth-token', token).send(token);
})

module.exports = router;