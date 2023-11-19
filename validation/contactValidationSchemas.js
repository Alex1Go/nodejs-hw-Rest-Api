const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(35).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

module.exports = { schema };
