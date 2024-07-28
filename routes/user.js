const express = require("express");
const { User, Role } = require("../models");
const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/role");
const { validateProfileUpdate } = require("../validators/user");
const router = express.Router();

// Retrieve user profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    if (req.body.userId == req.user.userId) {
      const user = await User.findByPk(req.user.userId, {
        attributes: ["id", "firstname", "lastname", "email"],
        include: Role,
      });
      res.send(user);
    } else {
      res.status(403).send({ error: "Unauthorised to access" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Update user profile
router.put(
  "/profile",
  authMiddleware,
  validateProfileUpdate,
  async (req, res) => {
    try {
      const { firstname, lastname, userId } = req.body;
      if (userId == req.user.userId) {
        const user = await User.findByPk(req.user.userId, {
          attributes: ["id", "firstname", "lastname", "email"],
          include: Role,
        });
        if (user) {
          user.firstname = firstname;
          user.lastname = lastname;
          await user.save();
          res.send({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role_id: user.role_id,
          });
        } else {
          res.status(404).send({ error: "User not found" });
        }
      } else {
        res.status(403).send({ error: "Unauthorised to update" });
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

// Delete user profile
router.delete("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (user) {
      await user.destroy();
      res.send({ message: "User deleted successfully" });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Admin retrieve any user profile
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ["id", "firstname", "lastname", "email"],
        include: Role,
      });
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ error: "User not found" });
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

// Admin delete any user profile
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        res.send({ message: "User deleted successfully" });
      } else {
        res.status(404).send({ error: "User not found" });
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

module.exports = router;
