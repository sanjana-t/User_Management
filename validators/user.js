const { Type } = require("@sinclair/typebox");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv();
addFormats(ajv);

const profileUpdateSchema = Type.Object({
  firstname: Type.Optional(Type.String({ minLength: 1 })),
  lastname: Type.Optional(Type.String({ minLength: 1 })),
});

const registerSchema = Type.Object({
  firstname: Type.String(),
  lastname: Type.String(),
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 5 }),
  role: Type.String(),
});

const loginSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 5 }),
});

const validate = (schema) => {
  const validateSchema = ajv.compile(schema);
  return (req, res, next) => {
    const valid = validateSchema(req.body);
    if (!valid) {
      return res.status(400).send({ error: validateSchema.errors });
    }
    next();
  };
};

const validateProfileUpdate = (req, res, next) => {
  const validate = ajv.compile(profileUpdateSchema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).send({ error: validate.errors });
  }
  next();
};

module.exports = {
  validateProfileUpdate,
  validate,
  registerSchema,
  loginSchema,
};
