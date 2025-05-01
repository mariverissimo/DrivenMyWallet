import Joi from "joi";

const userSignInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export default userSignInSchema;
