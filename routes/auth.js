const express = require("express");
const { createUser, findUserByEmail,findAll } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validate, registerSchema, loginSchema } = require("../validators/user");
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/role");
const router = express.Router();

// user registering
router.post("/register", validate(registerSchema), async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    console.log(req.body);
    await createUser(firstname, lastname, email, password, role);
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// user login
router.post("/login", validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user.id, role: user.Role.role_name },
      "secret",
      { expiresIn: "1h" }
    );
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// admin userlist with pagination
router.get('/users',  authMiddleware,
  roleMiddleware("admin"), async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const users = await findAll(limit,page);
      res.status(200).send({userList:users});
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
