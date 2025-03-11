const Card = require('../models/card');
const { NotFoundError, InvalidError, ServerError } = require('../middlewares/errors');
const ERROR_CODE = 400;

exports.getAllCards = async (req, res,next) => {
  try {
    const cards = await Card.find();
    res.json({ data: cards });
  } catch (error) {
    next(ServerError('Ha ocurrido un error en el servidor.'));
  }
};

exports.createCard = async (req, res,next) => {
  try {
    const { name, link } = req.body;
    const newCard = await Card.create({ name, link, owner: req.user._id });
    res.status(201).json({ data: newCard });
  } catch (error) {
    next(InvalidError('Datos inválidos proporcionados para crear la tarjeta.'));
  }
};

exports.deleteCardById = async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.cardId);
    if (!deletedCard) {
      return next(NotFoundError('Tarjeta no encontrada'));
    }
    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    next(ServerError('Ha ocurrido un error en el servidor.'));
  }
};

exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    if (!card) {
      return next(NotFoundError('Tarjeta no encontrada'));
    }
    res.json({ data: card });
  } catch (error) {
    next(error);
  }
};

exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    if (!card) {
      return next(NotFoundError('Tarjeta no encontrada'));
    }
    res.json({ data: card });
  } catch (error) {
    next(error);
  }
};
