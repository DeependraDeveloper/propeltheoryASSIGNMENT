require("dotenv").config();

const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");

const app = express();
const route = require("./routes/route");

app.use(multer().any());
app.use("/business-card", route);

const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.4nkid.mongodb.net/propelTheory`;

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log("connected to database..."))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`app running on port ${process.env.PORT}`)
);
