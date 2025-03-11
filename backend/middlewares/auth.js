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



