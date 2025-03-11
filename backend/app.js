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
app.post('/signup',createUser);

app.use(jwtMiddleware)
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

