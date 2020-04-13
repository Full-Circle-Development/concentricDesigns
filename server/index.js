// require("newrelic");
const express = require("express");
const pool = require("../postgresql/pgconfig.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("../postgresql/pgconfig.js").default;
const compression = require("compression");

const app = express();
const PORT = 3000;

app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

///// GET ROUTES /////

// GET ALL QUESTIONS FOR A PRODUCT
app.get("/qa/:product_id", (req, res) => {
  return pool
    .getAllQuestions(req.params.product_id)
    .then((results) => res.send(results))
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err));
});

// GET ALL ANSWERS FOR A QUESTION
app.get("/qa/:question_id/answers", (req, res) => {
  return pool
    .getAllAnswers(req.params.question_id) // , req.query.page, req.query.count
    .then((results) => res.send(results))
    .catch((err) => console.log(err));
});

///// POST ROUTES /////

// POST A QUESTION
app.post("/qa/:product_id", (req, res) => {
  return pool
    .postQuestion(req.params.product_id, req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => console.log(err));
});

// POST AN ANSWER
app.post("/qa/:question_id/answers", (req, res) => {
  return pool
    .postAnswer(req.params.question_id, req.body)
    .catch((err) => console.log(err));
});

///// PUT ROUTES /////

// PUT QUESTION HELPFUL
app.put("/qa/question/:question_id/helpful", (req, res) => {
  return pool
    .putQuestionHelpful(req.params.question_id)
    .then(() => res.sendStatus(204))
    .catch((err) => console.log(err));
});

// PUT QUESTION REPORTED
app.put("/qa/question/:question_id/report", (req, res) => {
  return pool
    .putQuestionReported(req.params.question_id)
    .then(() => res.sendStatus(204))
    .catch((err) => console.log(err));
});

// PUT ANSWER HELPFUL
app.put("/qa/answer/:answer_id/report", (req, res) => {
  return pool
    .putAnswerHelpful(req.params.answer_id)
    .then(() => res.sendStatus(204))
    .catch((err) => console.log(err));
});

// PUT ANSWER REPORTED
app.put("/qa/answer/:answer_id/report", (req, res) => {
  return pool
    .putAnswerReported(req.params.answer_id)
    .then(() => res.sendStatus(204))
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
