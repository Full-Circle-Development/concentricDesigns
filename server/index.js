import express from "express";
import pool from "./postgresql/pgconfig.js";
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./postgresql/pgconfig.js").default;

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

///// GET ROUTES /////

app.get("/qa/:product_id", (req, res) => {
  pool.getAllQuestions(req.params).then((results) => res.send(results));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
