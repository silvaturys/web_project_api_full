const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {

    return res
      .status(401)
      .send({ message: 'Autorização é necessária' });
  }


  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {

    const err = new Error('Não autorizado');
    err.statusCode = 403;

    console.error(e);

    next(err);
  }

  req.user = payload;

  next();
};


// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return res.status(401).send({ message: 'Autorização necessária' });
//   }

//   const token = authorization.replace('Bearer ', '');
//   console.log(token)
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = payload; // Adiciona o payload ao objeto req.user
//     next(); // Continua para o próximo middleware ou controlador
//   } catch (err) {

//     return res.status(401).send({ message: 'Token inválido ou expirado' });
//   }
// };

