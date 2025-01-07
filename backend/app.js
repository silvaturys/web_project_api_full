const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const mongoose = require("mongoose")
const userRoutes = require("./routes/users");
const cardsRouter = require("./routes/cards");


app.use((req, res, next) => {
  req.user = {
    _id: '6748fd668fe09ec7a9a81220',
  };

  next();
});

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then (()=> console.log("Connected to Database"))
  .catch((err) => console.log(err))

  app.use(express.json());

app.use('/users', userRoutes);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "A solicitação não foi encontrada" });
});

app.listen(port, () => {
  console.log(`Web Project Around Express listening on port ${port}`);
});


app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'Erro interno do servidor' : message,
  });
});