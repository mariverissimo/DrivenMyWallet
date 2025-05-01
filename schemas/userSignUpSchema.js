import Joi from "joi";

const userSignUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required()
    .messages({ "any.only": "As senhas não coincidem." })
});

export default userSignUpSchema