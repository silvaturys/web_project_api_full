const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Retorna todos os usuários
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: 'Erro ao buscar usuários', error: err.message });
  }
};

// Retorna um usuário por ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status({ statusCode: 400, message: 'ID inválido' });
    }
  }
};
// Cria um novo usuário
const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    res.status(201).send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status({ statusCode: 400, message: 'Dados inválidos ao criar usuário' });
    }
  }
};

const updateProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about }, // campos a serem atualizados
      { new: true, runValidators: true } // retorna o documento atualizado
    );
    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ message: 'Erro ao atualizar o perfil' });
  }
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body; // Supondo que o link do avatar seja enviado no corpo
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ message: 'Erro ao atualizar o avatar' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar
};