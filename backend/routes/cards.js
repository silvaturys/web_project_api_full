const express = require('express');
const fs = require('fs');
const path = require('path');
const { celebrate, Joi } = require('celebrate');
const { jwtMiddleware } = require('../middlewares/auth');
const { validateURL } = require('../middlewares/validator');

const router = express.Router();
const cardController = require('../controllers/cards');


router.get('/',jwtMiddleware, cardController.getAllCards);
router.post('/',jwtMiddleware, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
}), cardController.createCard);

router.delete('/:cardId',jwtMiddleware, cardController.deleteCardById);
router.put('/:cardId/likes',jwtMiddleware, cardController.likeCard);
router.delete('/:cardId/likes',jwtMiddleware, cardController.dislikeCard);

module.exports = router;