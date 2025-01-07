const express = require('express');
const { getUsers, getUserById, createUser, updateProfile, updateAvatar } = require('../controllers/users');

const router = express.Router();

// Rota para obter todos os usuários
router.get("/", getUsers);

// Rota para obter um usuário por ID
router.get("/:id", getUserById);

// Rota para criar um novo usuário
router.post("/", createUser);

router.patch("/me", updateProfile); // Atualiza o perfil

router.patch("/me/avatar", updateAvatar); // Atualiza o avatar

module.exports = router;