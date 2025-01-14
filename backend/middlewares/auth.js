const jwt = require('jsonwebtoken');

module.exports.generateToken = (data) => {
  console.log('generate token auth back', data)
  const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  console.log('generate token auth back des', token)
  return token;
};

module.exports.jwtMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return res
      .status(403)
      .send({ message: 'Precisa de autorização' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    console.log('cliente', token)
    console.log('servidor', process.env.JWT_SECRET)
    console.log('resultado', await jwt.verify(token, process.env.JWT_SECRET))
    const payload = await jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
      return res.status(403).send({ message: 'O token não é válido' });
    }
    req.user = payload;
    next();
    return req.user;
  } catch (err) {
    return res.status(403).send({ message: 'O token não é válido' });
  }
};

// const jwt = require('jsonwebtoken');


// module.exports = (req, res, next) => {

//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {

//     return res
//       .status(401)
//       .send({ message: 'Autorização é necessária' });
//   }


//   const token = authorization.replace('Bearer ', '');

//   let payload;

//   try {
//     payload = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (e) {

//     const err = new Error('Não autorizado');
//     err.statusCode = 403;

//     console.error(e);

//     next(err);
//   }

//   req.user = payload;

//   next();
// };


// // module.exports = (req, res, next) => {
// //   const { authorization } = req.headers;

// //   if (!authorization || !authorization.startsWith('Bearer ')) {
// //     return res.status(401).send({ message: 'Autorização necessária' });
// //   }

// //   const token = authorization.replace('Bearer ', '');
// //   console.log(token)
// //   try {
// //     const payload = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = payload; // Adiciona o payload ao objeto req.user
// //     next(); // Continua para o próximo middleware ou controlador
// //   } catch (err) {

// //     return res.status(401).send({ message: 'Token inválido ou expirado' });
// //   }
// // };

