const express = require('express');
const { errors } = require('celebrate');
const users = require('./routes/users');
const cards = require('./routes/cards');
const PORT = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require("./middlewares/logger.js");
const {jwtMiddleware} = require('./middlewares/auth.js')
const cors = require("cors")
require("dotenv").config();

const app = express();

app.use(cors({
  origin:"*"
}));

mongoose
  .connect(process.env.CONNECTION)
  .then (()=> console.log("Connected to Database"))
  .catch((err) => console.log(err));


app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);


app.use('/users' ,users);
app.use('/cards' ,cards);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('O servidor irá cair');
  }, 0);
});

app.use(errorLogger);

app.use(errors());


app.use((req, res) => {
  res.status(404).json({ message: 'O recurso solicitado não foi encontrado' });
});

app.listen(PORT,()=>{
  console.log(`Servidor em execução na porta http://localhost:${PORT}`);
});


// const express = require("express");
// const app = express();
// const port = 3000;
// const mongoose = require("mongoose")
// const userRoutes = require("./routes/users");
// const cardsRouter = require("./routes/cards");
// const {login, createUser } = require('../backend/controllers/users');
// const auth = require('./middlewares/auth');
// require('dotenv').config();
// const cors = require("cors")

// app.use(express.json());

// app.use(cors({
//   origin:"*"
// }));

// mongoose
//   .connect(process.env.CONNECTION)
//   .then (()=> console.log("Connected to Database"))
//   .catch((err) => console.log(err));


// console.log("testar")
// // Rotas de autenticação
// app.post('/signin', login); // Rota de login
// app.post('/signup', createUser); // Rota de registro

// app.use('/users', auth, userRoutes);
// app.use("/cards", auth, cardsRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: "A solicitação não foi encontrada" });
// });

// app.listen(port, () => {
//   console.log(`Web Project Around Express listening on port ${port}`);
// });


// app.use((err, req, res, next) => {
//   const { statusCode = 500, message } = err;
//   console.log(err)
//   res.status(statusCode).send({
//     message: statusCode === 500 ? 'Erro interno do servidor' : message,
//   });
// });