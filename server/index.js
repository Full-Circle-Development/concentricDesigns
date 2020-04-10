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

// GET ALL QUESTIONS FOR A PRODUCT
app.get("/qa/:product_id", (req, res) => {
  pool
    .getAllQuestions(req.params.product_id)
    .then((results) => res.send(results))
    .catch((err) => err);
});

// GET ALL ANSWERS FOR A QUESTION
app.get("/qa/:question_id/answers", (req, res) => {
  pool
    .getAllAnswers(req.params.question_id)
    .then((results) => res.send(results))
    .catch((err) => err);
});

///// POST ROUTES /////

// POST A QUESTION
app.post("/qa/:product_id", (req, res) => {
  pool
    .postQuestion(req.params.product_id, req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => console.log(err));
});

// POST AN ANSWER

app.post("qa/:question_id/answers", (req, res) => {
  pool
    .postAnswer(req.params.question_id, req.body)
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
process.on("SIGTERM", function (err) {
  console.error(new Date().toUTCString() + " uncaughtException:", err.message);
  console.error(err.stack);
  process.exit(1);
});
