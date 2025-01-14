const express = require("express");
const path = require('path');
const fs = require('fs');
const { celebrate, Joi } = require("celebrate");
const { validateURL } = require("../middlewares/validator");
const { jwtMiddleware } = require("../middlewares/auth");

const router = express.Router();
const {
  getUserById,
  getUserProfile,
  updateProfile,
  updateAvatar,createUser
} = require("../controllers/users");


router.get("/me", jwtMiddleware, getUserProfile);
router.get("/:Id", jwtMiddleware, getUserById);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    about: Joi.string().required(),
    avatar: Joi.string().uri().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
router.patch(
  "/me",
  jwtMiddleware,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile
);

router.patch(
  "/me/avatar",
  jwtMiddleware,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar
);

module.exports = router;


// const {Router} = require('express');
// const { getUsers, getUserById, updateProfile, updateAvatar, getUserByMe } = require('../controllers/users');

// const router = Router();

// // Rota para obter todos os usuários
// router.get("/", getUsers);

// // Rota para obter um usuário por ID
// router.get("/:id", getUserById);

// // Rota para obter os dados do usuário atual (protegida)
// console.log("teste2")
// router.get("/me", getUserByMe); // Rota para o usuário autenticado

// router.patch("/me", updateProfile); // Atualiza o perfil

// router.patch("/me/avatar", updateAvatar); // Atualiza o avatar

// module.exports = router;