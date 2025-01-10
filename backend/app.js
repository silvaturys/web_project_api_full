const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose")
const userRoutes = require("./routes/users");
const cardsRouter = require("./routes/cards");
const {login, createUser } = require('../backend/controllers/users');
const auth = require('./middlewares/auth');
require('dotenv').config();
const cors = require("cors")

app.use(express.json());

app.use(cors({
  origin:"*"
}));

mongoose
  .connect(process.env.CONNECTION)
  .then (()=> console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  req.user = {
    _id: '671e07711cddb28412f75d63',
  };
  next();
});

console.log("testar")
// Rotas de autenticação
app.post('/signin', login); // Rota de login
app.post('/signup', createUser); // Rota de registro

app.use('/users', auth, userRoutes);
app.use("/cards", auth, cardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "A solicitação não foi encontrada" });
});

app.listen(port, () => {
  console.log(`Web Project Around Express listening on port ${port}`);
});


app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err)
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Erro interno do servidor' : message,
  });
});