const User = require('../models/user');
const bcrypt = require("bcryptjs");
require("dotenv").config();
const {generateToken} = require("../middlewares/auth")
const { NotFoundError, ServerError } = require('../middlewares/errors');
const ERROR_CODE = 400;
const { JWT_SECRET } = process.env;




module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  console.log('Request Body login:', req.body);
  User.findUserByCredentials(email, password)
    .then((user) => {
      console.log('Request Token antes:', user);
      const token = generateToken(user);
      console.log('Request Token:', user,{token});
      res.send({ token });
    })
    .catch((err) => {
     // console.log(err)
      res.status(401).send({ message: 'E-mail ou senha incorretos' });
    });
};

module.exports.getAllUsers = async (req, res,next) => {
  try {
    const users = await User.find();
    res.json({ data:users });
  } catch (error) {
    next(ServerError('Ocorreu um erro no servidor.'));
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const error = NotFoundError('Usuário não encontrado');
    if (!user) {
      return  error;
    }
    res.json({ data: user });
  } catch (error) {
    next(ServerError('Ocorreu um erro no servidor.'));
  }
};


module.exports.createUser = (req, res) => {
  const { name, about, avatar, email,password } = req.body;
  console.log('Dados recibidos em createUser:', req.body);
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Error("O email já se encontra registrado.");
      } else {
        return bcrypt.hash(password, 10);
      }
    })

    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash });
    })

    .then((user) => {
      res.send({ data: user });
    })

    .catch((error) => {
      res.status(ERROR_CODE).json({ message: error.message });
    });
};
module.exports.updateProfile = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    );
    if (!user) {
      return next(NotFoundError('Não foi encontrado nenhum usuário com essa id'));
    }
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};
module.exports.updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    );
    if (!user) {
      return next(NotFoundError('Não foi encontrado nenhum usuário com essa id'));
    }
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(NotFoundError('Usuário não encontrado'));
    }
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};

// const User = require('../models/user');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Retorna todos os usuários
// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).send(users);
//   } catch (err) {
//     res.status(500).send({ message: 'Erro ao buscar usuários', error: err.message });
//   }
// };

// // Retorna um usuário por ID
// const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).send({ message: 'Usuário não encontrado' });
//     }
//   } catch (err) {
//     if (err.name === 'CastError') {
//       return res.status({ statusCode: 400, message: 'ID inválido' });
//     }
//   }
// };
// // Cria um novo usuário
// const createUser = async (req, res) => {
//   const { name, about, avatar, email, password } = req.body;
//   try {
//     // Gera o hash da senha antes de salvar
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       name,
//       about,
//       avatar,
//       email,
//       password: hashedPassword,
//     });

//     // Não retorne o campo "password" na resposta
//     const userWithoutPassword = {
//       _id: newUser._id,
//       name: newUser.name,
//       about: newUser.about,
//       avatar: newUser.avatar,
//       email: newUser.email,
//     };

//     res.status(201).send(userWithoutPassword);
//   } catch (err) {
//     if (err.name === 'ValidationError') {
//       return res.status(400).send({ message: 'Dados inválidos ao criar usuário' });
//     }
//     if (err.code === 11000) {
//       // Erro de duplicidade no campo único (email)
//       return res.status(409).send({ message: 'E-mail já cadastrado' });
//     }
//     res.status(500).send({ message: 'Erro no servidor', error: err.message });
//   }
// };

// const updateProfile = async (req, res) => {
//   const { name, about } = req.body;
//   try {
//     // Verifica se o usuário está tentando editar seu próprio perfil
//     if (req.user._id.toString() !== req.params.id) {
//       return res.status(403).send({ message: 'Você não tem permissão para editar este perfil' });
//     }

//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       { name, about },
//       { new: true, runValidators: true } // Retorna o usuário atualizado
//     );

//     if (!user) {
//       return res.status(404).send({ message: 'Usuário não encontrado' });
//     }

//     res.status(200).send(user);
//   } catch (err) {
//     res.status(400).send({ message: 'Erro ao atualizar o perfil' });
//   }
// };

// const updateAvatar = async (req, res) => {
//   const { avatar } = req.body; // Supondo que o link do avatar seja enviado no corpo
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       { avatar },
//       { new: true, runValidators: true }
//     );
//     if (!user) {
//       return res.status(404).send({ message: 'Usuário não encontrado' });
//     }
//     res.status(200).send(user);
//   } catch (err) {
//     res.status(400).send({ message: 'Erro ao atualizar o avatar' });
//   }
// };
// const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // Procura o usuário pelo e-mail
//     const user = await User.findOne({ email }).select('+password'); // Inclui a senha explicitamente

//     if (!user) {
//       const error = new Error('E-mail ou senha incorretos');
//       error.statusCode = 401;
//       throw error;
//     }

//     // Compara a senha fornecida com o hash armazenado
//     const matched = await bcrypt.compare(password, user.password);

//     if (!matched) {
//       const error = new Error('E-mail ou senha incorretos');
//       error.statusCode = 401;
//       throw error;
//     }

//     // Cria o token JWT
//     const token = jwt.sign(
//       { _id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     // Envia o token no corpo da resposta
//     return res.status(200).json({ token });

//   } catch (err) {
//     next(err);
//   }
// };

// const getUserByMe = async (req, res) => {
//   try {
//     console.log(req.user._id)
//     const user = await User.findById(req.user._id); // Usando o _id do usuário que está autenticado
// console.log(user)
//     if (!user) {
//       return res.status(404).send({ message: 'Usuário não encontrado' });
//     }

//     const userWithoutPassword = {
//       _id: user._id,
//       name: user.name,
//       about: user.about,
//       avatar: user.avatar,
//       email: user.email,
//     };

//     res.status(200).send(userWithoutPassword);
//   } catch (err) {
//     console.log("cath")
//     res.status(500).send({ message: 'Erro ao obter os dados do usuário', error: err.message });
//   }
// };

// // const getUserByMe = async (req, res, next) => {
// //   console.log("teste", req.user.id)
// //   User.findById(req.user.id)
// //   .orFail(()=>{
// //     const error = new Error('Esse usuário não existe');
// //     error.statusCode = 404;
// //     throw error;
// //   })
// //   .then(user => res.send({ data: user }))
// //   .catch(next);
// // };


// module.exports = {
//   getUsers,
//   getUserById,
//   createUser,
//   updateProfile,
//   updateAvatar,
//   login,
//   getUserByMe
// };