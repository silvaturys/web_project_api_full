const mongoose = require('mongoose');
const validator = require ("validator")
const bcrypt = require('bcryptjs'); // Para codificar a senha em hash


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau', // Valor padrão
    required: [true, 'O nome é obrigatório'],
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorer', // Valor padrão
    required: [true, 'A descrição é obrigatória'],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg', // Valor padrão
    required: [true, 'O link do avatar é obrigatório'],
    validate: {
      validator (v) {
        const regex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
        return regex.test(v);
      },
      message: (props) => 'O link do avatar deve ser uma URL válida',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    select: false
  },
});

module.exports = mongoose.model("user", userSchema);
