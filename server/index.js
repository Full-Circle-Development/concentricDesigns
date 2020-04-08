// import express from "express";
const express = require("express");
// import pool from "../postgresql/pgconfig.js";
const pool = require("../postgresql/pgconfig.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("../postgresql/pgconfig.js").default;
// const exitHook = require("exit-hook");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

///// GET ROUTES /////

app.get("/qa/:product_id", (req, res) => {
  pool
    .getAllQuestions(req.params.product_id)
    .then((results) => res.send(results))
    .catch((err) => err);
});

app.get("/qa/:question_id/answers", (req, res) => {
  pool
    .getAllAnswers(req.params.question_id)
    .then((results) => res.send(results))
    .catch((err) => err);
});

///// POST ROUTES /////

app.post("/qa/:product_id", (req, res) => {
  console.log(req.body);
  console.log(req.params.product_id);
  pool
    .postQuestion(req.params.product_id, req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`🌍 Listening on port ${PORT}!`);
});

// On crash, do
process.on("uncaughtException", function (err) {
  console.error(new Date().toUTCString() + " uncaughtException:", err.message);
  console.error(err.stack);
  process.exit(1);
});

// And on kill do process.on('SIGTERM', ..)
