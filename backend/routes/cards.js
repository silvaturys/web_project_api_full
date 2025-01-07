const express = require('express');
const router = express.Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require("../controllers/cards");

// Retorna todos os cartões
router.get('/', getCards);

// Cria um novo cartão
router.post('/', createCard);

// Deleta um cartão por ID
router.delete('/:id', deleteCard);

router.put("/:cardId/likes", likeCard); // Curte um cartão

router.delete("/:cardId/likes", dislikeCard); // Descurte um cartão

module.exports = router;