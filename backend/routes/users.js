const {Router} = require('express');
const { getUsers, getUserById, updateProfile, updateAvatar, getUserByMe } = require('../controllers/users');

const router = Router();

// Rota para obter todos os usuários
router.get("/", getUsers);

// Rota para obter um usuário por ID
router.get("/:id", getUserById);

// Rota para obter os dados do usuário atual (protegida)
console.log("teste2")
router.get("/me", getUserByMe); // Rota para o usuário autenticado

router.patch("/me", updateProfile); // Atualiza o perfil

router.patch("/me/avatar", updateAvatar); // Atualiza o avatar

module.exports = router;