const Card = require("../models/card");

// Retorna todos os cartões
const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Erro ao buscar cartões' });
  }
};

// Cria um novo cartão
const createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({
      name,
      link,
      owner: req.user._id,
    });
    res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next({ statusCode: 400, message: 'Dados inválidos ao criar cartão' });
    }
  }
};

// Deleta um cartão por ID
const deleteCard = async (req, res) => {
  try {
    console.log(req.params)
    const user = await Card.findByIdAndDelete(req.params.id);
    console.log(req.params)
    if (!user) {
      return res.status(404).send({ message: 'Cartão não encontrado' });
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status({ statusCode: 400, message: 'ID inválido' });
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // Adiciona o _id do usuário, se não estiver presente
      { new: true }
    );
    if (!card) {
      return res.status(404).send({ message: 'Cartão não encontrado' });
    }
    res.status(200).send(card);
  } catch (err) {
    res.status(400).send({ message: 'Erro ao curtir o cartão' });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // Remove o _id do usuário do array de likes
      { new: true }
    );
    if (!card) {
      return res.status(404).send({ message: 'Cartão não encontrado' });
    }
    res.status(200).send(card);
  } catch (err) {
    res.status(400).send({ message: 'Erro ao descurtir o cartão' });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};