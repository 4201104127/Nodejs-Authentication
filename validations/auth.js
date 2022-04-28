const Joi = require('joi');

const registerValidatorA = (data) => {
    const rule = Joi.object({
        firstname: Joi.string().min(3).max(225).required(),
        lastname: Joi.string().min(3).max(225).required(),
        work_location: Joi.string().required(),
        email: Joi.string().min(6).max(225).required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
    })

    return rule.validate(data);
}

const registerValidatorB = (data) => {
    const rule = Joi.object({
        firstname: Joi.string().min(3).max(225).required(),
        lastname: Joi.string().min(3).max(225).required(),
        hobbies: Joi.string().required(),
        email: Joi.string().min(6).max(225).required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
    })

    return rule.validate(data);
}

module.exports = {registerValidatorA, registerValidatorB};