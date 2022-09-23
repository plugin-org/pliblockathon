const Joi = require('joi');

const Authschema = Joi.object({
    password: Joi.string().min(8).max(30).required(),

    repeat_password: Joi.ref('password'),

    email: Joi.string().email().lowercase().required(),
});

module.exports = {
    Authschema,
};
