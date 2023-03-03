import Joi from 'joi';

const userSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(16).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required(),
    createdAt: Joi.date(),
    company: Joi.string().valid('Hero','Royal Enfield','TVS','Honda','Bajaj',),
    city: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(16).required(),
})

export {
    userSchema
}