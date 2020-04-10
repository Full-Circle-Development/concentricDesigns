// import { Pool } from "pg";
const { Pool } = require("pg");
const pool = new Pool({
  database: "qa",
});

// GET ALL QUESTIONS FOR A PRODUCT

const getAllQuestions = (product_id) => {
  const values = [product_id]; // might need to account for queries like page, sort, and count
  return pool
    .query("SELECT * FROM questions WHERE product_id = $1", values)
    .then((res) => {
      let resy = res.rows;
      let resultObj = {
        product_id: resy[0].product_id,
        results: res.rows,
      };
      return resultObj;
    })
    .catch((err) => err);
};

// GET ALL ANSWERS FOR A GIVEN QUESTION

const getAllAnswers = (question_id) => {
  const values = [question_id];
  return pool
    .query("SELECT * FROM answers WHERE question_id = $1", values)
    .then((res) => res.rows)
    .catch((err) => err);
};

// POST A QUESTION

const postQuestion = (product_id, question) => {
  const values = [
    product_id,
    question.body,
    // question.date_written, // defaulting in DB to current_timestamp
    question.asker_name,
    question.asker_email,
    // question.reported, // defaulting in DB to 0
    // question.helpful, // defaulting in DB to 0
  ];
  return pool
    .query(
      "INSERT INTO questions (product_id, body, asker_name, asker_email) Values ($1, $2, $3, $4)",
      values
    )
    .then(() => true); // {}
};

// POST AN ANSWER

const postAnswer = (question_id, answer) => {
  values = [
    question_id,
    answer.body,
    answerer.name,
    answerer.email,
    answer.photos,
  ];
  return pool
    .query(
      "INSERT INTO answers (question_id, body, answerer_name, answerer_email, photos",
      values
    )
    .then(() => true);
};

module.exports = {
  getAllQuestions,
  getAllAnswers,
  postQuestion,
  postAnswer,
};
