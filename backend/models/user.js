const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "explorador",
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
    },
  },
  email: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'O link do avatar não atende aos requisitos.',
    },
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
},{versionKey:false});


userSchema.statics.findUserByCredentials = function (
  email,
  password
)  {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("O usuário não existe"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Senha incorreta"));
        }
        console.log("usuario models",user)
        return user
      })
    })
    .catch((err) => {
      throw new Error("E-mail ou senha incorretos");
    });
};


module.exports = mongoose.model('user', userSchema);
